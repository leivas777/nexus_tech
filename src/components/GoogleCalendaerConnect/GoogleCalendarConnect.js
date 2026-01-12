import React, { useState, useEffect } from "react";
import styles from "./GoogleCalendarConnect.module.css";
import { googleCalendarService } from "../../services/googleCalendarService";

export default function GoogleCalendarConnect({ onConnected }) {
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [calendarEmail, setCalendarEmail] = useState(null);

    useEffect(() => {
        checkConnectionStatus();
    }, []);

    const checkConnectionStatus = async () => {
        try {
            setLoading(true);
            const status = await googleCalendarService.getConnectionStatus();
            setIsConnected(status.isConnected);
            setCalendarEmail(status.email);
            setError(null);
        } catch (err) {
            console.error("❌ Erro:", err);
            setError("Erro ao verificar conexão");
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = async () => {
        try {
            setLoading(true);
            await googleCalendarService.initiateAuth();
        } catch (err) {
            console.error("❌ Erro:", err);
            setError("Erro ao iniciar autenticação com Google");
            setLoading(false);
        }
    };

    const handleDisconnect = async () => {
        try {
            setLoading(true);
            await googleCalendarService.disconnect();
            setIsConnected(false);
            setCalendarEmail(null);
            setError(null);
        } catch (err) {
            console.error("❌ Erro:", err);
            setError("Erro ao desconectar");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isConnected && onConnected) {
            onConnected();
        }
    }, [isConnected, onConnected]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                        <span className={styles.icon}>📅</span>
                    </div>
                    <div className={styles.titleSection}>
                        <h3 className={styles.title}>Google Calendar</h3>
                        <p className={styles.subtitle}>
                            Sincronize seus agendamentos com Google Calendar
                        </p>
                    </div>
                </div>

                {error && (
                    <div className={styles.error} role="alert">
                        ❌ {error}
                    </div>
                )}

                <div className={styles.statusSection}>
                    {loading ? (
                        <div className={styles.loading}>
                            <span className={styles.spinner}></span>
                            <p>Verificando conexão...</p>
                        </div>
                    ) : isConnected ? (
                        <div className={styles.connected}>
                            <div className={styles.statusBadge}>
                                <span className={styles.dot}></span>
                                Conectado
                            </div>
                            <p className={styles.email}>{calendarEmail}</p>
                            <button
                                className={styles.disconnectBtn}
                                onClick={handleDisconnect}
                                disabled={loading}
                            >
                                🔌 Desconectar
                            </button>
                        </div>
                    ) : (
                        <div className={styles.disconnected}>
                            <p className={styles.message}>
                                Conecte sua conta Google Calendar para sincronizar agendamentos
                            </p>
                            <button
                                className={styles.connectBtn}
                                onClick={handleConnect}
                                disabled={loading}
                            >
                                🔗 Conectar Google Calendar
                            </button>
                        </div>
                    )}
                </div>

                <div className={styles.benefits}>
                    <h4 className={styles.benefitsTitle}>Benefícios:</h4>
                    <ul className={styles.benefitsList}>
                        <li>✅ Sincronize agendamentos automaticamente</li>
                        <li>✅ Receba notificações do Google Calendar</li>
                        <li>✅ Crie eventos via chatbot</li>
                        <li>✅ Acesse seu calendário em qualquer lugar</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}