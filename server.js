require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🤖 Claude 3 Haiku AI Chat Server is running!');
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('❌ Missing OpenRouter API key');
    return res.json({ reply: "Server misconfigured. API key missing." });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://creative-spark-alpha.vercel.app', // ✅ Replace with your actual frontend domain
        'X-Title': 'Creative Spark Studio'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages,
        max_tokens: 200
      })
    });

    const data = await response.json();
    console.log('🔄 Claude 3 response:', JSON.stringify(data, null, 2));

    if (data.error) {
      console.error('❌ Claude API Error:', data.error);
      return res.json({ reply: `Claude Error: ${data.error.message}` });
    }

    res.json({ reply: data.choices?.[0]?.message?.content || "Try again!" });

  } catch (err) {
    console.error('❌ Fetch Error:', err);
    res.json({ reply: "AI error. Try again later." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
