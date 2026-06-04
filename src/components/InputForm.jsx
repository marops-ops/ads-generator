import { useState } from 'react'
import styles from './InputForm.module.css'

export default function InputForm({ onGenerate, loading }) {
  const [url, setUrl] = useState('')
  const [keyword, setKeyword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!url.trim() || !keyword.trim()) return
    onGenerate({ url: url.trim(), keyword: keyword.trim() })
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>
        <span className={styles.labelNum}>01</span>
        Input
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="url">
              Landing page URL
            </label>
            <input
              id="url"
              type="url"
              className={styles.input}
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com/product"
              required
              disabled={loading}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="keyword">
              Target keyword
            </label>
            <input
              id="keyword"
              type="text"
              className={styles.input}
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="e.g. running shoes men"
              required
              disabled={loading}
              onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
            />
          </div>
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={loading || !url.trim() || !keyword.trim()}
        >
          {loading ? (
            <>
              <span className={styles.spinner} />
              Generating with Gemini...
            </>
          ) : (
            <>
              <span className={styles.btnIcon}>→</span>
              Generate RSA
            </>
          )}
        </button>
      </form>

      <div className={styles.shortcuts}>
        <span className={styles.shortcutsLabel}>Framework</span>
        {['Category Heuristics', 'Power of Now', 'Social Proof', 'Scarcity Bias', 'Authority Bias', 'Power of Free'].map(s => (
          <span key={s} className={styles.shortcutTag}>{s}</span>
        ))}
      </div>
    </section>
  )
}
