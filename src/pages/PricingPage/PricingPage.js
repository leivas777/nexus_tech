import React, { useState } from "react";
import styles from "./PricingPage.module.css";
import { authService } from "../../services/authService";
import api from "../../services/api";

const PricingPage = () => {
  const [loading, setLoading] = useState(false);
  const user = authService.getCurrentUser();

  const handleSubscribe = async (planId) => {
    setLoading(true);
    try {
      // 1. Verificar se já temos CPF cadastrado na Asaas
      const profileRes = await api.get("/users/check-payment-profile");
      let doc = null;

      if (!profileRes.data.hasDoc) {
        doc = window.prompt(
          "Para gerar sua assinatura, o sistema de pagamentos exige o seu CPF/CNPJ (apenas uma vez):",
        );
        if (!doc) {
          setLoading(false);
          return;
        }
      }

      // 2. Chamar o backend enviando apenas o ID do plano
      // O backend buscará o valor e o ciclo no banco usando o planId
      const response = await api.post("/payments/create-subscription", {
        planId: planId,
        cpfCnpj: doc, // ✅ Enviando o CPF para o backend
      });

      if (response.data.invoiceUrl) {
        // 3. Redireciona o usuário para o Checkout da Asaas
        window.location.href = response.data.invoiceUrl;
      }
    } catch (error) {
      console.error("❌ Erro ao iniciar assinatura:", error);
      alert("Erro ao processar pagamento. Verifique o CPF e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Escolha seu Plano</h1>
        <p>Potencialize seu atendimento com Inteligência Artificial</p>
      </header>

      <div className={styles.plansGrid}>
        {/* Card Plano Mensal */}
        <div className={styles.planCard}>
          <div className={styles.badge}>MAIS POPULAR</div>
          <h2>Plano Pro Mensal</h2>
          <div className={styles.price}>
            <div className={styles.currency}>R$</div>
            <span className={styles.amount}>97</span>
            <span className={styles.period}>/mês</span>
          </div>
          <ul className={styles.features}>
            <li>✅ WhatsApp Business Ilimitados</li>
            <li>✅ Automação com o Instagram</li>
            <li>✅ IA Treinada com o seu Negócio</li>
          </ul>
          <button
            className={styles.subscribeBtn}
            onClick={() => handleSubscribe(97.0, "PRO_MENSAL")}
            disabled={loading}
          >
            {loading ? "Processando..." : "Assinar Agora"}
          </button>
        </div>

        {/* Card Plano Anual */}
        <div className={`${styles.planCard} ${styles.featured}`}>
          <h2>Plano Pro Anual</h2>
          <div className={styles.price}>
            <span className={styles.currency}>R$</span>
            <span className={styles.amount}>897</span>
            <span className={styles.period}>/ano</span>
          </div>
          <p className={styles.savings}>Economia de R$ 267/ano</p>
          <ul className={styles.features}>
            <li>✅ Tudo do plano Mensal</li>
            <li>✅ 2 meses grátis</li>
            <li>✅ Consultoria de Setup IA</li>
          </ul>
          <button
            className={styles.secondaryBtn}
            onClick={() => handleSubscribe(897.0, "PRO_ANUAL")}
            disabled={loading}
          >
            {loading ? "Processando..." : "Garantir Desconto Anual"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
