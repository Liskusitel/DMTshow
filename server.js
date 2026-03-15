import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (data is lost on server restart — use a database for production)
const participants = [];
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) {
  console.warn("WARNING: ADMIN_PASSWORD environment variable is not set. Admin login is disabled.");
}
const tokens = new Set();

// GET /api/count — число зарегистрированных участников
app.get("/api/count", (_req, res) => {
  res.json({ count: participants.length });
});

// POST /api/register — регистрация участника
app.post("/api/register", (req, res) => {
  const { fio, age, city, phone } = req.body;
  if (!fio || !age || !city || !phone) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }
  participants.push({ fio, age, city, phone, registeredAt: new Date().toISOString() });
  res.json({ success: true });
});

// POST /api/admin/login — вход в админку
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (!ADMIN_PASSWORD) {
    return res.status(503).json({ success: false, error: "Панель администратора недоступна" });
  }
  if (password === ADMIN_PASSWORD) {
    const token = crypto.randomBytes(32).toString("hex");
    tokens.add(token);
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, error: "Неверный пароль" });
});

// Middleware для проверки токена
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.slice(7);
  if (!tokens.has(token)) {
    return res.status(401).json({ error: "Invalid token" });
  }
  next();
}

// GET /api/participants — список участников (только для авторизованных)
app.get("/api/participants", authMiddleware, (_req, res) => {
  res.json({ participants });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
