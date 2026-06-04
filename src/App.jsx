import { useState } from 'react'
import InputForm from './components/InputForm.jsx'
import ResultsPanel from './components/ResultsPanel.jsx'
import Header from './components/Header.jsx'
import styles from './App.module.css'

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastInputs, setLastInputs] = useState({ url: '', keyword: '' })

  async function handleGenerate({ url, keyword }) {
    setLoading(true)
    setError(null)
    setResult(null)
    setLastInputs({ url, keyword })

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, keyword }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || `Server error ${res.status}`)
      }

      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <InputForm onGenerate={handleGenerate} loading={loading} />
        {error && (
          <div className={styles.errorBox}>
            <span className={styles.errorLabel}>Error</span>
            {error}
          </div>
        )}
        {result && (
          <ResultsPanel
            data={result}
            url={lastInputs.url}
            keyword={lastInputs.keyword}
          />
        )}
      </main>
      <footer className={styles.footer}>
        <span>RSA Generator · Messy Middle Framework · Powered by Gemini</span>
      </footer>
    </div>
  )
}
