import React, { useMemo, useId } from "react";
import styles from "./BusinessHoursEditor.module.css";

const DAYS_OF_WEEK = [
  { key: "seg", label: "Segunda-Feira" },
  { key: "ter", label: "Terça-Feira" },
  { key: "qua", label: "Quarta-Feira" },
  { key: "qui", label: "Quinta-Feira" },
  { key: "sex", label: "Sexta-Feira" },
  { key: "sab", label: "Sábado" },
  { key: "dom", label: "Domingo" },
];

const DEFAULT_RANGE = ["09:00", "18:00"];

function isValidRange(range) {
  if (!Array.isArray(range) || range.length !== 2) return false;
  const [start, end] = range;
  return typeof start === "string" && typeof end === "string";
}

function compareTime(a, b) {
  //"HH:MM" lexicográfico funciona bem
  if (!a || !b) return 0;
  return a.localeCompare(b);
}

export default function BusinessHoursEditor({ hours = {}, onChange }) {
  const uid = useId();

  //Calcula erros por dia (ex.: start>=end)
  const dayErrors = useMemo(() => {
    const errors = {};
    for (const d of DAYS_OF_WEEK) {
      const range = hours?.[d.key];
      if (!range) continue;
      if (!isValidRange(range)) {
        errors[d.key] = "Formato de horário inválido.";
        continue;
      }
      const [start, end] = range;
      if (start && end && compareTime(start, end) >= 0) {
        errors[d.key] = "O horário inicial deve ser menor que o final.";
      }
    }
    return errors;
  }, [hours]);

  const handleToggleDay = (dayKey) => {
    const newHours = { ...(hours || {}) };

    if (newHours[dayKey]) {
      delete newHours[dayKey];
    } else {
      newHours[dayKey] = DEFAULT_RANGE;
    }
    onChange?.(newHours);
  };

  const handleTimeChange = (dayKey, index, value) => {
    const current = hours?.[dayKey];

    const safeCurrent = isValidRange(current) ? current : DEFAULT_RANGE;

    //NÃO mutar referência antiga
    const nextRange = [...safeCurrent];
    nextRange[index] = value;

    const newHours = { ...(hours || {}), [dayKey]: nextRange };
    onChange?.(newHours);
  };

  return (
    <fieldset className={styles.wrapper}>
      <legend className={styles.legend}>Horários de atendimento</legend>

      <p className={styles.list} role="list" aria-describedby={`${uid}-help`}>
        {DAYS_OF_WEEK.map((day) => {
          const isOpen = !!hours?.[day.key];
          const range = isValidRange(hours?.[day.key])
            ? hours[day.key]
            : DEFAULT_RANGE;

          const dayId = `${uid}-${day.key}`;
          const startId = `${dayId}-start`;
          const endId = `${dayId}-end`;
          const errorId = `${dayId}-error`;
          const hasError = Boolean(dayErrors[day.key]);

          return (
            <div
              key={day.key}
              className={`${styles.row} ${isOpen ? styles.rowOpen : styles.rowClosed}`}
              role="!istitem"
            >
              <div className={styles.left}>
                <div className={styles.toggle}>
                  <input
                    id={dayId}
                    type="checkbox"
                    checked={isOpen}
                    onChange={() => handleToggleDay(day.key)}
                    className={styles.checkbox}
                    aria-describedby={hasError ? errorId : undefined}
                    aria-invalid={hasError ? "true" : "false"}
                  />
                  <label htmlFor={dayId} className={styles.dayLabel}>
                    {day.label}
                  </label>
                </div>

                <span className={styles.status} aria-live="polite">
                  {isOpen ? "Aberto" : "Fechado"}
                </span>
              </div>

              <div className={styles.right}>
                {/* Mantém inputs no DOM, só desabilita quando fechado */}
                <div className={styles.timeGroup}>
                  <label className={styles.srOnly} htmlFor={startId}>
                    Início do atendimento em {day.label}
                  </label>
                  <input
                    id={startId}
                    type="time"
                    value={range[0]}
                    onChange={(e) =>
                      handleTimeChange(day.key, 0, e.target.value)
                    }
                    className={`${styles.input} ${hasError ? styles.invalid : ""}`}
                    disabled={!isOpen}
                    aria-invalid={hasError ? "true" : "false"}
                    aria-describedby={hasError ? errorId : undefined}
                  />
                  <span className={styles.separator} aria-hidden="true">
                    até
                  </span>
                  <label className={styles.srOnly} htmlFor={endId}>
                    Fim do atendimento em {day.label}
                  </label>
                  <input
                    id={endId}
                    type="time"
                    value={range[1]}
                    onChange={(e) =>
                      handleTimeChange(day.key, 1, e.target.value)
                    }
                    className={`${styles.timeInput} ${hasError ? styles.invalid : ""}`}
                    disabled={!isOpen}
                    aria-invalid={hasError ? "true" : "false"}
                    aria-describedby={hasError ? errorId : undefined}
                  />
                </div>
                <div className={styles.errorArea}>
                  {hasError ? (
                    <p className={styles.errorText} id={errorId} role="alert">
                      {dayErrors[day.key]}
                    </p>
                  ) : (
                    <span className={styles.hintText}>
                      {isOpen ? "Defina o intervalo" : "Ative para editar"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </p>
    </fieldset>
  );
}
