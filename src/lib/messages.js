/**
 * Mini "base de datos" en un archivo JSON.
 * No requiere instalar nada y sirve tanto para la API integrada de
 * Next.js (src/pages/api/contact.ts) como para el backend Express
 * (server/index.js).
 */

const { promises: fs } = require("fs");
const path = require("path");

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "messages.json");

async function readMessages() {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveMessage(message) {
  const messages = await readMessages();
  messages.push(message);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(messages, null, 2), "utf8");
  return message;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body = {}) {
  const errors = [];
  const name = (body.name ?? "").toString().trim();
  const email = (body.email ?? "").toString().trim();
  const message = (body.message ?? "").toString().trim();

  if (name.length < 2) errors.push("El nombre es obligatorio.");
  if (!EMAIL_RE.test(email)) errors.push("El email no es válido.");
  if (message.length < 10) errors.push("El mensaje debe tener al menos 10 caracteres.");

  return { errors, clean: { name, email, message } };
}

function buildRecord(body = {}, ip = "") {
  const service = (body.service ?? "General").toString().trim();
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name: (body.name ?? "").toString().trim(),
    email: (body.email ?? "").toString().trim().toLowerCase(),
    service,
    message: (body.message ?? "").toString().trim(),
    ip,
    at: new Date().toISOString()
  };
}

module.exports = { readMessages, saveMessage, validate, buildRecord, FILE };
