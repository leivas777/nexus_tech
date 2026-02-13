import React from 'react';
import { useNavigate } from "react-router-dom";

function HealthBeautySection() {
  const navigate = useNavigate();
  const handleCTAClick = () => {
    navigate('/registration');
  };

  return (
    <section aria-labelledby="benefits-title" className="benefits-section">
      <div className="benefits-container">
        {/* Hero com Comparação de Tempo */}
        <div className="benefits-hero">
          <h1 id="benefits-title" className="benefits-title">
            Transforme a Gestão de Seus Agendamentos
          </h1>
          <p className="benefits-subtitle">
            Economize horas do seu dia e aumente sua produtividade com automação inteligente
          </p>

          <div className="comparison-wrapper">
            <div className="comparison-card comparison-before">
              <div className="comparison-icon before-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="comparison-label">Antes</h3>
              <p className="comparison-time">2-3 horas</p>
              <p className="comparison-desc">por dia respondendo mensagens e agendando</p>
            </div>

            <div className="comparison-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            <div className="comparison-card comparison-after">
              <div className="comparison-icon after-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="comparison-label">Depois</h3>
              <p className="comparison-time">15 minutos</p>
              <p className="comparison-desc">com automação inteligente</p>
            </div>
          </div>
        </div>

        {/* Grid de Benefícios */}
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.44-.53-1.25-.58-1.78-.15-.53.44-.58 1.25-.15 1.78l3 3.69c.39.48.98.75 1.61.75.63 0 1.22-.27 1.61-.75l3.54-4.39c.44-.53.39-1.34-.15-1.78-.53-.44-1.34-.39-1.78.15z" />
              </svg>
            </div>
            <h3 className="benefit-title">Controle da Agenda Automático</h3>
            <p className="benefit-description">
              Organize seus agendamentos automaticamente, sem intervenção manual. Receba confirmações e lembretes em tempo real.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
            <h3 className="benefit-title">Agendamentos Inteligentes</h3>
            <p className="benefit-description">
              Seus clientes agendam sem interrupção. Fluxo automático de qualificação e encaminhamento, você continua trabalhando.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="benefit-title">Confirmação de Presença Automática</h3>
            <p className="benefit-description">
              Receba confirmações automáticas dos seus clientes. Reduza faltas e otimize sua agenda com lembretes inteligentes.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="benefit-title">Cobrança Automática</h3>
            <p className="benefit-description">
              Receba pagamentos automaticamente após cada atendimento. Integração com principais gateways de pagamento.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="benefits-cta-wrapper">
          <button
            className="btn btn--primary"
            onClick={handleCTAClick}
            aria-label="Fazer teste grátis da automação de agendamento"
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

        .benefits-section {
          background: linear-gradient(135deg, #c3e1e3 0%, #7ebec5 100%);
          padding: 60px 20px;
        }

        @media (min-width: 768px) {
          .benefits-section {
            padding: 80px 40px;
          }
        }

        .benefits-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Hero */
        .benefits-hero {
          text-align: center;
          margin-bottom: 60px;
        }

        .benefits-title {
          font-family: "Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 28px;
          font-weight: 800;
          line-height: 1.2;
          color: var(--nx-text-primary);
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }

        @media (min-width: 768px) {
          .benefits-title {
            font-size: 40px;
            margin-bottom: 20px;
          }
        }

        .benefits-subtitle {
          font-family: "Nunito", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: var(--nx-text-secondary);
          margin: 0 0 40px 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 768px) {
          .benefits-subtitle {
            font-size: 18px;
            margin-bottom: 50px;
          }
        }

        /* Comparação */
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
        .benefits-cta-wrapper {
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
          .btn {
            transition: none;
          }
        }

        
        }
      `}</style>
    </section>
  );
}

export default HealthBeautySection;