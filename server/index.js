/**
 * ===================================================================
 *  BACKEND EXPRESS - YOREN STUDIOS
 * ===================================================================
 *  API del formulario de contacto. Guarda los mensajes en la misma
 *  "base de datos" JSON que la API de Next.js (data/messages.json),
 *  asi que ambas comparten los datos.
 *
 *  Correr:   npm run api      (o  node server/index.js)
 *  Puerto:   4000 (configurable con la variable PORT)
 * ===================================================================
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Carga .env.local / .env (Node puro no las lee solo, a diferencia de Next).
function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const full = path.join(__dirname, "..", file);
    if (!fs.existsSync(full)) continue;
    for (const line of fs.readFileSync(full, "utf8").split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const key = match[1];
      let value = match[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  }
}
loadEnv();

// Modulos compartidos con la API de Next.js.
const {
  saveMessage,
  validate,
  buildRecord,
  readMessages
} = require(path.join(__dirname, "..", "src", "lib", "messages.js"));
const { deliver } = require(
  path.join(__dirname, "..", "src", "lib", "integrations.js")
);

const app = express();
const PORT = process.env.PORT || 4000;

// CORS: permite que la web (otro puerto) llame a esta API en desarrollo.
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      /\.yorenstudios\.com$/
    ],
    methods: ["GET", "POST", "OPTIONS"]
  })
);

app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "yoren-studios-api",
    time: new Date().toISOString(),
    integrations: {
      supabase: Boolean(
        process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
      ),
      email: Boolean(process.env.RESEND_API_KEY)
    }
  });
});

app.post("/api/contact", async (req, res) => {
  const body = req.body ?? {};

  // Honeypot anti-spam.
  if (body.company) {
    return res.json({ ok: true, skipped: true });
  }

  const { errors } = validate(body);
  if (errors.length > 0) {
    return res.status(400).json({ error: "Datos inválidos.", details: errors });
  }

  try {
    const record = buildRecord(body, req.ip ?? "");
    await saveMessage(record);
    const delivery = await deliver(record);
    return res.status(201).json({ ok: true, id: record.id, delivery });
  } catch (err) {
    console.error("Error guardando el mensaje:", err);
    return res.status(500).json({ error: "No se pudo guardar el mensaje." });
  }
});

app.get("/api/messages", async (_req, res) => {
  const messages = await readMessages();
  res.json({ ok: true, count: messages.length, messages });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

app.listen(PORT, () => {
  console.log("");
  console.log("  ==============================================");
  console.log("   YOREN STUDIOS - API de contacto");
  console.log("  ==============================================");
  console.log(`   Escuchando en:  http://localhost:${PORT}`);
  console.log(`   Health check:   http://localhost:${PORT}/api/health`);
  console.log("   Para detenerlo: Ctrl + C");
  console.log("");
});
