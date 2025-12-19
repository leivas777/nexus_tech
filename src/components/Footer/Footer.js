import styles from "./Footer.module.css";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_nexus_sem_fundo.png";

const WHATSAPP_PHONE = "5551992747402";

const Footer = () => {
    const waHref = useMemo(() => {
        const page =
            typeof window !== "undefined"
                ? window.location.href
                : "https://nexustech.tec.br";
        const text = `Olá! Gostaria de falar com a equipe da Nexus Tech via site. \n\nPágina:${page}`;
        return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
    }, []);

    const recipient = "contato@nexustech.tec.br";
    const subject = "Contato";
    const body =
        "Olá, vim através do site nexustech.tec.br e gostaria de mais informações sobre a empresa.";

    return (
        <div className={styles.footer}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles.footerContent}>
                <div className={styles.navigation}>
                    <h3>Navegação</h3>
                    <div className={styles.list}>
                        <p>Preços</p>
                        <p>Benefícios</p>
                        <p>Comparativo</p>
                    </div>
                </div>
                <div className={styles.solutions}>
                    <h3>Soluções</h3>
                    <div className={styles.list}>
                        <p>Agendamentos</p>
                        <p>Cobranças</p>
                        <p>Alertas</p>
                        <p>Gestão</p>
                        <p>Atendimentos</p>
                        <p>Newsletter</p>
                    </div>
                </div>
                <div className={styles.contactInfo}>
                    <h3>Contato</h3>
                    <div className={styles.list}>
                        <a href="/about">Sobre nós</a>
                        <p>51 99274-7402</p>
                        <a
                            href={`mailto:${encodeURIComponent(
                                recipient
                            )}?subject=${encodeURIComponent(
                                subject
                            )}&body=${encodeURIComponent(body)}`}
                        >
                            contato@nexustech.tec.br
                        </a>
                    </div>
                </div>
                <div className={styles.contact}>
                    <div className={styles.socialMedia}>
                        <a
                            href="https://www.facebook.com/share/1EKRNoNMoy/?mibextid=wwXIfr"
                            className={styles.socialMediaBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Acessar página do Facebook"
                        >
                            <svg
                                fill="#ffffff"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="64px"
                                height="64px"
                                viewBox="-256 -256 1024.00 1024.00"
                                stroke="#ffffff"
                                strokeWidth="10.24"
                            >
                                <g
                                    id="SVGRepo_bgCarrier"
                                    strokeWidth="0"
                                    transform="translate(51.19999999999999,51.19999999999999), scale(0.8)"
                                >
                                    <rect
                                        x="-256"
                                        y="-256"
                                        width="1024.00"
                                        height="1024.00"
                                        rx="512"
                                        fill="#3498db"
                                        strokeWidth="0"
                                    ></rect>
                                </g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g id="7935ec95c421cee6d86eb22ecd11b7e3">
                                        <path d="M283.122,122.174c0,5.24,0,22.319,0,46.583h83.424l-9.045,74.367h-74.379 c0,114.688,0,268.375,0,268.375h-98.726c0,0,0-151.653,0-268.375h-51.443v-74.367h51.443c0-29.492,0-50.463,0-56.302 c0-27.82-2.096-41.02,9.725-62.578C205.948,28.32,239.308-0.174,297.007,0.512c57.713,0.711,82.04,6.263,82.04,6.263 l-12.501,79.257c0,0-36.853-9.731-54.942-6.263C293.539,83.238,283.122,94.366,283.122,122.174z"></path>
                                    </g>
                                </g>
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/nexu.sautomacao?igsh=b29kc3hwZndudDk1"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Acessar página do Instagram"
                        >
                            <svg
                                width="64px"
                                height="64px"
                                viewBox="-10 -10 40.00 40.00"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#ffffff"
                                stroke="#ffffff"
                            >
                                <g
                                    id="SVGRepo_bgCarrier"
                                    strokeWidth="0"
                                    transform="translate(2,2), scale(0.8)"
                                >
                                    <rect
                                        x="-10"
                                        y="-10"
                                        width="40.00"
                                        height="40.00"
                                        rx="20"
                                        fill="#3498db"
                                        strokeWidth="0"
                                    ></rect>
                                </g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <title>instagram [#167]</title>
                                    <desc>Created with Sketch.</desc>
                                    <defs></defs>
                                    <g
                                        id="Page-1"
                                        strokeWidth="0.4"
                                        fill="none"
                                        fillRule="evenodd"
                                    >
                                        <g
                                            id="Dribbble-Light-Preview"
                                            transform="translate(-340.000000, -7439.000000)"
                                            fill="#ffffff"
                                        >
                                            <g
                                                id="icons"
                                                transform="translate(56.000000, 160.000000)"
                                            >
                                                <path
                                                    d="M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7285.67967 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792"
                                                    id="instagram-[#167]"
                                                ></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                        <a
                            href={waHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Enviar mensagem WhatsApp"
                        >
                            <svg
                                fill="#ffffff"
                                width="64px"
                                height="64px"
                                viewBox="-8 -8 32.00 32.00"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#ffffff"
                                strokeWidth="0.304"
                            >
                                <g
                                    id="SVGRepo_bgCarrier"
                                    strokeWidth="0"
                                    transform="translate(1.5999999999999996,1.5999999999999996), scale(0.8)"
                                >
                                    <rect
                                        x="-8"
                                        y="-8"
                                        width="32.00"
                                        height="32.00"
                                        rx="16"
                                        fill="#3498db"
                                        strokeWidth="0"
                                    ></rect>
                                </g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z"></path>
                                    <path d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z"></path>
                                </g>
                            </svg>
                        </a>
                    </div>
                    <div className={styles.newsletter}>
                        <h3>Receba nossas novidades</h3>
                        <div className={styles.newsForm}>
                            <form id="newsletter-form">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Digite seu melhor e-mail"
                                    required
                                />
                                <button type="submit" id="submit-btn">
                                    Assinar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={styles.info}>
                    <p>&copy; Leivas & Leivas Ltda</p>
                    <p>Todos os direitos reservados.</p>
                    <p>
                        <Link to="/privacy-policy">Política de Privacidade</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
