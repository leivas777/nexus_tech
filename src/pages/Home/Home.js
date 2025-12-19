import { useEffect, useState, useMemo } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
// Components
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import HealthBeautySection from "../../components/HeroHealthBeauty/HealthBeautySection";
//Assets
import logo from "../../assets/logo_nexus_sem_fundo.png";

const WHATSAPP_PHONE = "5551992747402";

const Home = () => {
  const [isFBSDKLoaded, setIsFBSDKLoaded] = useState(false);

  useEffect(() => {
    if (window.FB) {
      setIsFBSDKLoaded(true);
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1145156147775393",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v24.0",
      });
      setIsFBSDKLoaded(true);
    };

    const existing = document.getElementById("facebook-jssdk");
    if (existing) {
      return () => {};
    }

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src = "https://connect.facebook.net/en_US/sdk.js";

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleFacebookShare = () => {
    if (!window.FB) {
      alert(
        "Facebook SDK ainda não foi carregado. Tente novamente em alguns segundos."
      );
      return;
    }

    window.FB.ui(
      {
        method: "share",
        href: "https://nexustech.tec.br/",
        quote: "Conheça a Leivas & Leivas - Soluções tecnológicas inovadoras!",
      },
      function (response) {
        if (response && !response.error_message) {
          console.log("Compartilhamento realizado com sucesso!");
        } else {
          console.log("Erro no compartilhamento:", response);
        }
      }
    );
  };

  const handleFacebookLogin = () => {
    if (!window.FB) {
      alert(
        "Facebook SDK ainda não foi carregado. Tente novamente em alguns segundos."
      );
      return;
    }

    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("Login realizado com sucesso!");
          window.FB.api("/me", { fields: "name, email" }, function (userInfo) {
            console.log("Informações do usuário:", userInfo);
          });
        } else {
          console.log("Usuário cancelou o Login.");
        }
      },
      { scope: "email, public_profile" }
    );
  };

  const waHref = useMemo(() => {
    const page =
      typeof window !== "undefined"
        ? window.location.href
        : "https://nexustech.tec.br";
    const text = `Olá! Gostaria de falar com a equipe da Nexus Tech via site. \n\nPágina:${page}`;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  }, []);

  return (
    <>
      <main className={styles.main} role="main">
        <HeroBanner
          logoSrc={logo}
          onCtaClick={() => {
            /* analytics*/
          }}
        />
        <HealthBeautySection />
        <div className={styles.buttonContainer}>
          <Link to="/test-message" className={styles.btn}>
            Faça um teste
          </Link>
          <div className={styles.facebookButtons}>
            <button
              onClick={handleFacebookShare}
              className={`${styles.btn} ${styles.facebookBtn}`}
              disabled={!isFBSDKLoaded}
            >
              {isFBSDKLoaded ? "Compartilhar no Facebook" : "⏳ Carregando..."}
            </button>

            <button
              onClick={handleFacebookLogin}
              className={`${styles.btn} ${styles.facebookBtn}`}
              disabled={!isFBSDKLoaded}
            >
              {isFBSDKLoaded ? "Login com Facebook" : "⏳ Carregando..."}
            </button>
          </div>
        </div>
        <a
          href={waHref}
          className={styles.whatsappFab}
          target="blank"
          rel="noopener noreferrer"
          aria-label="Abrir conversa no WhatsApp"
        >
          <svg
            className={styles.whatsappIcon}
            aria-hidden="true"
            focusable="false"
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#E9F8EF"
              d="M16 3C9.373 3 4 8.373 4 15c0 2.125.55 4.147 1.51 5.9L4 28l7.3-1.49A11.94 11.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3z"
            />
            <path
              fill="#25D366"
              d="M16 5c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.94 9.94 0 0 1-5.09-1.38l-.36-.21-4.18.86.86-4.18-.21-.36A9.94 9.94 0 0 1 6 15c0-5.523 4.477-10 10-10z"
            />
            <path
              fill="#fff"
              d="M12.58 10.91c-.25-.55-.51-.56-.75-.57-.19-.01-.41-.01-.63-.01s-.58.08-.89.41c-.31.33-1.17 1.14-1.17 2.78s1.2 3.22 1.36 3.45c.17.23 2.3 3.68 5.67 5.01 2.8 1.11 3.37.89 3.98.83.61-.06 1.96-.8 2.23-1.58.28-.78.28-1.45.2-1.58-.08-.13-.31-.2-.66-.35-.34-.15-2.03-1-2.35-1.11-.31-.11-.54-.17-.77.17-.23.34-.88 1.11-1.08 1.34-.2.23-.4.26-.74.09-.34-.17-1.42-.52-2.7-1.65-1-.89-1.67-1.99-1.87-2.33-.2-.34-.02-.52.15-.69.16-.16.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.77-1.92-1.07-2.61z"
            />
          </svg>
          <span className={styles.srOnly}>Conversar no WhatsApp</span>
        </a>
      </main>
    </>
  );
};

export default Home;
