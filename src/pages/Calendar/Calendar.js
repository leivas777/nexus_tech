import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.css";
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent";
import GoogleCalendarConnect from "../../components/GoogleCalendaerConnect/GoogleCalendarConnect";
import { authService } from "../../services/authService";
import { appointmentService } from "../../services/appointmentService";
import { googleCalendarService } from "../../services/googleCalendarService";

export default function Calendar() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [googleConnected, setGoogleConnected] = useState(false);
    const [activeTab, setActiveTab] = useState("calendar");

    useEffect(() => {
        loadAppointments();
        checkGoogleConnection();
    }, []);

    const loadAppointments = async () => {
        try {
            setLoading(true);
            const user = authService.getCurrentUser();
            setUserData(user);

            const appointments = await appointmentService.getAppointments();
            setAppointments(appointments);
            setError(null);
        } catch (err) {
            console.error("❌ Erro:", err);
            setError("Erro ao carregar agendamentos");
        } finally {
            setLoading(false);
        }
    };

    const checkGoogleConnection = async () => {
        try {
            const status = await googleCalendarService.getConnectionStatus();
            setGoogleConnected(status.isConnected);
        } catch (err) {
            console.error("⚠️ Erro ao verificar Google:", err);
        }
    };

    const handleGoogleConnected = () => {
        setGoogleConnected(true);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.brand}>
                    <h1 className={styles.title}>📅 Agendamentos</h1>
                    <span className={styles.subtitle}>
                        Central de Agendamentos - {userData?.name || "Carregando..."}
                    </span>
                </div>
            </header>

            <div className={styles.tabsContainer}>
                <button
                    className={`${styles.tab} ${
                        activeTab === "calendar" ? styles.activeTab : ""
                    }`}
                    onClick={() => setActiveTab("calendar")}
                >
                    📅 Calendário
                </button>
                <button
                    className={`${styles.tab} ${
                        activeTab === "settings" ? styles.activeTab : ""
                    }`}
                    onClick={() => setActiveTab("settings")}
                >
                    ⚙️ Configurações
                </button>
            </div>

            <main className={styles.main}>
                {error && (
                    <div className={styles.errorBanner} role="alert">
                        ❌ {error}
                    </div>
                )}

                {activeTab === "calendar" && (
                    <>
                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>⏳ Carregando agendamentos...</p>
                            </div>
                        ) : (
                            <>
                                {!googleConnected && (
                                    <div className={styles.warningBanner}>
                                        <span>⚠️ Google Calendar não conectado</span>
                                        <button
                                            className={styles.warningLink}
                                            onClick={() => setActiveTab("settings")}
                                        >
                                            Conectar agora
                                        </button>
                                    </div>
                                )}
                                <CalendarComponent appointments={appointments} />
                            </>
                        )}
                    </>
                )}

                {activeTab === "settings" && (
                    <div className={styles.settingsContainer}>
                        <div className={styles.settingsSection}>
                            <h2 className={styles.sectionTitle}>
                                Integração com Google Calendar
                            </h2>
                            <GoogleCalendarConnect onConnected={handleGoogleConnected} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}