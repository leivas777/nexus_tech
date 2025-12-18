import styles from './About.module.css'
import {Link} from 'react-router-dom'

const About = () => {
  return (
    <>
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
              Rua Catavento, 805, Bloco 5, Apto 207, Campeche, Florianópolis/SC,
              88.063-430, Brasil
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
    </>
  );
};

export default About;
