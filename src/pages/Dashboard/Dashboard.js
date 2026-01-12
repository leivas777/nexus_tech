// src/pages/Dashboard/Dashboard.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useFacebookSDK } from "../../hooks/useFacebookSDK";
import { launchEmbeddedSignup } from "../../services/launchEmbeddedSignup";
import { buildSignupExtras } from "../../utils/buildSignupExtras";
import { authService } from "../../services/authService";
import { customerService } from "../../services/customerService";
import EditCustomerModal from "../../components/EditCustomerModal/EditCustomerModal";
import ChatWidget from "../../components/ChatWidget/ChatWidget";

import facebookLogo from "../../assets/Facebook_logo_PNG12.png";
import instagramLogo from "../../assets/InstagramPNG.png";
import whatsAppLogo from "../../assets/whatsapp_logo_PNG3.png";
import webhookLogo from "../../assets/icons8-webhook-125.png";
import nexusAI from "../../assets/nexusAI.png";
import uranusB2B from "../../assets/Uranus1.png";
import uranusB2C from "../../assets/Uranus2.png";
import calendar from "../../assets/calendar.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const [waStatus, setWaStatus] = useState("pendente");
  const [loading, setLoading] = useState(true);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  // ✅ Dados do usuário (imutáveis)
  const [userData, setUserData] = useState({
    id: null,
    name: "Carregando...",
    email: "Carregando...",
  });

  // ✅ Dados do customer (editáveis)
  const [customerData, setCustomerData] = useState({
    id: null,
    nome: "Não preenchido",
    email: "Não preenchido",
    segmento: "Não informado",
    qtdClientes: "0",
    site: "Não informado",
    telefone: "Não informado",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [hasCustomer, setHasCustomer] = useState(false);

  // ✅ Carregar dados ao montar
  useEffect(() => {
    try {
      console.log("🔐 Verificando autenticação no Dashboard...");

      if (!authService.isAuthenticated()) {
        console.warn("⚠️ Usuário não autenticado! Redirecionando...");
        navigate("/registration", { replace: true });
        return;
      }

      // ✅ Obter dados do usuário do localStorage
      const user = authService.getCurrentUser();
      console.log("👤 Usuário recuperado:", user);

      if (user) {
        setUserData({
          id: user.id,
          name: user.name,
          email: user.email,
        });
      }

      // ✅ Obter dados do customer do localStorage
      const customer = authService.getCurrentCustomer();
      console.log("📋 Customer recuperado:", customer);

      if (customer) {
        setCustomerData({
          id: customer.id,
          nome: customer.nome,
          email: customer.email,
          segmento: customer.segmento,
          qtdClientes: customer.qtdClientes,
          site: customer.site,
          telefone: customer.telefone,
        });
        setHasCustomer(true);
      } else {
        setHasCustomer(false);
      }

      setLoading(false);
    } catch (err) {
      console.error("❌ Erro ao carregar Dashboard:", err);
      setError("Erro ao carregar dados");
      setLoading(false);
    }
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

  // ✅ Dados para integração Meta
  const cliente = useMemo(() => customerData, [customerData]);

  useFacebookSDK(process.env.REACT_APP_META_APP_ID);

  // Detectar retorno do callback
  useEffect(() => {
    const metaStatus = searchParams.get("meta_status");

    if (metaStatus === "success") {
      console.log("✅ Retorno bem-sucedido do Meta");
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
      console.log("🚪 Iniciando logout...");

      authService.logout();

      console.log("✅ Logout realizado com sucesso");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);
    } catch (err) {
      console.error("❌ Erro ao fazer logout:", err);
      setError("Erro ao fazer logout");
      setLoadingLogout(false);
    }
  };

  // ✅ Salvar alterações do customer
  const handleEditSave = (updatedData) => {
    console.log("✅ Customer atualizado:", updatedData);

    // Atualizar no estado
    setCustomerData((prev) => ({
      ...prev,
      ...updatedData,
    }));

    // Atualizar no localStorage
    authService.updateCurrentCustomer({
      id: customerData.id,
      nome: updatedData.nome || customerData.nome,
      email: updatedData.email || customerData.email,
      segmento: updatedData.segmento || customerData.segmento,
      qtdClientes: updatedData.qtdClientes || customerData.qtdClientes,
      site: updatedData.site || customerData.site,
      telefone: updatedData.telefone || customerData.telefone,
    });

    setHasCustomer(true);
  };

  async function setupWhatsApp() {
    try {
      setLoading(true);
      const r = await fetch("/api/meta/setup-whatsapp", { method: "POST" });
      const data = await r.json();

      console.log("📍 Setup response:", data);

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

  async function onConnect() {
    try {
      setLoading(true);
      setError(null);

      const extras = buildSignupExtras({
        name: userData.name, // ✅ Usar nome do usuário
        website: customerData.site,
        email: userData.email, // ✅ Usar email do usuário
        phone: customerData.telefone,
      });

      console.log("🚀 Iniciando Embedded Signup com extras:", extras);

      launchEmbeddedSignup({
        configId: process.env.REACT_APP_META_LOGIN_CONFIG_ID,
        redirectUri: process.env.REACT_APP_META_REDIRECT_URI,
        extras,
      });
    } catch (e) {
      console.error("❌ Erro ao iniciar integração:", e);
      setError("Erro ao iniciar integração.");
    } finally {
      setLoading(false);
    }
  }

  async function onWhatsAppNormal() {
    navigate("/whats-nao-oficial");
  }

  async function onCalendar() {
    navigate("/agenda");
  }

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
      {/* ✅ Modal de Edição */}
      <EditCustomerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        customer={customerData}
        onSave={handleEditSave}
      />

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

        {/* ✅ Card de Dados do Negócio (editáveis) */}
        <section className={styles.card}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.cardTitle}>Dados do Negócio</h2>
            {hasCustomer ? (
              <button
                className={styles.editBtn}
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                aria-label="Editar dados do negócio"
              >
                ✏️ Editar
              </button>
            ) : (
              <button
                className={styles.editBtn}
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                aria-label="Preencher dados do negócio"
              >
                ➕ Preencher
              </button>
            )}
          </div>
          <div className={styles.grid}>
            <InfoRow label="Segmento" value={customerData.segmento} />
            <InfoRow
              label="Qtd. de Clientes"
              value={customerData.qtdClientes}
            />
            <InfoRow label="Site" value={customerData.site} />
            <InfoRow label="Telefone" value={customerData.telefone} />
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.cardTitle}>WhatsApp Business</h2>
            <StatusBadge status={waStatus} />
          </div>

          {error && (
            <div className={styles.error} role="alert" aria-live="assertive">
              {error}
            </div>
          )}

          <div className={styles.inlineActions}>
            <button
              className={styles.primaryBtn}
              onClick={onConnect}
              disabled={loading || waStatus === "conectado"}
              type="button"
            >
              {loading && (
                <span className={styles.btnLoader} aria-hidden="true" />
              )}
              {loading ? "Conectando..." : "Conectar via Facebook"}
            </button>

            <button
              className={styles.subtleBtn}
              onClick={setupWhatsApp}
              disabled={loading}
              type="button"
              aria-label="Reverificar status do WhatsApp Business"
            >
              Re‑verificar status
            </button>
          </div>

          <ul className={styles.listCompact}>
            <li>Integração: {waStatus}</li>
            <li>Automações ativas: 0</li>
            <li>Próximos passos: conectar conta, criar fluxo</li>
          </ul>
        </section>
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
              onClick={onCalendar}
            />
          </div>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Redes Sociais</h2>
          <div className={styles.cardsGrid3}>
            <ActionCard
              img={whatsAppLogo}
              alt="WhatsApp Business"
              title="Plataforma Oficial"
              description="Gerencie a integração das suas contas do WhatsApp Business"
              text="Conectar"
              enabled={true}
              onClick={() => {}}
            />
            <ActionCard
              img={whatsAppLogo}
              alt="WhatsApp Business"
              title="Plataforma Não Oficial"
              description="Gerencie a integração das suas contas do WhatsApp Business"
              text="Acessar"
              enabled={true}
              onClick={onWhatsAppNormal}
            />
            <ActionCard
              img={facebookLogo}
              alt="Facebook"
              title="Contas do Facebook"
              description="Gerencie a integração das suas contas do Facebook"
              text="Conectar"
              enabled={true}
              onClick={() => {}}
            />
            <ActionCard
              img={instagramLogo}
              alt="Instagram"
              title="Contas do Instagram"
              description="Gerencie a integração das suas contas do Instagram"
              text="Conectar"
              enabled={true}
              onClick={() => {}}
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
            <ActionCard
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
            />
          </div>
        </section>
        <ChatWidget user={userData} customer={customerData} />
      </main>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={styles.infoValue}>{value}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    conectado: { label: "Conectado", cls: styles.statusConectado },
    pendente: { label: "Pendente", cls: styles.statusPendente },
    parcial: { label: "Parcial", cls: styles.statusParcial },
    erro: { label: "Erro", cls: styles.statusErro },
  };
  const conf = map[status] || map.pendente;
  return (
    <span className={`${styles.statusBadge} ${conf.cls}`}>{conf.label}</span>
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
