/**
 * SISTEMA DE TEMAS (para clonar la landing por cliente)
 * -------------------------------------------------------------------
 * Para cambiar los colores de TODA la web sin tocar el diseno:
 *   1) Elegi un tema de la lista `themes` de abajo, o crea el tuyo.
 *   2) En el archivo .env.local poné:   NEXT_PUBLIC_THEME=azul
 *   3) Reinicia el servidor.
 *
 * Los colores se inyectan como variables CSS en el <body> (ver
 * src/pages/_document.tsx), asi que pisan los del `@theme` de
 * globals.css y afectan a todos los botones, tarjetas y degradados.
 */

export type BrandRamp = { 300: string; 400: string; 500: string; 600: string; 700: string };
export type AccentRamp = { 300: string; 400: string; 500: string };

export type Theme = {
  label: string;
  brand: BrandRamp;
  accent: AccentRamp;
  /** Color del texto sobre los botones de marca (por defecto blanco). */
  onBrand?: string;
};

export const themes: Record<string, Theme> = {
  violeta: {
    label: "Violeta + cian (por defecto)",
    brand: { 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9" },
    accent: { 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4" }
  },
  azul: {
    label: "Azul + celeste",
    brand: { 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8" },
    accent: { 300: "#7dd3fc", 400: "#38bdf8", 500: "#0ea5e9" }
  },
  indigo: {
    label: "Índigo + violeta",
    brand: { 300: "#a5b4fc", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca" },
    accent: { 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6" }
  },
  esmeralda: {
    label: "Esmeralda + teal",
    brand: { 300: "#6ee7b7", 400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857" },
    accent: { 300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6" }
  },
  naranja: {
    label: "Naranja + ámbar",
    brand: { 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c" },
    accent: { 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b" }
  },
  rosa: {
    label: "Rosa + fucsia",
    brand: { 300: "#f9a8d4", 400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d" },
    accent: { 300: "#f0abfc", 400: "#e879f9", 500: "#d946ef" }
  },
  rojo: {
    label: "Rojo + naranja",
    brand: { 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c" },
    accent: { 300: "#fdba74", 400: "#fb923c", 500: "#f97316" }
  },
  grafito: {
    label: "Negro y gris · plata (monocromo)",
    brand: { 300: "#f4f4f5", 400: "#e4e4e7", 500: "#cbcbd1", 600: "#b0b0b8", 700: "#8a8a93" },
    accent: { 300: "#d4d4d8", 400: "#a1a1aa", 500: "#8a8a93" },
    onBrand: "#0a0a0a"
  },
  acero: {
    label: "Negro y gris · metal oscuro",
    brand: { 300: "#d4d4d8", 400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46" },
    accent: { 300: "#a1a1aa", 400: "#8a8a93", 500: "#71717a" },
    onBrand: "#ffffff"
  }
};

export type ThemeName = keyof typeof themes;

/** Nombre del tema activo (desde NEXT_PUBLIC_THEME, por defecto "violeta"). */
export function getActiveThemeName(): string {
  const name = (process.env.NEXT_PUBLIC_THEME ?? "violeta").trim().toLowerCase();
  return themes[name] ? name : "violeta";
}

/**
 * Devuelve las variables CSS del tema activo para inyectar en el <body>.
 * Al ser estilo inline, gana por especificidad y todo lo que este dentro
 * del body las hereda.
 */
export function getThemeStyle(): Record<string, string> {
  const theme = themes[getActiveThemeName()] ?? themes.violeta;
  return {
    "--color-brand-300": theme.brand[300],
    "--color-brand-400": theme.brand[400],
    "--color-brand-500": theme.brand[500],
    "--color-brand-600": theme.brand[600],
    "--color-brand-700": theme.brand[700],
    "--color-accent-300": theme.accent[300],
    "--color-accent-400": theme.accent[400],
    "--color-accent-500": theme.accent[500],
    "--color-on-brand": theme.onBrand ?? "#ffffff"
  };
}
