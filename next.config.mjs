/** @type {import('next').NextConfig} */

// Cabeceras de seguridad que se aplican a todas las respuestas.
// No afectan al desarrollo y suman puntos en auditorias de rendimiento/SEO.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Oculta el logo/badge flotante de Next.js en desarrollo.
  // No lo usan tus clientes y se ve en cada pantalla.
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  }
};

export default nextConfig;
