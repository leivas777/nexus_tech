import React, { useEffect, useState } from "react";
import styles from "./Agenda.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { exampleMenu } from "./exampleMenu";
import CalendarAgenda from "../../components/CalendarAgenda/CalendarAgenda";
import ChatWidgetAppointment from "../../components/ChatWidgetAppointment/ChatWidgetAppointment";
import api from "../../services/api"; // Certifique-se de ter sua instância do axios/api

const Agenda = () => {
  const [loading, setLoading] = useState(false);

  // 1. Inicializar SDK da Meta ao carregar a Agenda
  useEffect(() => {
    const initFB = () => {
      if (window.FB) {
        window.FB.init({
          appId: process.env.META_APP_ID,
          cookie: true,
          xfbml: true,
          version: "v18.0",
        })
      }
    };
    if (!window.FB) {
      window.fbAsyncInit = initFB;
      if (!document.getElementById("facebook-jssdk")) {
        const js = document.createElement("script");
        js.id = "facebook-jssdk";
        js.src = "https://connect.facebook.net/pt_BR/sdk.js";
        document.body.appendChild(js);
      }
    } else {
      initFB();
    }
  }, []);

  // 2. Função de Conexão (Embedded Signup)
  const handleConnectWhatsApp = () => {
    if (!window.FB) return alert("SDK da Meta não carregado.");

    window.FB.login(
      (response) => {

        if (response.authResponse) {

          const accessToken = response.authResponse.accessToken;
          saveWhatsAppToken(accessToken);
        } else {
          setLoading(false);
        }
      },
      {
        // Garanta que estes 3 estão aqui!
        scope:
          "whatsapp_business_management,whatsapp_business_messaging,business_management",
        return_scopes: true, // 👈 IMPORTANTE: Força a Meta a devolver a lista de escopos no log
        extras: {
          feature: "whatsapp_embedded_signup",
        },
      },
    );
  };

  //3. Conexão com o Instagram
  const handleConnectInstagram = () => {
    if (!window.FB)
      return alert(
        "O SDK da Meta ainda está carregando. Tente novamente em 2 segundos.",
      );

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          saveInstagramToken(accessToken);
        } else {

        }
      },
      {
        // Escopos exatos para Instagram profissional
        scope:
          "instagram_basic,instagram_manage_messages,pages_manage_metadata,pages_show_list,pages_read_engagement",
        return_scopes: true,
      },
    );
  };

  // 3. Salvar no Banco (Vinculado ao Tenant atual)
  const saveWhatsAppToken = async (accessToken) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const tenantId = user?.tenantId;

      await api.post(`/tenants/${tenantId}/connect-whatsapp`, {
        accessToken,
      });
      alert("WhatsApp conectado com sucesso ao seu negócio!");

    } catch (error) {
      console.error(error);
      alert("Erro ao vincular no saveWhatsAppToken:", error);
      console.error("Erro ao vincular no saveWhatsAppToken:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveInstagramToken = async (accessToken) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const tenantId = user?.tenantId;

      await api.post(
        `/tenants/${tenantId}/connect-instagram`,
        {
          accessToken,
        },
      );
      alert("Instagram conectado com sucesso!");

    } catch (error) {
      console.error("Erro ao vincular Instagram:", error);
      alert("Erro ao vincular Instagram.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Injetar a função de clique no menu dinamicamente
  const menuWithLogic = exampleMenu.map((item) => {
    if (item.key === "whatsApp") {
      return { ...item, onClick: handleConnectWhatsApp };
    } else if (item.key === "instagram") {
      return { ...item, onClick: handleConnectInstagram };
    }
    return item;
  });

  return (
    <>
      <section className={styles.main}>
        <section className={styles.sidebar}>
          {/* Passamos o menu que agora tem a função onClick */}
          <Sidebar menuItems={menuWithLogic} />
        </section>
        <section className={styles.agenda}>
          {loading ? <p>Conectando WhatsApp...</p> : <CalendarAgenda />}
        </section>
      </section>
      <ChatWidgetAppointment />
    </>
  );
};

export default Agenda;
