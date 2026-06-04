import styles from './StrategicAnalysis.module.css'

export default function StrategicAnalysis({ analysis }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.num}>02</span>
        <span className={styles.title}>Strategic Analysis</span>
      </div>
      <p className={styles.text}>{analysis}</p>
    </section>
  )
}
