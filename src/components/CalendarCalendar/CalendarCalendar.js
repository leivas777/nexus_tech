import React, { useState, useEffect, useCallback } from "react";
import styles from "./CalendaCalendar.module.css";
import { format, addDays, startOfWeek, endOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

const generateHours = () => {
  const hours = [];
  for (let i = 8; i <= 17; i++) {
    const d = new Date();
    d.setHours(i, 0, 0, 0);
    hours.push(d);
  }
  return hours;
};

const HOURS = generateHours();

const CalendarCalendar = ({ currentDate, onDateChange }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ clientName: "", serviceName: "" });

  const getTenantId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.tenantId;
  };



  // 1. BUSCA DE AGENDAMENTOS (GET)
  const loadAppointments = useCallback(async () => {
    const tenantId = getTenantId();
    if(!tenantId) return;

    setLoading(true);
    const start = startOfWeek(currentDate, { weekStartsOn: 1 }).toISOString();
    const end = endOfWeek(currentDate, { weekStartsOn: 1 }).toISOString();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/appointments/${tenantId}?start=${start}&end=${end}`,

      );
      const data = await response.json();
      
      if(Array.isArray(data)){
        setAppointments(data)
      }else{
        console.warn("API não retornou uma array:", data);
        setAppointments([]);
      }
    } catch (error) {
      console.error("Erro ao carregar agenda:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

    useEffect(() => {
    window.addEventListener("appointmentCreated", loadAppointments);
    return () => window.removeEventListener("appointmentCreated", loadAppointments);
  }, [loadAppointments])

  // 2. SALVAMENTO DE AGENDAMENTO (POST)
  const handleSave = async () => {
    const tenantId = getTenantId();
    if (!tenantId) {
      alert("Erro: ID do estabelecimento não encontrado.");
      return;
    }

    if (!formData.clientName || !formData.serviceName) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // ... lógica de datas (manualStart / manualEnd) que você já tem ...
    const startDate = new Date(selectedSlot.day);
    startDate.setHours(parseInt(selectedSlot.time.split(":")[0]), 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

    const manualStart = `${format(startDate, "yyyy-MM-dd")}T${format(startDate, "HH:mm")}:00.000Z`;
    const manualEnd = `${format(endDate, "yyyy-MM-dd")}T${format(endDate, "HH:mm")}:00.000Z`;

    try {
      const response = await fetch(`${process.env.BACKEND_URL}api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantId, // ✅ ID DINÂMICO AQUI
          clientName: formData.clientName,
          serviceName: formData.serviceName,
          startTime: manualStart,
          endTime: manualEnd,
        }),
      });

      if (response.ok) {
        setSelectedSlot(null);
        setFormData({ clientName: "", serviceName: "" });
        loadAppointments();
      } else {
        const err = await response.json();
        alert(err.error || "Erro ao agendar");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Deseja realmente cancelar este agendamento?")) return;

    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}api/appointments/${id}/cancel`,
        {
          method: "PATCH",
        },
      );

      if (response.ok) {
        loadAppointments(); // Recarrega a agenda para sumir o agendamento
      } else {
        alert("Erro ao cancelar o agendamento.");
      }
    } catch (error) {
      console.error("Erro ao cancelar:", error);
    }
  };

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 6 }, (_, i) => addDays(startDate, i));

  return (
    <div className={styles.container}>
      {loading && <div className={styles.loader}>Atualizando agenda...</div>}

      <header className={styles.header}>
        <div className={styles.nav}>
          <button onClick={() => onDateChange(addDays(currentDate, -7))}>
            &lt;
          </button>
          <button onClick={() => onDateChange(new Date())}>Hoje</button>
          <button onClick={() => onDateChange(addDays(currentDate, 7))}>
            &gt;
          </button>
        </div>
      </header>

      <div className={styles.grid}>
        <div className={styles.timeColumn}>
          <div className={styles.spacer}></div>
          {HOURS.map((hour) => (
            <div key={hour.toString()} className={styles.timeLabel}>
              {format(hour, "HH:00")}
            </div>
          ))}
        </div>

        {weekDays.map((day) => (
          <div key={day.toString()} className={styles.dayColumn}>
            <div className={styles.dayHeader}>
              <span className={styles.dayName}>
                {format(day, "eee", { locale: ptBR })}
              </span>
              <span className={styles.dayNumber}>{format(day, "d")}</span>
            </div>

            <div className={styles.slots}>
              {HOURS.map((hour) => {
                const hourFormatted = format(hour, "HH:00");

                // COMPARAÇÃO BLINDADA: Comparamos as strings literais do Banco vs Calendário
                const appointment = appointments.find((app) => {
                  const appDayStr = app.startTime.split("T")[0]; // "2026-01-30"
                  const appTimeStr = app.startTime
                    .split("T")[1]
                    .substring(0, 5); // "09:00"
                  const calendarDayStr = format(day, "yyyy-MM-dd");

                  return (
                    appDayStr === calendarDayStr && appTimeStr === hourFormatted
                  );
                });

                return (
                  <div
                    key={hourFormatted}
                    className={`${styles.slot} ${appointment ? styles.booked : ""}`}
                    onClick={() => {
                      if (appointment) {
                        // Se já existe agendamento, abre opção de cancelar
                        handleCancel(appointment.id);
                      } else {
                        // Se está livre, abre o modal de novo agendamento
                        setSelectedSlot({ day, time: hourFormatted });
                      }
                    }}
                  >
                    {appointment ? (
                      <div className={styles.appointmentBadge}>
                        <span className={styles.clientName}>
                          {appointment.clientName}
                        </span>
                        <span className={styles.serviceName}>
                          {appointment.serviceName}
                        </span>
                      </div>
                    ) : (
                      <span className={styles.addIcon}>+</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE AGENDAMENTO */}
      {selectedSlot && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Novo Agendamento</h3>
            <p>
              {format(selectedSlot.day, "EEEE, dd 'de' MMMM", { locale: ptBR })}{" "}
              às {selectedSlot.time}
            </p>

            <input
              className={styles.input}
              placeholder="Nome do Cliente"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
            />
            <input
              className={styles.input}
              placeholder="Serviço (ex: Corte de Cabelo)"
              value={formData.serviceName}
              onChange={(e) =>
                setFormData({ ...formData, serviceName: e.target.value })
              }
            />

            <div className={styles.modalButtons}>
              <button
                className={styles.cancelBtn}
                onClick={() => setSelectedSlot(null)}
              >
                Cancelar
              </button>
              <button className={styles.saveBtn} onClick={handleSave}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarCalendar;
