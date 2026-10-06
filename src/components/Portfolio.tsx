import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Loader2, Send } from "lucide-react";
import { projects, site, type Project } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error";
const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const endpoint = `${apiBase}/api/contact`;

const webs = projects.filter(p => p.kind === "web");

/** Barra de navegador + maqueta de la pagina, como preview. */
function Preview({ p, compact = false }: { p: Project; compact?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0e0e10]">
      {/* barra de navegador */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-zinc-600" />
        <span className="h-2 w-2 rounded-full bg-zinc-700" />
        <span className="h-2 w-2 rounded-full bg-zinc-800" />
        <span className="ml-2 flex min-w-0 items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 font-mono text-[10px] text-zinc-400">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80" />
          <span className="truncate">{p.domain}</span>
        </span>
      </div>

      {/* captura real o maqueta */}
      <div
        className="relative overflow-hidden"
        style={
          p.shot
            ? { aspectRatio: "5 / 3", background: "#0b0b0d" }
            : {
                background: `linear-gradient(150deg, ${p.accent}14, #0b0b0d 55%)`,
                padding: compact ? "1.25rem" : "1.75rem"
              }
        }
      >
        {p.shot ? (
          <img
            src={p.shot}
            alt={`Captura de ${p.title}`}
            width={1600}
            height={1024}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <>
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 1px)",
            backgroundSize: "18px 18px"
          }}
        />
        <div className="relative space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded" style={{ background: p.accent }} />
            <span className="h-2 w-16 rounded-full bg-white/20" />
            <span className="ml-auto h-2 w-10 rounded-full bg-white/10" />
          </div>
          <div className="h-3 w-3/5 rounded-full bg-white/70" />
          <div className="h-3 w-2/5 rounded-full" style={{ background: `${p.accent}70` }} />
          <div className="flex gap-2 pt-2">
            <span className="h-5 w-16 rounded" style={{ background: p.accent }} />
            <span className="h-5 w-12 rounded-full border border-white/20" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="space-y-1.5 rounded-lg border border-white/10 bg-black/40 p-2">
                <span className="block h-2 w-3/4 rounded-full bg-white/25" />
                <span className="block h-1.5 w-full rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
          </>
        )}
        {/* brillo que sigue al mouse */}
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(240px circle at var(--mx,50%) var(--my,50%), ${p.accent}22, transparent 70%)` }}
        />
      </div>
    </div>
  );
}

/** Tarjeta con tilt 3D y spotlight. */
function Card({ p, delay }: { p: Project; delay: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const external = p.url.startsWith("http");

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x); my.set(y);
    ref.current?.style.setProperty("--mx", `${x * 100}%`);
    ref.current?.style.setProperty("--my", `${y * 100}%`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      <motion.a
        ref={ref}
        href={p.url}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onMouseMove={onMove}
        style={{ rotateX: rx, rotateY: ry }}
        className="group block border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-white/30"
      >
        <div className="overflow-hidden">
          <div className="transition-transform duration-500 group-hover:scale-[1.04]">
            <Preview p={p} compact />
          </div>
        </div>

        <div className="px-1 pb-1 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mono-label">{p.category}</p>
              <h3 className="font-display mt-1 text-xl font-bold text-white">{p.title}</h3>
            </div>
            <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-zinc-400 transition-all group-hover:border-white group-hover:bg-white group-hover:text-black">
              {external ? <ExternalLink size={14} /> : <ArrowUpRight size={15} />}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.summary}</p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {p.tags.map(t => (
              <span key={t} className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">{t}</span>
            ))}
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function Portfolio() {
  const [status, setStatus] = useState<Status>("idle");
  const [quick, setQuick] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || !quick.trim()) return;
    setStatus("sending");
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Visitante", email: "desconocido", service: "Otro", message: quick })
      });
      if (!r.ok) throw new Error();
      setStatus("success");
      setQuick("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="portafolio" className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* encabezado */}
        <div>
          <p className="mono-label">/ portafolio</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">
            Un par de trabajos
          </h2>
        </div>

        {/* cinta de dominios */}
        <div className="mt-6 flex flex-wrap gap-2">
          {webs.map(p => (
            <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-2 border border-white/10 px-3 py-1.5 font-mono text-[11px] text-zinc-500 hover:border-white/30 hover:text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
              {p.domain}
              <ExternalLink size={11} className="opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>

        {/* grilla principal */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {webs.map((p, i) => <Card key={p.title} p={p} delay={i * 0.07} />)}
        </div>

        {/* contacto rápido */}
        <div className="mt-8 border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display mt-1 text-xl font-bold text-white">
                ¿Querés que tu negocio se vea así? Contanos en una línea
              </h3>
            </div>
            <a href="#contacto" className="btn btn-ghost !py-2.5 !text-xs">Formulario completo</a>
          </div>
          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="quickMsg" className="sr-only">Contanos en una línea qué necesitás</label>
            <input
              id="quickMsg"
              value={quick}
              onChange={e => setQuick(e.target.value)}
              placeholder="Ej: necesito una landing para mi negocio…"
              className="flex-1 border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/40"
            />
            <button className="btn btn-primary shrink-0" disabled={status === "sending" || !quick.trim()}>
              {status === "sending" ? <><Loader2 size={16} className="animate-spin" /> Enviando</> : <><Send size={16} /> Enviar</>}
            </button>
          </form>
          {status === "success" && <p className="mt-2 text-sm text-emerald-300">¡Listo! Te respondemos en menos de 24 h.</p>}
          {status === "error" && <p className="mt-2 text-sm text-red-300">No se pudo enviar. Escribinos a {site.email}</p>}
        </div>

        
      </div>
    </section>
  );
}