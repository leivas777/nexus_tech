import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  const recipient = "nexus_tech@leivaseleivas.com";
  const subject = "Política de Privacidade";
  const body = "Olá, gostaria de informações sobre a política de privacidade.";
  return (
    <>
      <div className={styles.top}>
        <h1>
          <span className={styles.mainLogo}>Nexus</span>
          <span className={styles.logo}> Tech</span>
        </h1>
      </div>
      <body>
        <div className={styles.dados}>
          <h1 className={styles.title}>Detalhes da Empresa</h1>
          <div className={styles.dadosCadastrais}>
            <label>
              <span className={styles.dadosCadastraisTitle}>Razão Social:</span>
              <span className={styles.infoDados}>Leivas & Leivas Ltda</span>
            </label>
            <label>
              <span className={styles.dadosCadastraisTitle}>Endereço:</span>
              <span className={styles.infoDados}>
                Rua Catavento, 805, Bloco 5, Apto 207, Campeche,
                Florianópolis/SC, 88.063-430, Brasil
              </span>
            </label>
            <label>
              <span className={styles.dadosCadastraisTitle}>
                Telefone Comercial:
              </span>
              <span className={styles.infoDados}>+55 51 99274-7402</span>
            </label>
            <label>
              <span className={styles.dadosCadastraisTitle}>Website:</span>
              <span className={styles.infoDados}>
                <Link to="/">https://nexustech.tec.br/</Link>
              </span>
            </label>
            <label>
              <span className={styles.dadosCadastraisTitle}>CNPJ:</span>
              <span className={styles.infoDados}>18.178.734/0001-20</span>
            </label>
          </div>
        </div>
        <div className={styles.privacyPolicy}>
          <h1 className={styles.title}>Política de Privacidade</h1>
          <div className={styles.policy}>
            <div>
              <text>
                Na Leivas & Leivas valorizamos sua privacidade e estamos
                comprometidos em proteger seus dados pessoais. Coletamos e
                processamos apensas as informaçãoes necessárias para o
                funcionamento dos nossos serviços, em conformidade com a LGPD
                (Lei Geral de Proteção de Dados).
              </text>
            </div>
            <div>
              <text>
                Para dúvidas ou solicitações relacionadas aos seus dados
                pessoais, entre em contato pelo e-mail:{" "}
                <a
                  href={`mailto:${encodeURIComponent(
                    recipient
                  )}?subject=${encodeURIComponent(
                    subject
                  )}&body=${encodeURIComponent(body)}`}
                >
                  nexus_tech@leivaseleivas.com
                </a>
              </text>
            </div>
          </div>
        </div>
      </body>
      <div className={styles.footer}>
        <p>&copy; Leivas & Leivas Ltda</p> <p>Todos os direitos reservados.</p>{" "}
        <p>
          <Link to="/privacy-policy">Política de Privacidade</Link>
        </p>
      </div>
    </>
  );
};

export default Home;
