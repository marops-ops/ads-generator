# RSA Generator — Messy Middle Framework

Google Ads Responsive Search Ad generator powered by Gemini, built on React + Vite, deployed via Vercel.

---

## Local Development

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/rsa-generator.git
cd rsa-generator
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Gemini API key:
```
GEMINI_API_KEY=your_key_here
```

Get a key at: https://aistudio.google.com/app/apikey

### 3. Run locally with Vercel CLI (recommended — runs serverless functions)

```bash
npm install -g vercel
vercel dev
```

The app runs at `http://localhost:3000`.

---

## Deploy to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rsa-generator.git
git push -u origin main
```

### Step 2 — Import on Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your `rsa-generator` repo
4. Framework preset: **Vite** (auto-detected)
5. Click **Deploy**

### Step 3 — Add environment variable

1. Go to your project on Vercel → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** your Gemini API key
   - **Environment:** Production (+ Preview if you want)
3. Click **Save**
4. Go to **Deployments** → click the three dots on your latest deploy → **Redeploy**

Your app is now live. Every push to `main` auto-deploys.

---

## Project Structure

```
rsa-generator/
├── api/
│   └── generate.js          # Vercel serverless function — Gemini API call
├── src/
│   ├── App.jsx               # Root component + state management
│   ├── App.module.css
│   ├── index.css             # Global design tokens
│   ├── main.jsx
│   └── components/
│       ├── Header.jsx
│       ├── InputForm.jsx     # URL + keyword inputs
│       ├── ResultsPanel.jsx  # Orchestrates output sections
│       ├── StrategicAnalysis.jsx
│       ├── HeadlineGrid.jsx  # 15 headlines with char counting
│       ├── AdVariations.jsx  # 4 ads × 4 descriptions
│       └── ExportButton.jsx  # CSV download for Ads Editor
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## Changing the AI Model

The model is set in `api/generate.js`. Current: `gemini-2.0-flash`.

To switch:
```js
// line in api/generate.js
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

// Change to e.g. gemini-1.5-pro:
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`
```

Available models: https://ai.google.dev/gemini-api/docs/models/gemini
