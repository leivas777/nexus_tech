import React, { useState, useEffect, useCallback } from "react";
import styles from "./CalendarComponent.module.css";

const DAYS_OF_WEEK = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const MONTHS = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function CalendarComponent({ appointments = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    // Obter dias do mês
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    // Obter primeiro dia do mês
    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    // Gerar array de dias
    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Dias vazios antes do primeiro dia do mês
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // Dias do mês
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days;
    };

    // Verificar se há agendamentos em um dia
    const getAppointmentsForDay = (day) => {
        if (!day) return [];

        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return appointments.filter((apt) => {
            const aptDate = new Date(apt.startTime);
            return (
                aptDate.getDate() === day &&
                aptDate.getMonth() === currentDate.getMonth() &&
                aptDate.getFullYear() === currentDate.getFullYear()
            );
        });
    };

    // Navegar mês anterior
    const handlePrevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        );
    };

    // Navegar próximo mês
    const handleNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
        );
    };

    // Selecionar data
    const handleSelectDate = (day) => {
        if (day) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            setSelectedDate(date);
        }
    };

    const calendarDays = generateCalendarDays();

    return (
        <div className={styles.container}>
            <div className={styles.calendarWrapper}>
                {/* Header do Calendário */}
                <div className={styles.header}>
                    <button onClick={handlePrevMonth} className={styles.navBtn}>
                        ←
                    </button>
                    <h2 className={styles.monthYear}>
                        {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <button onClick={handleNextMonth} className={styles.navBtn}>
                        →
                    </button>
                </div>

                {/* Dias da semana */}
                <div className={styles.weekDays}>
                    {DAYS_OF_WEEK.map((day) => (
                        <div key={day} className={styles.weekDay}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* Dias do mês */}
                <div className={styles.days}>
                    {calendarDays.map((day, index) => {
                        const dayAppointments = day ? getAppointmentsForDay(day) : [];
                        const isSelected =
                            selectedDate &&
                            day === selectedDate.getDate() &&
                            selectedDate.getMonth() === currentDate.getMonth();
                        const isToday =
                            day &&
                            new Date().getDate() === day &&
                            new Date().getMonth() === currentDate.getMonth() &&
                            new Date().getFullYear() === currentDate.getFullYear();

                        return (
                            <div
                                key={index}
                                className={`${styles.day} ${!day ? styles.empty : ""} ${
                                    isSelected ? styles.selected : ""
                                } ${isToday ? styles.today : ""}`}
                                onClick={() => handleSelectDate(day)}
                            >
                                {day && (
                                    <>
                                        <div className={styles.dayNumber}>{day}</div>
                                        {dayAppointments.length > 0 && (
                                            <div className={styles.appointmentDots}>
                                                {dayAppointments.slice(0, 3).map((apt, i) => (
                                                    <div
                                                        key={i}
                                                        className={`${styles.dot} ${
                                                            apt.status === "confirmed"
                                                                ? styles.dotConfirmed
                                                                : styles.dotPending
                                                        }`}
                                                        title={apt.title}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Painel de Agendamentos do Dia */}
            {selectedDate && (
                <div className={styles.appointmentsPanel}>
                    <h3 className={styles.panelTitle}>
                        Agendamentos de {selectedDate.toLocaleDateString("pt-BR")}
                    </h3>

                    {getAppointmentsForDay(selectedDate.getDate()).length === 0 ? (
                        <p className={styles.noAppointments}>
                            Nenhum agendamento neste dia
                        </p>
                    ) : (
                        <div className={styles.appointmentsList}>
                            {getAppointmentsForDay(selectedDate.getDate()).map((apt) => (
                                <div
                                    key={apt.id}
                                    className={`${styles.appointmentItem} ${
                                        styles[`status${apt.status}`]
                                    }`}
                                    onClick={() => setSelectedAppointment(apt)}
                                >
                                    <div className={styles.aptTime}>
                                        {new Date(apt.startTime).toLocaleTimeString("pt-BR", {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </div>
                                    <div className={styles.aptInfo}>
                                        <div className={styles.aptTitle}>{apt.title}</div>
                                        <div className={styles.aptClient}>{apt.clientName}</div>
                                    </div>
                                    <div className={styles.aptStatus}>{apt.status}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Modal de Detalhes */}
            {selectedAppointment && (
                <div className={styles.modal} onClick={() => setSelectedAppointment(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setSelectedAppointment(null)}
                        >
                            ×
                        </button>
                        <h2>{selectedAppointment.title}</h2>
                        <div className={styles.modalInfo}>
                            <p>
                                <strong>Cliente:</strong> {selectedAppointment.clientName}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedAppointment.clientEmail}
                            </p>
                            <p>
                                <strong>Telefone:</strong> {selectedAppointment.clientPhone}
                            </p>
                            <p>
                                <strong>Início:</strong>{" "}
                                {new Date(selectedAppointment.startTime).toLocaleString("pt-BR")}
                            </p>
                            <p>
                                <strong>Fim:</strong>{" "}
                                {new Date(selectedAppointment.endTime).toLocaleString("pt-BR")}
                            </p>
                            <p>
                                <strong>Status:</strong> {selectedAppointment.status}
                            </p>
                            {selectedAppointment.description && (
                                <p>
                                    <strong>Descrição:</strong> {selectedAppointment.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}