require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root route (fixes "Cannot GET /")
app.get('/', (req, res) => {
  res.send('🤖 AI Chat Server is Running!');
});

// ✅ Chat route
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body; // [{role: "user"/"assistant", content: "..."}]
  const apiKey = process.env.OPENAI_API_KEY;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 200
      })
    });
    const data = await response.json();
    res.json({ reply: data.choices?.[0]?.message?.content || "Try again!" });
  } catch (err) {
    res.json({ reply: "AI error. Try again later." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
