/**
 * Contenido central de la web de Yoren Studios.
 * Todo el texto, los servicios, proyectos, etc. viven aca para poder
 * editarlos en un solo lugar sin tocar los componentes.
 */

export type NavLink = { label: string; href: string };

export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  /** Clave del icono (se resuelve en el componente Services). */
  icon: "bot" | "app" | "web";
};

export type Stat = { value: string; label: string };

export type Project = {
  title: string;
  category: string;
  summary: string;
  tags: string[];
  /** Dominio que se muestra en la barra del preview. */
  domain: string;
  /** Link real para abrir el proyecto. */
  url: string;
  /** false si el proyecto todavía no esta publicado. */
  live: boolean;
  /** "web" = landings / tiendas (lo principal). "bot" = secundario. */
  kind: "web" | "bot";
  /** Color de acento del preview (grafito/plata). */
  accent: string;
  metric: string;
  /** Metric curto que va en la esquina de la tarjeta. */
  tag: string;
  /** Captura real del sitio, guardada en public/screenshots. */
  shot?: string;
};

export type ProcessStep = { step: string; title: string; text: string };

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export type TeamMember = { name: string; role: string; initials: string };

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Yoren Studios",
  shortName: process.env.NEXT_PUBLIC_SITE_SHORT ?? "Yoren",
  domain: "yorenstudios.com",
  url: "https://yorenstudios.com",
  tagline: "Webs que hacen visible tu negocio",
  description:
    "Yoren Studios crea sitios web y landings que dan posicionamiento de marca, aparición en Google y clientes que escriben. Tu negocio online, bien hecho.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "yorestudios@gmail.com",
  /**
   * Discord: todavia no hay servidor. Se deja vacio para que el bloque de
   * contacto lo oculte; cuando exista, poner la invitacion acá o en
   * NEXT_PUBLIC_DISCORD_URL en .env.local
   */
  discord: process.env.NEXT_PUBLIC_DISCORD_URL ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  location: "Remoto · LATAM & España",
  founded: 2019
};

export const navLinks: NavLink[] = [
  { label: "Servicios", href: "#servicios" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Proceso", href: "#proceso" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" }
];

export const stats: Stat[] = [
  { value: "+140", label: "Proyectos entregados" },
  { value: "+90", label: "Clientes activos" },
  { value: "4.9/5", label: "Valoración media" },
  { value: "24/7", label: "Soporte y monitoreo" }
];

export const services: Service[] = [
  {
    id: "bots",
    title: "Bots de Discord",
    tagline: "Comunidades que se gestionan solas",
    description:
      "Automatizamos tu servidor con bots a medida: moderación, sistema de tickets, economía, sorteos, integraciones y paneles de administración.",
    features: [
      "Moderación y anti-raid automáticos",
      "Sistema de tickets y soporte",
      "Economía, niveles y recompensas",
      "Integraciones con tu web o API"
    ],
    icon: "bot"
  },
  {
    id: "apps",
    title: "Aplicaciones",
    tagline: "Del panel interno a la app del cliente",
    description:
      "Desarrollamos aplicaciones web y móviles robustas, con autenticación, base de datos, pagos y paneles de administración listos para producción.",
    features: [
      "Paneles de administración",
      "APIs REST y tiempo real",
      "Autenticación y roles",
      "Bases de datos y despliegue"
    ],
    icon: "app"
  },
  {
    id: "web",
    title: "Sitios Web",
    tagline: "Rápidos, modernos y que convierten",
    description:
      "Landing pages, tiendas y sitios corporativos optimizados para velocidad y SEO. Diseño cuidado al detalle y animaciones que enamoran.",
    features: [
      "Diseño a medida y responsive",
      "SEO técnico y rendimiento 95+",
      "Tiendas y pasarelas de pago",
      "Optimización para conversión"
    ],
    icon: "web"
  }
];

export const techStack: string[] = [
  "Discord.js",
  "Node.js",
  "TypeScript",
  "Next.js",
  "React",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "Framer Motion",
  "Docker",
  "AWS",
  "Redis",
  "Prisma"
];

/**
 * Portafolio real. Sin proyectos ficticios.
 * Los "web" (landings / tiendas) son el foco del estudio.
 */
export const projects: Project[] = [
  {
    title: "AJ Perfumes",
    category: "Tienda online",
    summary:
      "Perfumería con catálogo de fragancias importadas, carrito y pedidos por WhatsApp. Panel para editar stock y precios sin tocar código.",
    tags: ["Next.js", "Supabase", "WhatsApp", "Tailwind"],
    domain: "ajperfumescl.vercel.app",
    url: "https://ajperfumescl.vercel.app",
    live: true,
    kind: "web",
    accent: "#e4e4e7",
    metric: "Catálogo + carrito + panel",
    tag: "e-commerce",
    shot: "/screenshots/aj-perfumes.png"
  },
  {
    title: "Yoren Studios",
    category: "Landing page",
    summary:
      "La web que estás viendo ahora. Portafolio, contacto directo y carga rápida, en tonos grafito.",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    domain: "yorenstudios.com",
    url: "#contacto",
    live: true,
    kind: "web",
    accent: "#a1a1aa",
    metric: "Esta misma web",
    tag: "en vivo",
    shot: "/screenshots/yoren-studios.png"
  },
  {
    title: "FLEECA Security",
    category: "Bot de Discord",
    summary:
      "Bot de alertas programadas: horarios en español, zonas horarias e historial. Servicio secundario del estudio.",
    tags: ["Python", "Discord.js", "SQLite"],
    domain: "servidor de Discord",
    url: "#contacto",
    live: false,
    kind: "bot",
    accent: "#71717a",
    metric: "Automatización",
    tag: "bot"
  }
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Descubrimiento",
    text: "Entendemos tu comunidad, tus objetivos y qué necesita funcionar sí o sí. Definimos alcance y prioridades."
  },
  {
    step: "02",
    title: "Diseño",
    text: "Prototipamos la experiencia y la identidad visual. Aprobás cómo se ve y cómo se siente antes de programar."
  },
  {
    step: "03",
    title: "Desarrollo",
    text: "Construimos con código limpio, pruebas y entregas cada semana para que veas el avance en vivo."
  },
  {
    step: "04",
    title: "Lanzamiento y soporte",
    text: "Desplegamos, monitoreamos y acompañamos. Mejoras continuas y soporte cuando lo necesitás."
  }
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "El bot transformó nuestro servidor. Antes era un caos de mensajes; ahora todo se gestiona solo y el staff respira.",
    name: "Martín R.",
    role: "Fundador · servidor de roleplay",
    initials: "MR"
  },
  {
    quote:
      "Nos entregaron la tienda en dos semanas y las ventas subieron al instante. La web vuela.",
    name: "Lucía G.",
    role: "Dueña · Aurora Market",
    initials: "LG"
  },
  {
    quote:
      "Profesionales de verdad. Nos explicaron todo, cumplieron los plazos y el soporte responde al toque.",
    name: "Diego P.",
    role: "CTO · NovaPay",
    initials: "DP"
  }
];

export const team: TeamMember[] = [
  { name: "Yoren", role: "Dirección & Arquitectura", initials: "YO" },
  { name: "Camila", role: "Diseño de producto & UI", initials: "CA" },
  { name: "Tomás", role: "Desarrollo backend & bots", initials: "TO" },
  { name: "Sofía", role: "Frontend & animaciones", initials: "SO" }
];

export const socials = [
  { label: "GitHub", href: "https://github.com/yorenstudios" },
  { label: "X", href: "https://x.com/yorenstudios" }
];
