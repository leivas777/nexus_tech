import React from "react";
import styles from "./Agenda.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { exampleMenu } from "./exampleMenu";

import CalendarAgenda from "../../components/CalendarAgenda/CalendarAgenda";
import CalendarCalendar from "../../components/CalendarCalendar/CalendarCalendar";

const Agenda = () => {
  return (
    <>
      <section className={styles.main}>
        <section className={styles.sidebar}>
          <Sidebar menuItems={exampleMenu} />
        </section>
        <section className={styles.agenda}>
            <CalendarAgenda/>
        </section>
        <section className={styles.calendar}>
            <CalendarCalendar/>
        </section>
      </section>
    </>
  );
};

export default Agenda;
