import styles from './AdVariations.module.css'

function CharCount({ text, max }) {
  const n = (text || '').length
  const over = n > max
  return (
    <span className={over ? styles.charOver : styles.charOk}>
      {n}/{max}
    </span>
  )
}

export default function AdVariations({ ads }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.num}>04</span>
        <span className={styles.title}>4 Ad Variations · 4 Descriptions Each</span>
        <span className={styles.note}>16 unique descriptions total</span>
      </div>
      <div className={styles.grid}>
        {ads.map(ad => (
          <div key={ad.adNum} className={styles.adCard}>
            <div className={styles.adHeader}>
              <span className={styles.adNum}>Ad {ad.adNum}</span>
            </div>
            <div className={styles.descriptions}>
              {(ad.descriptions || []).map((desc, i) => (
                <div key={i} className={styles.descItem}>
                  <p className={styles.descText}>{desc.text}</p>
                  <div className={styles.descMeta}>
                    <span className={styles.descShortcut}>{desc.shortcut}</span>
                    <CharCount text={desc.text} max={90} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
