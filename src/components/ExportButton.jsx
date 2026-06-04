import styles from './ExportButton.module.css'

function toCSVCell(value) {
  const str = String(value || '').replace(/"/g, '""')
  return `"${str}"`
}

export default function ExportButton({ data, url, keyword }) {
  function handleExport() {
    const headlines = (data.headlines || []).map(h => h.text)
    while (headlines.length < 15) headlines.push('')

    // Collect all descriptions: 4 ads × 4 = 16, take first 4 for the export row
    // (standard Ads Editor supports 4 descriptions per ad)
    // We export all 4 ads as separate rows
    const rows = []

    const cols = [
      'Campaign', 'Ad Group', 'Ad Type',
      'Headline 1', 'Headline 2', 'Headline 3', 'Headline 4', 'Headline 5',
      'Headline 6', 'Headline 7', 'Headline 8', 'Headline 9', 'Headline 10',
      'Headline 11', 'Headline 12', 'Headline 13', 'Headline 14', 'Headline 15',
      'Description 1', 'Description 2', 'Description 3', 'Description 4',
      'Final URL',
    ]

    ;(data.ads || []).forEach((ad, i) => {
      const descs = (ad.descriptions || []).map(d => d.text)
      while (descs.length < 4) descs.push('')
      rows.push([
        'Campaign 1',
        keyword,
        'Responsive Search Ad',
        ...headlines,
        ...descs,
        url,
      ])
    })

    const csvLines = [
      cols.map(toCSVCell).join(','),
      ...rows.map(row => row.map(toCSVCell).join(',')),
    ]

    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `rsa_${keyword.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <div className={styles.bannerText}>
          <div className={styles.bannerTitle}>Export to Google Ads Editor</div>
          <div className={styles.bannerSub}>
            CSV with Campaign · Ad Group · 15 Headlines · 4 Descriptions · Final URL. 
            One row per ad variation. Import directly into Ads Editor or Google Sheets.
          </div>
        </div>
        <button className={styles.exportBtn} onClick={handleExport}>
          <span className={styles.exportIcon}>↓</span>
          Download CSV
        </button>
      </div>
    </section>
  )
}
