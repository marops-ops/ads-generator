import styles from './HeadlineGrid.module.css'

function CharCount({ text, max }) {
  const n = (text || '').length
  const over = n > max
  return (
    <span className={over ? styles.charOver : styles.charOk}>
      {n}/{max}
    </span>
  )
}

export default function HeadlineGrid({ headlines }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.num}>03</span>
        <span className={styles.title}>15 Shared Headlines</span>
        <span className={styles.note}>H1 + H2 contain keyword</span>
      </div>
      <div className={styles.grid}>
        {headlines.map(h => (
          <div
            key={h.num}
            className={`${styles.card} ${h.keyword ? styles.cardKw : ''}`}
          >
            <div className={styles.cardTop}>
              <span className={styles.cardNum}>#{h.num}</span>
              {h.keyword && <span className={styles.kwBadge}>KW</span>}
              <CharCount text={h.text} max={30} />
            </div>
            <div className={styles.cardText}>{h.text}</div>
            <div className={styles.cardShortcut}>{h.shortcut}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
