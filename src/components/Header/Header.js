import styles from './Header.module.css'
import logo from '../../assets/logo_nexus_sem_fundo.png'

const Header = () => {
  return (
        <div className={styles.top}>

            <h1>
                <span className={styles.mainLogo}>Nexus</span>
                <span className={styles.logo}> Tech</span>
            </h1>
        </div>
  )
}

export default Header