// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Простое хранилище в памяти (один пользователь)
let user = {
  gpa: 0,
  categories: {
    brain: 0,
    body: 0,
    creativity: 0,
    leadership: 0
  },
  events: {
    participants1: 0,
    participants2: 0
  }
};

// GET /user  — вернуть все данные
app.get("/user", (req, res) => {
  res.json(user);
});

// POST /user/gpa { value }
app.post("/user/gpa", (req, res) => {
  const { value } = req.body;
  if (typeof value !== "number") return res.status(400).json({ error: "value must be number" });
  user.gpa = Math.round(Math.max(0, Math.min(5, value)) * 10) / 10;
  res.json({ ok: true, gpa: user.gpa });
});

// POST /user/category { name, value }
app.post("/user/category", (req, res) => {
  const { name, value } = req.body;
  if (!name || typeof value !== "number") return res.status(400).json({ error: "invalid body" });
  if (!user.categories.hasOwnProperty(name)) return res.status(400).json({ error: "unknown category" });
  user.categories[name] = Math.max(0, Math.min(10, Math.round(value)));
  res.json({ ok: true, categories: user.categories });
});

// POST /user/event { id }  — инкремент участников события (id: participants1 или participants2)
app.post("/user/event", (req, res) => {
  const { id } = req.body;
  if (!id || !user.events.hasOwnProperty(id)) return res.status(400).json({ error: "invalid event id" });
  user.events[id] += 1;
  res.json({ ok: true, events: user.events });
});

// Опционально: сброс (для дебага)
app.post("/reset", (req, res) => {
  user = {
    gpa: 0,
    categories: { brain: 0, body: 0, creativity: 0, leadership: 0 },
    events: { participants1: 0, participants2: 0 }
  };
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
