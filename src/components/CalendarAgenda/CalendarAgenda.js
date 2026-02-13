import { useState } from "react";
import styles from "./CalendarAgenda.module.css";
import MiniCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarCalendar from "../CalendarCalendar/CalendarCalendar";

const CalendarAgenda = () => {
  const [value, setValue] = useState(new Date());

  return (
    <>
      <section className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.top}>
            <MiniCalendar onChange={setValue} value={value} />
          </div>
          <div className={styles.mid}>
            <p>Usuários</p>
          </div>
        </div>
        <div className={styles.content}>
          {/* A grade detalhada escuta o 'value'e reage a ele */}
          <CalendarCalendar currentDate={value instanceof Date ? value : new Date()} onDateChange={setValue} />
        </div>
      </section>
    </>
  );
};

export default CalendarAgenda;
