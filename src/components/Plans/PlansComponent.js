import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PlansComponent.module.css";
import api from "../../services/api";
import { Button } from "../ui";

const PlansComponent = () => {
  const [monthlyPlans, setMonthlyPlans] = useState([]);
  const [annualPlans, setAnnualPlans] = useState([]);
  const [semesterPlans, setSemesterPlans] = useState([]);
  const [period, setPeriod] = useState("/mês");

  const navigate = useNavigate();
  const handlePlanChoice = (plan) => {
    // Definimos como "Free" se for teste de 7 dias, grátis ou valor 0
    const isFree =
      plan.price === 0 ||
      plan.name.toLowerCase().includes("free") ||
      plan.name.toLowerCase().includes("grátis") ||
      plan.name.toLowerCase().includes("gratis") ||
      plan.name.toLowerCase().includes("teste");

    // Salvar intenção de assinar no localStorage
    localStorage.setItem(
      "pendingSubscription",
      JSON.stringify({
        planId: plan.id,
        isFree: isFree,
      }),
    );

    // Redireciona para login/registro
    navigate("/registration");
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get("/plans");
        const plans = response.data;

        const formatPlan = (plan) => ({
          name: plan.name,
          price: plan.price,
          id: plan.id,
          period: plan.period,
          details: {
            aiIncluded: plan.aiIncluded,
            aiType: plan.aiType,
            leadsLimit: plan.leadsLimit,
            membersLimit: plan.membersLimit,
            messagesLimit: plan.messagesLimit,
            reportsType: plan.reportsType,
            supportType: plan.supportType,
          },
        });

        const monthly = plans
          .filter((plan) => plan.period === "MONTHLY")
          .map(formatPlan);
        const annual = plans
          .filter((plan) => plan.period === "ANNUAL")
          .map(formatPlan);
        const semester = plans
          .filter((plan) => plan.period === "SEMESTER")
          .map(formatPlan);

        setMonthlyPlans(monthly);
        setAnnualPlans(annual);
        setSemesterPlans(semester);
      } catch (error) {
        console.log("Erro ao buscar planos:", error);
      }
    };

    fetchPlans();
  }, []);

  const Card = ({ id, name, price, details }) => {
    return (
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <h5 className={styles.planName}>
            {name.replace(/\s(ANNUAL|ANUAL|SEMESTRAL|MONTHLY)/g, "")}
          </h5>
        </div>
        <div className={styles.cardPrice}>
          <h2 className={styles.planPrice}>
            R${" "}
            {parseFloat(price).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximimFractionDigits: 2,
            })}{" "}
          </h2>
        </div>

        <span className={styles.periodText}>
          {period === "/ano" ? "/ano" : period === "/mês" ? "/mês" : "/sem"}
        </span>
        <div className={styles.cardBody}>
          <ul className={styles.featuresList}>
            <li>
              <div className={styles.listDivs}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#3498db"
                    d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"
                  ></path>
                </svg>
                <span className={styles.label}>Membros</span>
                <span className={styles.value}>
                  {details.membersLimit === null
                    ? "ILIMITADOS"
                    : details.membersLimit}
                </span>
              </div>
            </li>
            <li>
              <div className={styles.listDivs}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#3498db"
                    d="M10 4c2.2 0 4 1.8 4 4s-1.8 4-4 4s-4-1.8-4-4s1.8-4 4-4m7 17l1.8 1.77c.5.5 1.2.1 1.2-.49V18l2.8-3.4A1 1 0 0 0 22 13h-7c-.8 0-1.3 1-.8 1.6L17 18zm-2-2.3l-2.3-2.8c-.4-.5-.6-1.1-.6-1.7c-.7-.2-1.4-.2-2.1-.2c-4.4 0-8 1.8-8 4v2h13z"
                  ></path>
                </svg>
                <span className={styles.label}>Leads</span>
                <span className={styles.value}>{details.leadsLimit}</span>
              </div>
            </li>
            <li>
              <div className={styles.listDivs}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#3498db"
                    d="M11 17V7H4v10zm0-14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm5.5 0h5A1.5 1.5 0 0 1 23 4.5v3A1.5 1.5 0 0 1 21.5 9H18l-3 3V4.5A1.5 1.5 0 0 1 16.5 3"
                  ></path>
                </svg>
                <span className={styles.label}>Mensagens</span>
                <span className={styles.value}>{details.messagesLimit}</span>
              </div>
            </li>
            <li>
              <div className={styles.listDivs}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#3498db"
                    d="M18.72 14.76c.35-.85.54-1.76.54-2.76c0-.72-.11-1.41-.3-2.05c-.65.15-1.33.23-2.04.23A9.07 9.07 0 0 1 9.5 6.34a9.2 9.2 0 0 1-4.73 4.88c-.04.25-.04.52-.04.78A7.27 7.27 0 0 0 12 19.27c1.05 0 2.06-.23 2.97-.64c.57 1.09.83 1.63.81 1.63c-1.64.55-2.91.82-3.78.82c-2.42 0-4.73-.95-6.43-2.66a9 9 0 0 1-2.24-3.69H2v-4.55h1.09a9.09 9.09 0 0 1 15.33-4.6a9 9 0 0 1 2.47 4.6H22v4.55h-.06L18.38 18l-5.3-.6v-1.67h4.83zm-9.45-2.99c.3 0 .59.12.8.34a1.136 1.136 0 0 1 0 1.6c-.21.21-.5.33-.8.33c-.63 0-1.14-.5-1.14-1.13s.51-1.14 1.14-1.14m5.45 0c.63 0 1.13.51 1.13 1.14s-.5 1.13-1.13 1.13s-1.14-.5-1.14-1.13a1.14 1.14 0 0 1 1.14-1.14"
                  ></path>
                </svg>
                <span className={styles.label}>Suporte</span>
                <span className={styles.value}>{details.supportType}</span>
              </div>
            </li>
            <li>
              <div className={styles.listDivs}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#3498db"
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2z"
                  ></path>
                </svg>
                <span className={styles.label}>Relatórios</span>
                <span className={styles.value}>
                  {details.reportsType === "COMPLETE"
                    ? "COMPLETOS"
                    : details.reportsType === "SIMPLE"
                      ? "SIMPLES"
                      : "AVANÇADOS"}
                </span>
              </div>
            </li>
            {details.aiIncluded && (
              <li>
                <div className={styles.listDivs}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#3498db"
                      d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5"
                    ></path>
                  </svg>
                  <span className={styles.label}>IA</span>
                  <span className={styles.value}>
                    {details.aiType === "BASIC"
                      ? "BÁSICA"
                      : details.aiType === "ADVANCED"
                        ? "AVANÇADA"
                        : "PERSONALIZADA"}
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>
        <Button
          variant="primary"
          className={styles.subscribeBtn}
          onClick={() => handlePlanChoice({ id, name, price })}
        >
          {name === "FREE" ? "Testar por 7 dias" : "Assinar Agora"}
        </Button>
      </div>
    );
  };

  const displayedPlans =
    period === "/ano"
      ? annualPlans
      : period === "/mês"
        ? monthlyPlans
        : semesterPlans;

  return (
    <>
      <div className={styles.mainPlans}>
        <h2 className={styles.title}>Escolha o melhor plano para você</h2>
        <div className={styles.btns}>
          <Button
            variant={period === "/mês" ? "primary" : "ghost"}
            className={styles.toggleBtn}
            onClick={() => setPeriod("/mês")}
          >
            Mensal
          </Button>
          <Button
            variant={period === "/semestre" ? "primary" : "ghost"}
            className={styles.toggleBtn}
            onClick={() => setPeriod("/sem")}
          >
            Semestral
          </Button>
          <Button
            variant={period === "/ano" ? "primary" : "ghost"}
            className={styles.toggleBtn}
            onClick={() => setPeriod("/ano")}
          >
            Anual
          </Button>
        </div>

        <div className={styles.cardsContainer}>
          {displayedPlans.map((plan) => (
            <Card
              key={plan.id}
              id={plan.id}
              name={plan.name}
              price={plan.price}
              details={plan.details}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PlansComponent;
