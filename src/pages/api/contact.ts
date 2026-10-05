import type { NextApiRequest, NextApiResponse } from "next";
// Modulo compartido (JS) usado tambien por el backend Express.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { saveMessage, validate, buildRecord } = require("../../lib/messages.js");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { deliver } = require("../../lib/integrations.js");

type ApiResponse =
  | { ok: true; id: string; delivery?: Record<string, unknown> }
  | { ok: true; skipped: true }
  | { error: string; details?: string[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: si un bot completa este campo, se ignora en silencio.
  if (body.company) {
    return res.status(200).json({ ok: true, skipped: true });
  }

  const { errors } = validate(body);
  if (errors.length > 0) {
    return res.status(400).json({ error: "Datos inválidos.", details: errors });
  }

  const forwarded = req.headers["x-forwarded-for"];
  const ip =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0]) ??
    req.socket.remoteAddress ??
    "";

  try {
    const record = buildRecord(body, ip);
    await saveMessage(record);
    // Envia a las integraciones (Supabase / Resend) si estan configuradas.
    const delivery = await deliver(record);
    return res.status(201).json({ ok: true, id: record.id, delivery });
  } catch {
    return res.status(500).json({ error: "No se pudo guardar el mensaje." });
  }
}
