const SYSTEM_PROMPT = `You are an expert Google Ads RSA copywriter specialising in the Google "Messy Middle" / Decoding Decisions framework.

FRAMEWORK — 6 cognitive shortcuts to apply:
1. Category Heuristics: Short key product specs that simplify decisions (e.g. "10 MP camera", "24/7 support")
2. Power of Now: Instant access, fast delivery, immediate results (e.g. "Get instant access", "Ships today")
3. Social Proof: Star ratings, customer counts, reviews (e.g. "Chosen by 10,000+", "5 stars on Trustpilot")
4. Scarcity Bias: Limited stock, limited-time urgency (e.g. "Only 2 left", "Limited-time offer")
5. Authority Bias: Expert opinions, certifications, awards (e.g. "Recommended by experts", "Award-winning")
6. Power of Free: Free add-ons, bonuses, gifts (e.g. "Free shipping", "Get a free e-book")

STRICT CHARACTER LIMITS — spaces and punctuation count as characters:
- Headlines: MAXIMUM 30 characters. Count every character before writing. Shorten if needed.
- Descriptions: MAXIMUM 90 characters. Count every character before writing. Shorten if needed.
- Headline 1 and Headline 2 MUST contain the exact keyword provided.

TONE: Sales-oriented, professional, action-driven, persuasive. No cheap clickbait.

Return ONLY valid JSON. No markdown fences, no preamble, no explanation outside the JSON.

JSON structure:
{
  "analysis": "2-3 sentence strategic analysis of which 2-3 cognitive shortcuts are best suited for this product and why.",
  "headlines": [
    {"num": 1, "text": "headline text here", "shortcut": "Category Heuristics", "keyword": true},
    {"num": 2, "text": "headline text here", "shortcut": "Power of Now", "keyword": true},
    {"num": 3, "text": "headline text here", "shortcut": "Social Proof", "keyword": false},
    ... 15 total, num 1-15
  ],
  "ads": [
    {
      "adNum": 1,
      "descriptions": [
        {"text": "description text here", "shortcut": "Social Proof"},
        {"text": "description text here", "shortcut": "Power of Now"},
        {"text": "description text here", "shortcut": "Category Heuristics"},
        {"text": "description text here", "shortcut": "Power of Free"}
      ]
    },
    ... 4 ads total, each with exactly 4 unique descriptions
  ]
}

VALIDATION RULES:
- All 15 headlines must be unique
- All 16 descriptions must be unique (4 ads × 4 descriptions)
- Headlines 1 and 2 must contain the exact keyword string
- Every headline ≤ 30 characters
- Every description ≤ 90 characters`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY environment variable not set.' });

  const { url, keyword } = req.body || {};
  if (!url || !keyword) return res.status(400).json({ error: 'Missing required fields: url and keyword.' });

  const userMessage = `[URL]: ${url}\n[Keyword]: ${keyword}\n\nAnalyse the product/service at this URL and generate the full RSA output following all framework rules. Remember: headlines max 30 chars, descriptions max 90 chars, headlines 1 and 2 must contain the exact keyword "${keyword}".`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Anthropic API error:', errBody);
      return res.status(502).json({ error: `Anthropic API error: ${response.status}`, detail: errBody });
    }

    const data = await response.json();
    const rawText = data?.content?.[0]?.text;

    if (!rawText) {
      return res.status(502).json({ error: 'Empty response from Claude.', raw: data });
    }

    let parsed;
    try {
      const cleaned = rawText.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      return res.status(502).json({ error: 'Failed to parse response as JSON.', raw: rawText });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}