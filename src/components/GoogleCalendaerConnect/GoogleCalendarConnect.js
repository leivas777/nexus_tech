import React, { useState, useEffect } from "react";
import { useGoogleLogin } from '@react-oauth/google'; // Importe o hook
import styles from "./GoogleCalendarConnect.module.css";
import { googleCalendarService } from "../../services/googleCalendarService";
import api from "../../services/api"; // Certifique-se de importar sua instância do axios

export default function GoogleCalendarConnect({ onConnected }) {
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [calendarEmail, setCalendarEmail] = useState(null);

    // ✅ Verifica o status da conexão ao carregar o componente
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
            console.error("❌ Erro ao verificar status:", err);
            setError("Erro ao verificar conexão");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Configuração do Login do Google
    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                setLoading(true);

                // Envia o 'code' para a nova rota de armazenamento de tokens
                await api.post('/auth/google/store-tokens', {
                    code: codeResponse.code
                });

                await checkConnectionStatus(); // Atualiza a interface
                if (onConnected) onConnected();
            } catch (err) {
                console.error("❌ Erro ao salvar tokens:", err);
                setError("Erro ao sincronizar com o servidor");
            } finally {
                setLoading(false);
            }
        },
        onError: (error) => {
            console.error("❌ Erro no Login Google:", error);
            setError("Falha na autenticação com o Google");
        },
        flow: 'auth-code', // Crucial para receber o 'code' e permitir o Refresh Token
        scope: 'https://www.googleapis.com/auth/calendar', // Permissão para o calendário
    });

    const handleDisconnect = async () => {
        try {
            setLoading(true);
            await googleCalendarService.disconnect();
            setIsConnected(false);
            setCalendarEmail(null);
            setError(null);
        } catch (err) {
            console.error("❌ Erro ao desconectar:", err);
            setError("Erro ao desconectar");
        } finally {
            setLoading(false);
        }
    };

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

                {error && <div className={styles.error} role="alert">❌ {error}</div>}

                <div className={styles.statusSection}>
                    {loading ? (
                        <div className={styles.loading}>
                            <span className={styles.spinner}></span>
                            <p>Processando...</p>
                        </div>
                    ) : isConnected ? (
                        <div className={styles.connected}>
                            <div className={styles.statusBadge}>
                                <span className={styles.dot}></span>
                                Conectado
                            </div>
                            <p className={styles.email}>{calendarEmail}</p>
                            <button className={styles.disconnectBtn} onClick={handleDisconnect} disabled={loading}>
                                🔌 Desconectar
                            </button>
                        </div>
                    ) : (
                        <div className={styles.disconnected}>
                            <p className={styles.message}>
                                Conecte sua conta Google Calendar para sincronizar agendamentos
                            </p>
                            {/* ✅ O botão agora chama a função 'login' da biblioteca */}
                            <button className={styles.connectBtn} onClick={() => login()} disabled={loading}>
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