import styles from './Header.module.css'

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