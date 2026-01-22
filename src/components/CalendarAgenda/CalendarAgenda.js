import { useState } from "react";
import styles from "./CalendarAgenda.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarAgenda = () => {
  const [value, setValue] = useState(new Date());

  return (
    <>
      <section className={styles.main}>
        <div className={styles.top}>
          <Calendar onChange={setValue} value={value} />
        </div>
        <div className={styles.mid}>
          <p>Usuários</p>
        </div>
      </section>
    </>
  );
};

export default CalendarAgenda;
