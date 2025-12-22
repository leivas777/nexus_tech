// src/pages/Dashboard/Dashboard.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useFacebookSDK } from "../../hooks/useFacebookSDK";
import { launchEmbeddedSignup } from "../../services/launchEmbeddedSignup";
import { buildSignupExtras } from "../../utils/buildSignupExtras";
import { authService } from "../../services/authService"; // ✅ Importar authService

import facebookLogo from "../../assets/Facebook_logo_PNG12.png";
import instagramLogo from "../../assets/InstagramPNG.png";
import whatsAppLogo from "../../assets/whatsapp_logo_PNG3.png";
import webhookLogo from "../../assets/icons8-webhook-125.png";
import nexusAI from "../../assets/nexusAI.png";

export default function Dashboard() {
  const navigate = useNavigate(); // ✅ Hook para navegação
  const [waStatus, setWaStatus] = useState("pendente");
  const [loading, setLoading] = useState(true); // ✅ Loading inicial
  const [loadingLogout, setLoadingLogout] = useState(false); // ✅ Loading do logout
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  // ✅ Estado para dados do usuário
  const [userData, setUserData] = useState({
    nome: "Carregando...",
    email: "Carregando...",
    segmento: "Não informado",
    qtdClientes: "0",
    site: "Não informado",
    telefone: "Não informado"
  });

  // ✅ Verificar autenticação ao montar
  useEffect(() => {
    try {
      console.log("🔐 Verificando autenticação no Dashboard...");
      
      // Verificar se está autenticado
      if (!authService.isAuthenticated()) {
        console.warn("⚠️ Usuário não autenticado! Redirecionando para /registration");
        navigate("/registration", { replace: true });
        return;
      }

      // Puxar dados do usuário
      const user = authService.getCurrentUser();
      console.log("👤 Dados do usuário recuperados:", user);

      if (user) {
        setUserData({
          nome: user.name || user.nome || "Usuário",
          email: user.email || "Email não fornecido",
          segmento: user.segmento || "Não informado",
          qtdClientes: user.qtdClientes || "0",
          site: user.site || "Não informado",
          telefone: user.telefone || "Não informado"
        });
        console.log("✅ Dados do usuário carregados com sucesso");
      } else {
        console.warn("⚠️ Nenhum usuário encontrado no localStorage");
      }

      setLoading(false);
    } catch (err) {
      console.error("❌ Erro ao carregar dados do usuário:", err);
      setError("Erro ao carregar dados do usuário");
      setLoading(false);
    }
  }, [navigate]);

  // ✅ Calcular iniciais do nome
  const initials = useMemo(() => {
    const parts = (userData?.nome || "").trim().split(" ").filter(Boolean);
    return parts.slice(0, 2).map(p => p[0]).join("").toUpperCase() || "U";
  }, [userData?.nome]);

  // ✅ Dados para usar na integração Meta
  const cliente = useMemo(
    () => userData,
    [userData]
  );

  useFacebookSDK(process.env.REACT_APP_META_APP_ID);

  // Detectar retorno do callback
  useEffect(() => {
    const metaStatus = searchParams.get("meta_status");
    const metaUserId = searchParams.get("meta_user_id");

    console.log("📍 Meta status:", metaStatus, "User ID:", metaUserId);

    if (metaStatus === "success") {
      console.log("✅ Retorno bem-sucedido do Meta");
      setupWhatsApp();
    } else if (metaStatus === "error") {
      setError("Erro ao conectar com o Facebook. Tente novamente.");
      setWaStatus("erro");
    }

    // Limpar parâmetros da URL
    if (metaStatus) {
      window.history.replaceState({}, document.title, "/dashboard");
    }
  }, [searchParams]);

  // ✅ Função de logout
  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      console.log("🚪 Iniciando logout...");

      // Chamar logout do serviço
      authService.logout();
      
      console.log("✅ Logout realizado com sucesso");
      
      // Aguardar um momento e redirecionar
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
        name: cliente.nome,
        website: cliente.site,
        email: cliente.email,
        phone: cliente.telefone
      });

      console.log("🚀 Iniciando Embedded Signup com extras:", extras);

      launchEmbeddedSignup({
        configId: process.env.REACT_APP_META_LOGIN_CONFIG_ID,
        redirectUri: process.env.REACT_APP_META_REDIRECT_URI,
        extras
      });
    } catch (e) {
      console.error("❌ Erro ao iniciar integração:", e);
      setError("Erro ao iniciar integração.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Mostrar loading enquanto carrega dados
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
          <span className={styles.subtitle}>Central de integrações e automações</span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.userChip} title={userData.nome}>
            <div className={styles.avatar} aria-hidden="true">{initials}</div>
            <span className={styles.user}>{userData.nome}</span>
          </div>
          {/* ✅ Botão de logout funcional */}
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
        {/* ✅ Mostrar erro se houver */}
        {error && (
          <div className={styles.errorBanner} role="alert" aria-live="polite">
            ❌ {error}
          </div>
        )}

        <section className={styles.card}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.cardTitle}>Cadastro do Cliente</h2>
          </div>
          <div className={styles.grid}>
            {/* ✅ Campos preenchidos com dados do usuário */}
            <InfoRow label="Nome" value={userData.nome} />
            <InfoRow label="E-mail" value={userData.email} />
            <InfoRow label="Segmento" value={userData.segmento} />
            <InfoRow label="Qtd. de Clientes" value={userData.qtdClientes} />
            <InfoRow label="Site" value={userData.site} />
            <InfoRow label="Telefone" value={userData.telefone} />
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
              {loading && <span className={styles.btnLoader} aria-hidden="true" />}
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
          <h2 className={styles.cardTitle}>Redes Sociais</h2>
          <div className={styles.cardsGrid3}>
            <ActionCard
              img={whatsAppLogo}
              alt="WhatsApp Business"
              title="Números de Telefone"
              description="Gerencie a integração das suas contas do WhatsApp Business"
              onClick={() => {}}
            />
            <ActionCard
              img={facebookLogo}
              alt="Facebook"
              title="Contas do Facebook"
              description="Gerencie a integração das suas contas do Facebook"
              onClick={() => {}}
            />
            <ActionCard
              img={instagramLogo}
              alt="Instagram"
              title="Contas do Instagram"
              description="Gerencie a integração das suas contas do Instagram"
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
              onClick={() => {}}
            />
            <ActionCard
              img={nexusAI}
              alt="Nexus AI"
              title="Nexus AI"
              description="Utilize nossa IA para suas tarefas rotineiras"
              onClick={() => {}}
            />
          </div>
        </section>
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
    erro: { label: "Erro", cls: styles.statusErro }
  };
  const conf = map[status] || map.pendente;
  return <span className={`${styles.statusBadge} ${conf.cls}`}>{conf.label}</span>;
}

function ActionCard({ img, alt, title, description, onClick }) {
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
        <button type="button" className={styles.secondaryBtn} onClick={onClick}>
          Conectar
        </button>
      </div>
    </div>
  );
}