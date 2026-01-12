import React from "react";
import styles from "./WhatsAppNormal.module.css";
const WhatsAppNormal = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <h1 className={styles.textTitle}>
              Plataforma WhatsApp Não Oficial
            </h1>
          </div>
        </div>
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.cardTitle}>
                        
                    </h2>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppNormal;
