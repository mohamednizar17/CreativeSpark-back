# 🧠 Creative Spark Studio

An AI-powered chat application that uses Claude 3 Haiku via OpenRouter to spark creativity, imagination, and storytelling. This app features a visually dynamic frontend with a 3D thunder-themed background and a full backend API connected to OpenRouter's large language models.

---

## 🚀 Live Links

- **Frontend (Vercel)**: [https://creative-spark-alpha.vercel.app](https://creative-spark-alpha.vercel.app)
- **Backend (Render)**: [https://creativespark-back.onrender.com](https://creativespark-back.onrender.com)

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Three.js
- **Backend**: Node.js, Express
- **AI Provider**: OpenRouter with Claude 3 Haiku (`anthropic/claude-3-haiku`)

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/creative-spark-studio.git
cd creative-spark-studio
```

### 2. Backend Setup
```bash
cd backend
npm install
```

#### Create a `.env` file:
```env
OPENAI_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> 💡 Use your OpenRouter API key. Get one at [https://openrouter.ai/account/keys](https://openrouter.ai/account/keys)

#### Start the server locally
```bash
node server.js
```

### 3. Frontend Setup
- The frontend is a static site (index.html + CSS + JS).
- You can open `index.html` directly in your browser or deploy it using **Vercel** or **GitHub Pages**.

---

## 📦 Backend API Reference

### `POST /api/chat`
Sends a message history and receives a model-generated reply.

#### Request body
```json
{
  "messages": [
    { "role": "user", "content": "Tell me a story about thunder." }
  ]
}
```

#### Response
```json
{
  "reply": "Once upon a stormy night..."
}
```

---

## ✨ Features

- ⚡ 3D thunder & sparks background using Three.js
- 💬 Persistent chat history (saved in browser localStorage)
- 🤖 Real-time AI replies powered by Claude 3 via OpenRouter
- 🎨 Creative writing prompts built-in
- 📱 Mobile-friendly responsive design

---

## 📜 License

MIT License. Feel free to use, remix, and build upon it.

---

## 👨‍💻 Author

Built by NS Nizar.  
Inspired by imagination, powered by AI.