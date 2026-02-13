import React, { useMemo } from "react";
import styles from "./DashboardFooter.module.css";
import logo from "../../assets/logo_nexus_sem_fundo.png";

const WHATSAPP_PHONE = "5551992747402";

const DashboardFooter = () => {
  const waHref = useMemo(() => {
    const text = `Olá! Estou com algumas dúvidas em relação ao Dashboard `;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  }, []);
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.footerContent}>
        <div className={styles.doubts}>
          <div className={styles.title}>
            <h3>Está com alguma dúvida?</h3>
          </div>
          <div className={styles.doubtLinks}>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enviar mensagem WhatsApp"
            >
              Entre em contato pelo WhatsApp
            </a>
            <a href="/">Fale com nossa IA</a>
          </div>
        </div>

        <div className={styles.info}>
          <p>&copy; Leivas & Leivas Ltda</p>
          <p>Todos os direitos reservados.</p>
          <p>
            <a href="/" to="/privacy-policy">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardFooter;
