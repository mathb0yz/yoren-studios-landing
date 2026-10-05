import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative pt-28 pb-6 sm:pt-36">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]">
          Hacemos que tu negocio se vea online.
        </h1>
        <p className="mt-4 max-w-xl text-zinc-400">
          Webs y landings que te encuentran, te entienden y te escriben. Tu marca
          visible en Google, en el celular y cuando alguien busca lo que vendes.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a href="#portafolio" className="btn btn-primary">
            Ver trabajos <ArrowRight size={17} />
          </a>
          <a href="#contacto" className="text-sm font-medium text-zinc-400 underline decoration-zinc-700 underline-offset-8 hover:text-white">
            Quiero cotizar
          </a>
        </div>
      </div>
    </section>
  );
}