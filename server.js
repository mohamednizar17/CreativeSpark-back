console.log("🔧 Node.js version:", process.version);

require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('🤖 AI Chat Server is Running!');
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('❌ Missing OpenAI API key');
    return res.json({ reply: "Server misconfigured. API key missing." });
  }

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
    console.log('🔄 OpenAI response:', JSON.stringify(data, null, 2));

    if (data.error) {
      console.error('❌ OpenAI API returned error:', data.error);
      return res.json({ reply: `OpenAI Error: ${data.error.message}` });
    }

    res.json({ reply: data.choices?.[0]?.message?.content || "Try again!" });

  } catch (err) {
    console.error('❌ OpenAI Error:', err);
    res.json({ reply: "AI error. Try again later." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
