import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoMark } from "./Logo";

/** Enlaces que existen en esta página (el resto de navLinks es de otras variantes). */
const links = [
  { label: "Portafolio", href: "#portafolio" },
  { label: "Contacto", href: "#contacto" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", v => setScrolled(v > 16));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`bg-[#0b0b0d]/85 backdrop-blur-md transition-all ${scrolled ? "border-b border-white/10" : ""}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
          <a href="#top" className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <span className="font-display text-[15px] font-bold text-white">Yoren Studios</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contacto" className="btn btn-primary hidden !px-4 !py-2 !text-sm md:inline-flex">
            Cotizar
          </a>

          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white md:hidden"
          >
            {open ? <X size={17}/> : <Menu size={17}/>}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="px-6 py-4">
                {links.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-zinc-200">
                    {l.label}
                  </a>
                ))}
                <a href="#contacto" onClick={() => setOpen(false)} className="btn btn-primary mt-3 w-full">
                  Cotizar
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
