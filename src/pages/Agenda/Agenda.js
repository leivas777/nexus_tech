import React, { useEffect, useState, useRef } from "react";
import styles from "./Agenda.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { exampleMenu } from "./exampleMenu";
import CalendarAgenda from "../../components/CalendarAgenda/CalendarAgenda";
import ChatWidgetAppointment from "../../components/ChatWidgetAppointment/ChatWidgetAppointment";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Agenda = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef();

  // 1. Inicializar SDK da Meta ao carregar a Agenda
  useEffect(() => {
    const initFB = () => {
      if (window.FB) {
        window.FB.init({
          appId: process.env.REACT_APP_META_APP_ID,
          cookie: true,
          xfbml: true,
          version: "v18.0",
        });
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

      await api.post(`/tenants/${tenantId}/connect-instagram`, {
        accessToken,
      });
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
    }
    if (item.key === "instagram") {
      return { ...item, onClick: handleConnectInstagram };
    }
    if (item.key === "services") {
      return { ...item, onClick: () => navigate("/business/services") };
    }
    if (item.key === "business-settings") {
      return { ...item, onClick: () => navigate("/business/settings") };
    }
    if (item.key === "messages-dock") {
      return {
        ...item,
        onClick: () => navigate("/business/messages-center"),
      };
    }
    return item;
  });

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const response = await api.get("/tenants/me");
        setBusinessData(response.data);
      } catch (error) {
        console.error("Erro ao carregar info do negócio", error);
      }
    };
    fetchBusinessInfo();
  }, []);

  // Função auxiliar para barras de progresso dentro do menu
  const UsageBar = ({ label, used, total }) => {
    const percentage = Math.min((used / total) * 100, 100);
    const color = percentage > 85 ? "#ef4444" : "#6e0ad4";

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setShowProfileMenu(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div style={{ marginBottom: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "11px",
            marginBottom: "4px",
            color: "#666",
          }}
        >
          <span>{label}</span>
          <span>
            {used}/{total}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "6px",
            background: "#f0f0f0",
            borderRadius: "3px",
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              background: color,
              borderRadius: "3px",
              transition: "0.3s",
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <section className={styles.main}>
        <section className={styles.sidebar}>
          {/* Passamos o menu que agora tem a função onClick */}
          <Sidebar menuItems={menuWithLogic} />
        </section>
        <section className={styles.agenda}>
          <div
            style={{
              padding: "15px 25px",
              background: "#fff",
              borderBottom: "1px solid #eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Minha Agenda</h2>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#666" }}>
                Gerencie seus compromissos
              </p>
            </div>
            <div
              className={styles.agendaHeader}
              ref={profileRef}
              styles={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {/* Indicadores rápidos de conexão (Bolinhas) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingRight: "15px",
                  borderRight: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "help",
                  }}
                  title={
                    businessData?.tenant.metaPhoneNumberId
                      ? "WhatsApp Conectado"
                      : "WhatsApp Desconectado"
                  }
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: businessData?.tenant.metaPhoneNumberId
                        ? "#25D366"
                        : "#ccc",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: "bold",
                      color: "#999",
                    }}
                  >
                    WA
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "help",
                  }}
                  title={
                    businessData?.tenant.instagramAccountId
                      ? "Instagram Conectado"
                      : "Instagram Desconectado"
                  }
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: businessData?.tenant.instagramAccountId
                        ? "#E1306C"
                        : "#ccc",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: "bold",
                      color: "#999",
                    }}
                  >
                    IG
                  </span>
                </div>
              </div>
              {/* Botão do Perfil que abre o Menu */}
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    {businessData?.tenant.name || "Meu Negócio"}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.7rem", color: "#666" }}>
                    Plano {businessData?.plan?.name || "Carregando..."}
                  </p>
                </div>
                <div
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "10px",
                    background: "#6e0ad4",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    boxShadow: "0 2px 8px rgba(110, 10, 212, 0.2)",
                  }}
                >
                  {businessData?.tenant.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Dropdown de Assinatura e Status */}
              {showProfileMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: 0,
                    width: "260px",
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    zIndex: 1000,
                    padding: "16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#999",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Status do Plano
                  </p>

                  {/* Aqui usaremos os dados que virão daquela rota de Usage futuramente */}
                  <UsageBar
                    label="Mensagens Chatbot"
                    used={businessData?.usage?.messagesSent || 0}
                    total={businessData?.plan?.messagesLimit || 100}
                  />
                  <UsageBar
                    label="Agendamentos"
                    used={businessData?.usage?.appointmentsCount || 0}
                    total={500}
                  />

                  <div
                    style={{
                      marginTop: "15px",
                      paddingTop: "15px",
                      borderTop: "1px solid #f0f0f0",
                    }}
                  >
                    <button
                      onClick={() => navigate("/business/settings")}
                      style={{
                        width: "100%",
                        padding: "8px",
                        background: "#f3f0ff",
                        color: "#6e0ad4",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginBottom: "8px",
                      }}
                    >
                      Gerenciar Assinatura
                    </button>
                    <button
                      style={{
                        width: "100%",
                        padding: "8px",
                        background: "none",
                        color: "#666",
                        border: "none",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        /* lógica de logout */
                      }}
                    >
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className={styles.loader}>
              <p>Sincronizando com a Meta...</p>
            </div>
          ) : (
            <CalendarAgenda />
          )}
        </section>
      </section>
      <ChatWidgetAppointment />
    </>
  );
};

export default Agenda;
