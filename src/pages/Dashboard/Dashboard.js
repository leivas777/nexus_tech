// src/pages/Dashboard/Dashboard.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useFacebookSDK } from "../../hooks/useFacebookSDK";
import { authService } from "../../services/authService";

import webhookLogo from "../../assets/icons8-webhook-125.png";
import nexusAI from "../../assets/nexusAI.png";
import calendar from "../../assets/calendar.png";
import { TenantSetupModal } from "../../components";

export default function Dashboard() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [waStatus, setWaStatus] = useState("pendente");
  const [loading, setLoading] = useState(true);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const [hasTenant, setHasTenant] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Dados do usuário (imutáveis)
  const [userData, setUserData] = useState({
    id: null,
    name: "Carregando...",
    email: "Carregando...",
  });

  // ✅ Carregar dados ao montar
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!authService.isAuthenticated()) {
          navigate("/registration");
          return;
        }

        //Busca dados novos do servidor (incluindo o tenantId se existir)
        const freshUser = await authService.getProfile();

        if (freshUser) {
          setUserData({
            id: freshUser.id,
            name: freshUser.name || freshUser.email,
            email: freshUser.email,
          });
          setHasTenant(!!freshUser.tenantId);

          const params = new URLSearchParams(window.location.search);
          if (
            params.get("setup") === "true" ||
            freshUser.businessName === "Minha Empresa"
          ) {
            setIsModalOpen(true);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        setError("Não foi possível carregar os dados do perfil.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [navigate]);

  // ✅ Calcular iniciais do nome
  const initials = useMemo(() => {
    const parts = (userData?.name || "").trim().split(" ").filter(Boolean);
    return (
      parts
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase() || "U"
    );
  }, [userData?.name]);

  useFacebookSDK(process.env.REACT_APP_META_APP_ID);

  // Detectar retorno do callback
  useEffect(() => {
    const metaStatus = searchParams.get("meta_status");

    if (metaStatus === "success") {
      setupWhatsApp();
    } else if (metaStatus === "error") {
      setError("Erro ao conectar com o Facebook. Tente novamente.");
      setWaStatus("erro");
    }

    if (metaStatus) {
      window.history.replaceState({}, document.title, "/dashboard");
    }
  }, [searchParams]);

  // ✅ Logout
  const handleLogout = async () => {
    try {
      setLoadingLogout(true);

      authService.logout();

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);
    } catch (err) {
      console.error("❌ Erro ao fazer logout:", err);
      setError("Erro ao fazer logout");
      setLoadingLogout(false);
    }
  };

  async function setupWhatsApp() {
    try {
      setLoading(true);
      const r = await fetch("/api/meta/setup-whatsapp", { method: "POST" });
      const data = await r.json();

      if (r.ok && data.status === "connected") {
        setWaStatus("conectado");
        setError(null);
      } else {
        setWaStatus("parcial");
        setError("Integração parcial. Verifique suas permissões.");
      }
    } catch (e) {
      console.error("❌ Erro ao configurar WhatsApp:", e);
      setWaStatus("erro");
      setError("Erro ao configurar WhatsApp Business.");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenScheduler = () => {
    //1. Buscar o usuário mais atualizado do localStorage
    const currentUser = authService.getCurrentUser();

    if (!currentUser || !currentUser.id) {
      setError("Erro ao identificar usuário. Tente fazer login novamente.");
      return;
    }

    //2. Verifica se ele já possui um tenantId vinculado
    if (!currentUser.tenantId || currentUser.businessName === "Minha Empresa") {
      setIsModalOpen(true);
    } else {
      navigate("/agenda");
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <p>⏳ Carregando Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <h1 className={styles.title}>Dashboard</h1>
          <span className={styles.subtitle}>
            Central de integrações e automações
          </span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.userChip} title={userData.name}>
            <div className={styles.avatar} aria-hidden="true">
              {initials}
            </div>
            <span className={styles.user}>{userData.name}</span>
          </div>

          <button
            className={styles.ghostBtn}
            type="button"
            onClick={handleLogout}
            disabled={loadingLogout}
            aria-label="Fazer logout"
          >
            {loadingLogout ? "Saindo..." : "Sair"}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {error && (
          <div className={styles.errorBanner} role="alert" aria-live="polite">
            ❌ {error}
          </div>
        )}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Crie seu Auto-Atendimento</h2>
          <div className={styles.cardsGrid3}>
            <ActionCard
              img={calendar}
              alt="calendar"
              title="Agenda para Consultórios"
              description="Gerencie a integração dos atendimentos do seu consultório"
              text="Acessar"
              enabled={true}
              onClick={handleOpenScheduler}
            />
          </div>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Automações</h2>
          <div className={styles.cardsGrid3}>
            <ActionCard
              img={webhookLogo}
              alt="Webhook"
              title="Webhook Personalizado"
              description="Receba eventos em tempo real onde você quiser"
              text="Conectar"
              enabled={false}
              onClick={() => {}}
            />
            <ActionCard
              img={nexusAI}
              alt="Nexus AI"
              title="Nexus AI"
              description="Utilize nossa IA para suas tarefas rotineiras"
              text="Acessar"
              enabled={false}
              onClick={() => {}}
            />
            {/* <ActionCard
              img={uranusB2B}
              alt="UranusB2b"
              title="Uranus B2B"
              description="Controle as finanças do seu negócio"
              text="Acessar"
              enabled={false}
              onClick={() => {}}
            />
            <ActionCard
              img={uranusB2C}
              alt="UranusB2C"
              title="Uranus Pessoal"
              description="Controle suas finanças pessoais"
              text="Acessar"
              enabled={false}
              onClick={() => {}}
            /> */}
          </div>
        </section>

        {isModalOpen && (
          <TenantSetupModal
            userId={userData.id}
            onClose={() => setIsModalOpen(false)}
            onSuccess={(updatedTenant) => {
              // 1. Fechar o modal
              setIsModalOpen(false);

              // Atualizar o localStorage para que o authService e o Dashboard lerem o nome novo
              const storedUser = JSON.parse(localStorage.getItem("user") || {});
              const newUserObj = {
                ...storedUser,
                tenantId: updatedTenant.id,
                businessName: updatedTenant.name,
              };
              localStorage.setItem("user", JSON.stringify(newUserObj));

              // 3. Atualizar o estado do Dashboard para refletir nome no Header imediatamente
              setUserData((prev) => ({
                ...prev,
                businessName: updatedTenant.name,
                name: prev.name,
              }));
              setHasTenant(true);

              // 4. Limpar o ?setup=true da URL para não reabrir o modal no refresh
              navigate("/dashboard", { replace: true });

              console.log("✅ Configuração concluída e estado atualizado!");
            }}
          />
        )}
      </main>
    </div>
  );
}

function ActionCard({
  img,
  alt,
  title,
  description,
  onClick,
  text,
  enabled = true,
}) {
  return (
    <div className={styles.actionCard} role="group" aria-label={title}>
      <div className={styles.cardImage}>
        <img src={img} alt={alt} />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardHeading}>{title}</h3>
        <p className={styles.cardText}>{description}</p>
      </div>
      <div className={styles.cardButtons}>
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={onClick}
          disabled={!enabled}
        >
          {text}
        </button>
      </div>
    </div>
  );
}
