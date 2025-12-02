import styles from "./Footer.module.css"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
      <div className={styles.footer}>
        <p>&copy; Leivas & Leivas Ltda</p> <p>Todos os direitos reservados.</p>{" "}
        <p>
          <Link to="/privacy-policy">Política de Privacidade</Link>
        </p>
      </div>
  )
}

export default Footer