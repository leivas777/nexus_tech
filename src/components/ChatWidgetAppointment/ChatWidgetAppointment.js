import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatWidgetAppointment.module.css";

const ChatWidgetAppointment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Olá! Sou o assistente da Nexus Tech. Como posso te ajudar hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const historyToSend = [...messages, userMsg]; // Histórico atualizado
    setMessages(historyToSend);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.BACKEND_URL}api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: historyToSend, // <--- ENVIANDO O HISTÓRICO
          tenantId: "4b08ff75-7d28-42f6-83f0-5dd8b7caa042",
        }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      if(data.reply.includes("Confirmado") || data.reply.includes("agendei")){
        window.dispatchEvent(new Event("appointmentCreated"))
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Ops, perdi a conexão com o servidor." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatWrapper}>
      {isOpen && (
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>Assistente Virtual</div>
          <div className={styles.messageList} ref={scrollRef}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === "user" ? styles.userMsg : styles.botMsg}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className={styles.botMsg}>Digitando...</div>}
          </div>
          <div className={styles.inputArea}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ex: Quero cortar o cabelo amanhã às 14h"
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      )}
      <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "💬"}
      </button>
    </div>
  );
};

export default ChatWidgetAppointment;
