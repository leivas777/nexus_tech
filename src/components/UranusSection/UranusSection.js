import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UranusSection() {
  const [activeTab, setActiveTab] = useState("empresa");
  const navigate = useNavigate();
  
  const handleCTAClick = () => {
    navigate("/registration");
  };

  return (
    <section
      aria-labelledby="uranus-title"
      className="uranus-section"
    >
      <div className="uranus-container">
        {/* Hero */}
        <div className="uranus-hero">
          <h1 id="uranus-title" className="uranus-title">
            Controle Total de Suas Finanças
          </h1>
          <p className="uranus-subtitle">
            Uranus: A solução completa para controle de cobranças e finanças,
            seja você uma empresa ou pessoa física
          </p>
        </div>

        {/* Tabs de Público */}
        <div className="uranus-tabs">
          <button
            className={`tab-btn ${
              activeTab === "empresa" ? "tab-btn--active" : ""
            }`}
            onClick={() => setActiveTab("empresa")}
            aria-selected={activeTab === "empresa"}
            role="tab"
          >
            <span className="tab-icon">🏢</span>
            Para Empresas
          </button>
          <button
            className={`tab-btn ${
              activeTab === "pessoal" ? "tab-btn--active" : ""
            }`}
            onClick={() => setActiveTab("pessoal")}
            aria-selected={activeTab === "pessoal"}
            role="tab"
          >
            <span className="tab-icon">👤</span>
            Para Pessoas Físicas
          </button>
        </div>

        {/* Comparação - Empresas */}
        {activeTab === "empresa" && (
          <div
            className="comparison-section"
            role="tabpanel"
            aria-labelledby="tab-empresa"
          >
            <div className="comparison-wrapper">
              <div className="comparison-card comparison-before">
                <div className="comparison-icon before-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="comparison-label">Antes</h3>
                <p className="comparison-time">4-6 horas</p>
                <p className="comparison-desc">
                  por semana em controle de cobranças e finanças
                </p>
              </div>

              <div className="comparison-arrow">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>

              <div className="comparison-card comparison-after">
                <div className="comparison-icon after-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="comparison-label">Depois</h3>
                <p className="comparison-time">30 minutos</p>
                <p className="comparison-desc">com automação inteligente</p>
              </div>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.44-.53-1.25-.58-1.78-.15-.53.44-.58 1.25-.15 1.78l3 3.69c.39.48.98.75 1.61.75.63 0 1.22-.27 1.61-.75l3.54-4.39c.44-.53.39-1.34-.15-1.78-.53-.44-1.34-.39-1.78.15z" />
                  </svg>
                </div>
                <h3 className="benefit-title">
                  Controle de Cobrança de Mensalidades
                </h3>
                <p className="benefit-description">
                  Automatize cobranças recorrentes, receba notificações de
                  atrasos e gerencie pagamentos de forma centralizada.
                </p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
                <h3 className="benefit-title">
                  Controle de Finanças Empresariais
                </h3>
                <p className="benefit-description">
                  Gerencie receitas, despesas e fluxo de caixa da sua micro ou
                  pequena empresa em um único lugar.
                </p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="benefit-title">
                  Controle de Histórico Financeiro
                </h3>
                <p className="benefit-description">
                  Acesse relatórios detalhados e histórico completo de todas as
                  transações e movimentações financeiras.
                </p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="benefit-title">Análise de Dados Financeiros</h3>
                <p className="benefit-description">
                  Visualize gráficos e análises de tendências para tomar
                  decisões financeiras mais inteligentes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Comparação - Pessoas Físicas */}
        {activeTab === "pessoal" && (
          <div
            className="comparison-section"
            role="tabpanel"
            aria-labelledby="tab-pessoal"
          >
            <div className="comparison-wrapper">
              <div className="comparison-card comparison-before">
                <div className="comparison-icon before-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="comparison-label">Antes</h3>
                <p className="comparison-time">Sem controle</p>
                <p className="comparison-desc">
                  dificuldade em acompanhar gastos
                </p>
              </div>

              <div className="comparison-arrow">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>

              <div className="comparison-card comparison-after">
                <div className="comparison-icon after-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="comparison-label">Depois</h3>
                <p className="comparison-time">Visibilidade total</p>
                <p className="comparison-desc">
                  análise completa de seus gastos
                </p>
              </div>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.44-.53-1.25-.58-1.78-.15-.53.44-.58 1.25-.15 1.78l3 3.69c.39.48.98.75 1.61.75.63 0 1.22-.27 1.61-.75l3.54-4.39c.44-.53.39-1.34-.15-1.78-.53-.44-1.34-.39-1.78.15z" />
                  </svg>
                </div>
                <h3 className="benefit-title">Controle de Finanças Pessoais</h3>
                <p className="benefit-description">
                  Acompanhe todos os seus gastos em um único lugar. Categorize
                  despesas e visualize onde seu dinheiro está indo.
                </p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
                <h3 className="benefit-title">Análise de Gastos Detalhada</h3>
                <p className="benefit-description">
                  Receba insights sobre seus padrões de consumo e identifique
                  oportunidades de economia.
                </p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="benefit-title">Histórico Financeiro Completo</h3>
                <p className="benefit-description">
                  Acesse o histórico de todas as suas transações e movimentações
                  financeiras a qualquer momento.
                </p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="benefit-title">
                  Metas e Planejamento Financeiro
                </h3>
                <p className="benefit-description">
                  Defina metas de economia e acompanhe seu progresso para
                  atingir seus objetivos financeiros.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="uranus-cta-wrapper">
          <button
            className="btn btn--primary"
            onClick={handleCTAClick}
            aria-label="Fazer teste grátis do Uranus"
          >
            Fazer Teste Grátis
          </button>
          <p className="cta-microcopy">Sem cartão. Cancele quando quiser.</p>
        </div>
      </div>

      <style>{`
        :root {
          --nx-primary: #3498db;
          --nx-primary-dark: #2980b9;
          --nx-primary-darker: #1f618d;
          --nx-secondary-dark: #226370;
          --nx-tertiary-light: #C3e1e3;
          --nx-tertiary-dark: #7ebec5;
          --nx-logo-1: #90e7f6;
          --nx-logo-2: #34b8eb;
          --nx-logo-3: #0e47a1;
          --nx-logo-4: #2084d2;
          --nx-logo-5: #062687;
          --nx-white: #FFF;
          --nx-text-primary: #273b4f;
          --nx-text-secondary: #34495e;
          --nx-gray-light: #f5f7fa;
          --nx-gray-border: #e0e5eb;
        }

        .uranus-section {
          background: linear-gradient(135deg, var(--nx-white) 0%, var(--nx-gray-light) 100%);
          padding: 60px 20px;
        }

        @media (min-width: 768px) {
          .uranus-section {
            padding: 80px 40px;
          }
        }

        .uranus-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Hero */
        .uranus-hero {
          text-align: center;
          margin-bottom: 50px;
        }

        .uranus-title {
          font-family: "Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 28px;
          font-weight: 800;
          line-height: 1.2;
          color: var(--nx-text-primary);
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }

        @media (min-width: 768px) {
          .uranus-title {
            font-size: 40px;
            margin-bottom: 20px;
          }
        }

        .uranus-subtitle {
          font-family: "Nunito", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: var(--nx-text-secondary);
          margin: 0 0 40px 0;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 768px) {
          .uranus-subtitle {
            font-size: 18px;
            margin-bottom: 50px;
          }
        }

        /* Tabs */
        .uranus-tabs {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: 2px solid var(--nx-gray-border);
          border-radius: 8px;
          background: var(--nx-white);
          color: var(--nx-text-secondary);
          font-family: "Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 200ms ease;
        }

        .tab-btn:hover {
          border-color: var(--nx-primary);
          color: var(--nx-primary);
        }

        .tab-btn--active {
          background: linear-gradient(135deg, var(--nx-primary), var(--nx-primary-dark));
          color: var(--nx-white);
          border-color: var(--nx-primary);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.25);
        }

        .tab-icon {
          font-size: 20px;
        }

        /* Comparação */
        .comparison-section {
          margin-bottom: 50px;
        }

        .comparison-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        @media (min-width: 768px) {
          .comparison-wrapper {
            flex-direction: row;
            justify-content: center;
            gap: 30px;
            align-items: stretch;
          }
        }

        .comparison-card {
          flex: 1;
          max-width: 280px;
          padding: 32px 24px;
          border-radius: 12px;
          text-align: center;
          border: 2px solid transparent;
          transition: all 300ms ease;
        }

        .comparison-before {
          background: linear-gradient(135deg, var(--nx-tertiary-light) 0%, rgba(195, 225, 227, 0.5) 100%);
          border-color: var(--nx-tertiary-light);
        }

        .comparison-after {
          background: linear-gradient(135deg, var(--nx-logo-1) 0%, rgba(144, 231, 246, 0.5) 100%);
          border-color: var(--nx-logo-1);
        }

        .comparison-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(52, 152, 219, 0.15);
        }

        .comparison-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--nx-white);
          font-size: 28px;
        }

        .before-icon {
          background: linear-gradient(135deg, var(--nx-tertiary-dark), var(--nx-secondary-dark));
        }

        .after-icon {
          background: linear-gradient(135deg, var(--nx-logo-2), var(--nx-logo-4));
        }

        .comparison-icon svg {
          width: 32px;
          height: 32px;
        }

        .comparison-label {
          font-family: "Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--nx-text-primary);
          margin: 0 0 8px 0;
        }

        .comparison-time {
          font-family: "Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: var(--nx-primary-darker);
          margin: 0 0 4px 0;
        }

        .comparison-desc {
          font-family: "Nunito", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: var(--nx-text-secondary);
          margin: 0;
        }

        .comparison-arrow {
          display: none;
          width: 40px;
          height: 40px;
          color: var(--nx-primary);
          align-self: center;
        }

        @media (min-width: 768px) {
          .comparison-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .comparison-arrow svg {
          width: 100%;
          height: 100%;
        }

        /* Grid de Benefícios */
        .benefits-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 50px;
        }

        @media (min-width: 768px) {
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (min-width: 1024px) {
          .benefits-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .benefit-card {
          background: var(--nx-white);
          padding: 32px 24px;
          border-radius: 12px;
          border: 1px solid var(--nx-gray-border);
          transition: all 300ms ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .benefit-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(52, 152, 219, 0.12);
          border-color: var(--nx-primary);
        }

        .benefit-icon {
          width: 64px;
          height: 64px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--nx-primary), var(--nx-primary-dark));
          border-radius: 12px;
          color: var(--nx-white);
        }

        .benefit-icon svg {
          width: 32px;
          height: 32px;
        }

        .benefit-title {
          font-family: "Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--nx-text-primary);
          margin: 0 0 12px 0;
          line-height: 1.3;
        }

        .benefit-description {
          font-family: "Nunito", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: var(--nx-text-secondary);
          margin: 0;
          flex-grow: 1;
        }

        /* CTA */
        .uranus-cta-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 32px;
          border: 2px solid transparent;
          border-radius: 12px;
          font-family: "Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
          font-weight: 700;
          font-size: 16px;
          line-height: 1;
          text-decoration: none;
          cursor: pointer;
          transition: all 160ms ease;
          box-shadow: 0 6px 18px rgba(52, 152, 219, 0.35);
        }

        .btn--primary {
          background: var(--nx-primary);
          color: var(--nx-white);
        }

        .btn--primary:hover {
          background: var(--nx-primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(52, 152, 219, 0.45);
        }

        .btn--primary:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.35);
        }

        .btn--primary:focus-visible {
          outline: none;
          border-color: var(--nx-white);
          box-shadow:
            0 0 0 2px var(--nx-white),
            0 0 0 5px rgba(52, 152, 219, 0.65);
        }

        .cta-microcopy {
          font-family: "Nunito", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 14px;
          color: var(--nx-text-secondary);
          margin: 0;
        }

        /* Acessibilidade */
        @media (prefers-reduced-motion: reduce) {
          .benefit-card,
          .comparison-card,
          .tab-btn,
          .btn {
            transition: none;
          }
        }

        @media (prefers-color-scheme: dark) {
          .uranus-section {
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          }

          .benefit-card,
          .tab-btn {
            background: #222;
            border-color: #333;
          }

          .uranus-title,
          .benefit-title,
          .comparison-label {
            color: var(--nx-white);
          }

          .uranus-subtitle,
          .benefit-description,
          .comparison-desc,
          .cta-microcopy,
          .tab-btn {
            color: #ccc;
          }

          .tab-btn--active {
            background: linear-gradient(135deg, var(--nx-primary), var(--nx-primary-dark));
            color: var(--nx-white);
          }
        }
      `}</style>
    </section>
  );
}

export default UranusSection;
