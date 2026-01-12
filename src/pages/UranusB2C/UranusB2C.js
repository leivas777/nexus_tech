import React from "react";
import styles from "./UranusB2C.module.css";
import uranusB2BLogo from "../../assets/Uranus2.png";

const UranusB2B = () => {
    return (
        <main className={styles.main} role="main" aria-label="Uranus B2B">
            <section className={styles.card} aria-labelledby="page-title">
                <header className={styles.mainTitle}>
                    <img src={uranusB2BLogo} alt="Logotipo do Uranus B2B" width={50} height={50} />
                    <h1 id="page-title">Uranus Finanças Pessoais</h1>
                </header>
                <p className={styles.mainSubtitle}>Organize as suas finanças</p>
            </section>

            <section className={styles.card} aria-labelledby="status-title">
                <h2 id="status-title" className={styles.divTitle}>Status da Conexão</h2>
                <div className={styles.statusRow}>
                    <span className={`${styles.chip} ${styles.chipWarning}`} aria-live="polite">Desconectado</span>
                    <button className={styles.primaryButton} type="button">Conectar</button>
                </div>
            </section>

            <section className={styles.card} aria-labelledby="dashboard-title">
                <h2 id="dashboard-title" className={styles.divTitle}>Dashboard</h2>
                <div className={styles.placeholder} role="status" aria-live="polite">
                    Em breve: gráficos e métricas
                </div>
            </section>
        </main>
    );
};

export default UranusB2B;