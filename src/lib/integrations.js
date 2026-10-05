/**
 * INTEGRACIONES DEL FORMULARIO DE CONTACTO
 * -------------------------------------------------------------------
 *  - Supabase  -> guarda el mensaje en una base de datos (API REST).
 *  - Resend    -> manda un email de aviso.
 *
 * Ambas son OPCIONALES y no requieren dependencias extra (usan fetch).
 * Si las variables de entorno no estan definidas, se saltean en
 * silencio: el mensaje igual se guarda en data/messages.json.
 */

function isSet(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Guarda el mensaje en Supabase (tabla configurable). */
async function saveToSupabase(record) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_TABLE || "contact_messages";

  if (!isSet(url) || !isSet(key)) return { skipped: true };

  const res = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=minimal"
    },
    body: JSON.stringify({
      name: record.name,
      email: record.email,
      service: record.service,
      message: record.message,
      created_at: record.at
    })
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status}: ${detail}`);
  }
  return { ok: true };
}

/** Manda el aviso por email con Resend. */
async function sendEmail(record) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!isSet(key) || !isSet(to)) return { skipped: true };

  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;max-width:560px;color:#111">
      <h2 style="margin:0 0 14px">Nuevo mensaje desde la web</h2>
      <p style="margin:4px 0"><strong>Nombre:</strong> ${escapeHtml(record.name)}</p>
      <p style="margin:4px 0"><strong>Email:</strong> ${escapeHtml(record.email)}</p>
      <p style="margin:4px 0"><strong>Servicio:</strong> ${escapeHtml(record.service)}</p>
      <p style="margin:16px 0 4px"><strong>Mensaje:</strong></p>
      <p style="white-space:pre-wrap;background:#f4f4f8;padding:14px;border-radius:10px">${escapeHtml(record.message)}</p>
      <p style="color:#888;font-size:12px;margin-top:16px">Recibido: ${escapeHtml(record.at)}</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: record.email,
      subject: `Nuevo contacto de ${record.name}`,
      html
    })
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail}`);
  }
  return { ok: true };
}

/**
 * Ejecuta todas las integraciones. Nunca lanza una excepcion:
 * devuelve un resumen del estado de cada una.
 */
async function deliver(record) {
  const result = {};

  try {
    result.supabase = await saveToSupabase(record);
  } catch (err) {
    result.supabase = { error: String((err && err.message) || err) };
    console.error("[integraciones] Supabase:", err);
  }

  try {
    result.email = await sendEmail(record);
  } catch (err) {
    result.email = { error: String((err && err.message) || err) };
    console.error("[integraciones] Resend:", err);
  }

  return result;
}

module.exports = { saveToSupabase, sendEmail, deliver };
