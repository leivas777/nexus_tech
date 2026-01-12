import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./ChatWidget.module.css";

// Gerar UUID simples (ou use uuid library)
function generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function sendToAI(message, context, sessionId) {
    const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context, sessionId })
    });
    if (!res.ok) {
        throw new Error("Falha no chat");
    }
    const data = await res.json();
    return data.reply || "";
}

export default function ChatWidget({ user, customer }) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const inputRef = useRef(null);

    // Gerar sessionId ao montar o componente
    useEffect(() => {
        const newSessionId = generateSessionId();
        setSessionId(newSessionId);
        console.log("🔑 SessionId gerado:", newSessionId);
    }, []);

    // Mantém o contexto atualizado
    const ctxRef = useRef({ user, customer });
    useEffect(() => {
        ctxRef.current = { user, customer };
    }, [user, customer]);

    // Foco no textarea ao abrir
    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);

    const toggle = useCallback(() => {
        setOpen((v) => !v);
    }, []);

    const onChange = useCallback((e) => {
        setInput(e.target.value);
    }, []);

    const onSend = useCallback(async () => {
        if (!input.trim() || loading || !sessionId) {
            return;
        }
        const text = input.trim();
        setInput("");
        setLoading(true);
        setMessages((m) => [...m, { role: "user", content: text }]);

        try {
            const reply = await sendToAI(text, ctxRef.current, sessionId);
            setMessages((m) => [...m, { role: "assistant", content: reply }]);
        } catch (err) {
            console.error("❌ Erro ao enviar mensagem:", err);
            setMessages((m) => [
                ...m,
                { role: "assistant", content: "Desculpe, ocorreu um erro." }
            ]);
        } finally {
            setLoading(false);
        }
    }, [input, loading, sessionId]);

    const onKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
            }
        },
        [onSend]
    );

    return createPortal(
        <div className={styles.container} style={{ zIndex: 99999 }}>
            <button
                className={styles.fab}
                onClick={toggle}
                aria-label="Abrir chat"
                type="button"
            >
                {open ? "×" : "💬"}
            </button>

            {open && (
                <div className={styles.chat} role="dialog" aria-label="Nexus AI">
                    <div className={styles.header}>
                        Nexus AI
                        {sessionId && (
                            <span className={styles.sessionBadge} title={sessionId}>
                                ID: {sessionId.substring(0, 8)}...
                            </span>
                        )}
                    </div>

                    <div className={styles.body}>
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={
                                    m.role === "user" ? styles.msgUser : styles.msgBot
                                }
                            >
                                {m.content}
                            </div>
                        ))}
                        {loading && <div className={styles.typing}>Digitando…</div>}
                    </div>

                    <div className={styles.inputRow}>
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            placeholder="Pergunte..."
                            aria-label="Mensagem para a IA"
                        />
                        <button onClick={onSend} disabled={loading} type="button">
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </div>,
        document.body
    );
}