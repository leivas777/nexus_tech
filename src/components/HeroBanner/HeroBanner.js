import React from "react";

const HeroBanner = ({ logoSrc, onCtaClick }) => {
  return (
    <section aria-labelledby="hero-title" className="hero" role="banner">
      <div className="hero__inner">
        <div className="hero__content">
          <img
            src={logoSrc}
            alt="Nexus Tech"
            className="hero__logo"
            width={220}
            height={64}
          />
          <h1 id="hero-title" className="hero__title">
            Automatize seu WhatsApp Business com zero fricção
          </h1>

          <p className="hero__subtitle">
            Responda mais rápido, qualifique leads e ganhe escala sem perder o
            toque humano. Teste grátis em minutos.
          </p>

          <div className="hero__ctaWrap">
            <a
              href="/registration"
              className="btn btn--primary"
              onClick={onCtaClick}
              aria-label="Fazer teste Grátis de automação do WhatsApp Business"
            >
              Fazer teste grátis
            </a>
            <p className="hero__micro">Sem cartão. Cancele quando quiser.</p>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="visual__phone">
            <div className="visual__screen">
              <span className="bubble bubble--in">
                Oi! 👋 Como posso ajudar?
              </span>
              <span className="bubble bubble--out">
                Quero falar sobre orçamento.
              </span>
              <span className="bubble bubble--in">
                Perfeito! Você é MEI ou PME?
              </span>
            </div>
          </div>
          <div className="visual__nodes">
            <span className="node" />
            <span className="node" />
            <span className="node" />
            <span className="link" />
          </div>
        </div>
      </div>
      <style>{`
                :root {
                    --nx-primary: #3498db;
                    --nx-primary-dark: #2980b9;
                    --nx-primary-darker: #1f618d;
                    --nx-accent-1: #2084d2;
                    --nx-accent-2: #7ebec5;
                    --nx-accent-3: #90e7f6;
                    --nx-accent-4: #C3E1E3;
                    --nx-text: #273b4f;
                    --nx-text-sec: #34495e;
                    --nx-white: #ffffff;
                    --radius-lg: 12px;
                }

                .hero {
                    color: var(--nx-primary);
                    position: relative;
                    overflow: hidden;
                    margin-top: 1vh;
                    border: none;
                }

                .hero__inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 48px 6%;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 40px;
                    align-items: center;
                }

                @media (min-width: 960px) {
                    .hero__inner {
                        grid-template-columns: 1fr 1.1fr;
                        padding: 72px 6%;
                        gap: 56px;
                    }
                }

                .hero__content {
                    max-width: 640px;
                }

                .hero__logo {
                    display: block;
                    width: 200px;
                    height: auto;
                    margin-bottom: 24px;
                    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));
                }

                .hero__title {
                    font-family: "Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans";
                    font-weight: 800;
                    font-size: 2rem;
                    line-height: 1.15;
                    margin: 0 0 16px 0;
                    letter-spacing: -0.015em;
                    text-wrap: balance;
                }

                @media (min-width: 960px) {
                    .hero__title {
                        font-size: 2.5rem;
                        margin-bottom: 20px;
                    }
                }

                .hero__subtitle {
                    font-family: "Nunito", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans";
                    font-size: 1.125rem;
                    line-height: 1.55;
                    color: var(--primary-dark);
                    margin: 0 0 24px 0;
                    text-wrap: pretty;
                }

                @media (min-width: 960px) {
                    .hero__subtitle {
                        font-size: 1.2rem;
                        margin-bottom: 28px;
                    }
                }

                .hero__ctaWrap {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 12px;
                }

                .btn {
                    --_bg: var(--nx-primary);
                    --_bg-hover: var(--nx-primary-dark);
                    --_text: var(--nx-white);

                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 14px 22px;
                    border-radius: var(--radius-lg);
                    background: var(--_bg);
                    color: var(--_text);
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 1rem;
                    line-height: 1;
                    border: 2px solid transparent;
                    box-shadow: 0 6px 18px rgba(32, 132, 210, 0.35);
                    transition: background-color 160ms ease, transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
                }

                .btn:hover {
                    background: var(--_bg-hover);
                    transform: translateY(-1px);
                    box-shadow: 0 8px 22px rgba(41, 128, 185, 0.45);
                }

                .btn:active {
                    transform: translateY(0);
                    box-shadow: 0 4px 12px rgba(41, 128, 185, 0.35);
                }

                .btn:focus-visible {
                    outline: none;
                    border-color: var(--nx-white);
                    box-shadow:
                        0 0 0 2px var(--nx-white),
                        0 0 0 5px rgba(32,132,210,0.65);
                }

                .hero__micro {
                    font-size: 0.9rem;
                    color: var(--primary-dark);
                }

                .hero__visual {
                    position: relative;
                    min-height: 260px;
                    display: grid;
                    place-items: center;
                }

                @media (min-width: 960px) {
                    .hero__visual {
                        min-height: 420px;
                    }
                }

                .visual__phone {
                    width: 260px;
                    height: 520px;
                    background: linear-gradient(160deg, rgba(10, 9, 9, 0.51), rgba(10, 9, 9, 0.51));
                    border: 1px solid rgba(255,255,255,0.25);
                    border-radius: 28px;
                    position: relative;
                    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.25);
                    backdrop-filter: blur(4px);
                }

                .visual__screen {
                    position: absolute;
                    inset: 22px;
                    background: rgba(255, 254, 254, 0.69);
                    border-radius: 18px;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    overflow: hidden;
                }

                .bubble {
                    display: inline-block;
                    max-width: 90%;
                    padding: 10px 12px;
                    border-radius: 14px;
                    font-size: 0.9rem;
                    line-height: 1.35;
                    color: var(--nx-text);
                    background: var(--nx-white);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
                }

                .bubble--in {
                    align-self: flex-start;
                    background: var(--nx-white);
                }

                .bubble--out {
                    align-self: flex-end;
                    background: linear-gradient(160deg, var(--nx-accent-3), var(--nx-accent-4));
                }

                .visual__nodes {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                }

                .visual__nodes .node {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border-radius: 999px;
                    background: var(--nx-accent-3);
                    box-shadow: 0 0 18px var(--nx-accent-3);
                }

                .visual__nodes .node:nth-child(1) { top: 8%; left: 64%; }
                .visual__nodes .node:nth-child(2) { top: 42%; left: 92%; }
                .visual__nodes .node:nth-child(3) { bottom: 10%; left: 70%; }

                .visual__nodes .link {
                    position: absolute;
                    top: 18%;
                    left: 64%;
                    width: 30%;
                    height: 2px;
                    background: linear-gradient(90deg, rgba(144,231,246,0), rgba(144,231,246,0.9), rgba(144,231,246,0));
                    transform: rotate(10deg);
                    filter: drop-shadow(0 0 8px rgba(144,231,246,0.9));
                }

                @media (prefers-reduced-motion: reduce) {
                    .btn {
                        transition: none;
                    }
                }
            `}</style>
    </section>
  );
};

export default HeroBanner;
