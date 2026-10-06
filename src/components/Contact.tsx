import { useState, type FormEvent } from "react";
import { Instagram, Loader2, Mail, Send } from "lucide-react";
import { site } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error";
const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const endpoint = `${apiBase}/api/contact`;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="border-t border-white/10 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mono-label">/ contacto</p>
            <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">
              Contanos tu idea
            </h2>
            <p className="mt-2 max-w-sm text-zinc-400">
              Te respondemos con un presupuesto claro en menos de 24 horas.
            </p>

            {/* canales de contacto */}
            <ul className="mt-7 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              <li className="flex items-center gap-3 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center border border-white/10 bg-white/[0.03]">
                  <Mail size={15} className="text-zinc-300" />
                </span>
                <div className="min-w-0">
                  <p className="mono-label">email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="truncate text-sm text-white hover:text-zinc-300"
                  >
                    {site.email}
                  </a>
                </div>
              </li>

              {/*
                Discord: se muestra solo cuando hay URL configurada.
                Ponerla en NEXT_PUBLIC_DISCORD_URL (archivo .env.local) o
                directo en site.discord dentro de src/lib/content.ts
              */}
              {site.discord && (
                <li className="flex items-center gap-3 py-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-white/10 bg-white/[0.03]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.4a18.3 18.3 0 0 0-6.4 0L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.6 9.1-.3 13.6.2 18a19.9 19.9 0 0 0 6 3l1.2-2a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.2 2a19.8 19.8 0 0 0 6-3c.6-5.1-.8-9.5-3.5-13.6ZM8.3 15.3c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.2 1.1 2.1 2.4c0 1.3-.9 2.4-2.1 2.4Zm7.4 0c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.2 1.1 2.1 2.4c0 1.3-.9 2.4-2.1 2.4Z" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="mono-label">discord</p>
                    <a
                      href={site.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-sm text-white hover:text-zinc-300"
                    >
                      Entrar al servidor
                    </a>
                  </div>
                </li>
              )}

              {/*
                Instagram: mismo criterio que Discord.
                Configurar NEXT_PUBLIC_INSTAGRAM_URL en .env.local
              */}
              {site.instagram && (
                <li className="flex items-center gap-3 py-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-white/10 bg-white/[0.03]">
                    <Instagram size={15} className="text-zinc-300" />
                  </span>
                  <div className="min-w-0">
                    <p className="mono-label">instagram</p>
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-sm text-white hover:text-zinc-300"
                    >
                      Escribinos por DM
                    </a>
                  </div>
                </li>
              )}
            </ul>

            <p className="mt-6 text-xs text-zinc-600">{site.location}</p>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="border border-white/10 bg-[#121214] p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="ct-name" className="mb-1.5 block text-sm font-medium text-zinc-300">
                    Tu nombre
                  </label>
                  <input
                    id="ct-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Ej: Martín"
                    className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="ct-email" className="mb-1.5 block text-sm font-medium text-zinc-300">
                    Tu email
                  </label>
                  <input
                    id="ct-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Ej: martin@minegocio.com"
                    className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label htmlFor="ct-msg" className="mb-1.5 block text-sm font-medium text-zinc-300">
                    Qué necesitás
                  </label>
                  <textarea
                    id="ct-msg"
                    name="message"
                    required
                    rows={4}
                    placeholder="Ej: tengo un local y quiero vender por la web"
                    className="w-full resize-none border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/40"
                  />
                </div>
              </div>
              <div className="hidden"><input name="company" tabIndex={-1} autoComplete="off" /></div>
              <button className="btn btn-primary mt-4 w-full" disabled={status === "sending"}>
                {status === "sending" ? (
                  <><Loader2 size={17} className="animate-spin" /> Enviando…</>
                ) : (
                  <><Send size={17} /> Enviar</>
                )}
              </button>
              {status === "success" && (
                <p className="mt-3 text-center text-sm text-emerald-300">
                  ¡Listo! Te contactamos pronto.
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-center text-sm text-red-300">
                  No se pudo enviar. Escribinos a {site.email}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}