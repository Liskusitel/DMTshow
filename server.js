import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

// NOTE: In-memory storage - all data is lost on server restart.
// For production, replace with a persistent database.
const participants = [];

// Admin password must be set via ADMIN_PASSWORD environment variable.
// In development a warning is shown; never deploy without setting this variable.
if (!process.env.ADMIN_PASSWORD) {
  console.warn(
    "WARNING: ADMIN_PASSWORD env variable is not set. " +
    "Using insecure default password for development only."
  );
}
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "dmtshow_admin_dev";

// Token store with expiry (tokens expire after 8 hours)
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000;
const validTokens = new Map(); // token -> expiry timestamp

// Periodically purge expired tokens
setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of validTokens) {
    if (now > expiry) validTokens.delete(token);
  }
}, 60 * 60 * 1000);

// GET /api/count - returns number of registered participants
app.get("/api/count", (req, res) => {
  res.json({ count: participants.length });
});

// POST /api/register - register a new participant
app.post("/api/register", (req, res) => {
  const { fio, age, city, phone } = req.body;
  if (!fio || !age || !city || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const id = crypto.randomUUID();
  participants.push({ id, fio, age, city, phone });
  res.json({ success: true });
});

// POST /api/admin/login - admin authentication
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = crypto.randomBytes(32).toString("hex");
    validTokens.set(token, Date.now() + TOKEN_TTL_MS);
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: "Invalid password" });
  }
});

// GET /api/participants - get all participants (admin only)
app.get("/api/participants", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.slice(7);
  const expiry = validTokens.get(token);
  if (!expiry || Date.now() > expiry) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json({ participants });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`DMTshow API server running on port ${PORT}`);
});
