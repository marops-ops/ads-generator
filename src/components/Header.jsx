import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>RSA</span>
          <span className={styles.logoSep}>/</span>
          <span className={styles.logoSub}>Generator</span>
        </div>
        <div className={styles.badge}>
          Messy Middle Framework
        </div>
      </div>
    </header>
  )
}
