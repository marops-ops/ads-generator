import StrategicAnalysis from './StrategicAnalysis.jsx'
import HeadlineGrid from './HeadlineGrid.jsx'
import AdVariations from './AdVariations.jsx'
import ExportButton from './ExportButton.jsx'
import styles from './ResultsPanel.module.css'

export default function ResultsPanel({ data, url, keyword }) {
  return (
    <div className={styles.results}>
      <div className={styles.divider}>
        <span className={styles.dividerLabel}>Output</span>
      </div>

      <StrategicAnalysis analysis={data.analysis} />
      <HeadlineGrid headlines={data.headlines || []} />
      <AdVariations ads={data.ads || []} />
      <ExportButton data={data} url={url} keyword={keyword} />
    </div>
  )
}
