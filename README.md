# 🚀 Yoren Studios — Landing Page

Landing page profesional para **Yoren Studios**, agencia especializada en
**bots de Discord, aplicaciones y sitios web**.

Construida con tecnología actual, animaciones fluidas y pensada para verse
impecable en mobile, tablet y desktop.

---

## 🧱 Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 15 (React 19) + TypeScript |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| Iconos | lucide-react |
| Backend | Node.js + Express (`/server`) **y** API integrada de Next.js |
| Datos | Archivo JSON (`data/messages.json`) — sin base de datos externa |

---

## ✅ Requisitos

- **Node.js 18.18 o superior** (probado en Node 24) → https://nodejs.org
- npm (viene incluido con Node)

Comprobalo con:

```bash
node --version
npm --version
```

---

## ⚙️ Instalación

Dentro de la carpeta del proyecto (`Yoren_Studios_Landing`):

```bash
npm install
```

---

## ▶️ Correr en desarrollo

```bash
npm run dev
```

Abrí **http://localhost:3000** en el navegador.

> El formulario de contacto funciona desde el primer momento: usa la API
> integrada de Next.js (`/api/contact`), que corre sobre Node.js.

### Opcional: usar el backend Express por separado

Para correr el backend Express como servicio independiente (ideal para
desplegarlo aparte):

1. Copiá `.env.local.example` a `.env.local` y definí:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

2. Levantá la web **y** la API juntas:

   ```bash
   npm run dev:all
   ```

---

## 📦 Compilar para producción

```bash
npm run build
npm run start
```

---

## 🔧 Todos los comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Web en modo desarrollo (puerto 3000) |
| `npm run api` | Solo el backend Express (puerto 4000) |
| `npm run dev:all` | Web + backend Express a la vez |
| `npm run build` | Compila para producción |
| `npm run start` | Sirve la versión compilada |
## 🗂️ Estructura del proyecto

```
Yoren_Studios_Landing/
├── public/                 # Estáticos (favicon, logo, OG, robots, sitemap)
├── src/
│   ├── assets/             # Recursos propios (imágenes, íconos)
│   ├── components/         # Componentes reutilizables (una sección por archivo)
│   ├── lib/
│   │   ├── content.ts      # 👈 TODO el texto de la web vive acá
│   │   ├── theme.ts        # 🎨 Temas de colores (violeta, azul, …)
│   │   ├── messages.js     # Mini "base de datos" JSON (compartida)
│   │   └── integrations.js # Resend (email) + Supabase (base de datos)
│   ├── pages/
│   │   ├── _app.tsx        # Config global + fuentes + fondo
│   │   ├── _document.tsx   # <html>/<body>
│   │   ├── index.tsx       # La landing (ensambla todas las secciones)
│   │   └── api/contact.ts  # API integrada del formulario
│   └── styles/
│       └── globals.css     # Tailwind v4 + tema (colores, fuentes, animaciones)
├── server/
│   └── index.js            # Backend Express (Node.js): /api/contact, /api/health
├── supabase/
│   └── schema.sql          # Tabla del formulario (ejecutar en Supabase)
├── data/                   # Mensajes guardados (messages.json)
└── next.config.mjs · tsconfig.json · postcss.config.mjs · package.json
```

> `src/assets` es para tus propios recursos. Los archivos públicos van en `public/`.

---

## ✏️ Cómo editar el contenido

Casi todo el texto (servicios, proyectos, testimonios, equipo, datos de
contacto) está en **`src/lib/content.ts`**. Cambiás ahí y se actualiza la web.

- Marca, email, Discord y tagline → objeto `site`
- Servicios → `services` · Proyectos → `projects`
- Testimonios → `testimonials` · Equipo → `team`

---

## 🧩 Clonar la landing para un cliente (usar como plantilla)

Esta landing está pensada como **plantilla reutilizable**. Para la versión
de un cliente nuevo:

1. **Copiá la carpeta** a una nueva (ej. `Landing_Aurora`) y borrá
   `node_modules` y `.next`.
2. **Editá los textos** en `src/lib/content.ts` (nombre, servicios,
   proyectos, testimonios, equipo, contacto).
3. **Elegí el tema de color** en `.env.local`: `NEXT_PUBLIC_THEME=azul`.
4. **Cambiá el nombre** con `NEXT_PUBLIC_SITE_NAME=Nombre del Cliente`.
5. **Reemplazá** `public/logo.svg`, `public/favicon.svg` y
   `public/og-image.svg` por los del cliente.
6. `npm install` y `npm run dev`. ¡Listo!

## 🎨 Temas disponibles

En `src/lib/theme.ts` hay 9 temas listos (color de marca + acento):

`violeta` (def.) · `azul` · `indigo` · `esmeralda` · `naranja` · `rosa` · `rojo` · `grafito` · `acero`

Los dos últimos son **monocromos (negro y gris)**: `grafito` es plateado
(botones claros con texto oscuro) y `acero` es metal oscuro (botones
grises con texto blanco).

Se activan con `NEXT_PUBLIC_THEME=<nombre>` en `.env.local`. También podés
crear tu propio tema copiando uno y cambiando los hex. Los colores se
inyectan como variables CSS, así que repintan botones, tarjetas,
degradados y textos al instante.

## 🎨 Personalizar el diseño

- **Colores, fuentes y animaciones:** `src/styles/globals.css` (bloque `@theme`).
- **Cómo se ve cada sección:** los archivos en `src/components/`.
- El alias `@/` apunta a `src/` (configurado en `tsconfig.json`).

## 🔐 Variables de entorno

Copiá `.env.local.example` a `.env.local`:

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_THEME` | Tema de colores (violeta, azul, …) |
| `NEXT_PUBLIC_SITE_NAME` | Nombre del cliente/empresa |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email que se muestra en la web |
| `NEXT_PUBLIC_DISCORD_URL` | Invitación al Discord |
| `NEXT_PUBLIC_API_URL` | URL del backend Express (vacío = API de Next.js) |
| `PORT` | Puerto del backend Express (por defecto 4000) |
| `RESEND_API_KEY` | Activa el aviso por email (Resend) |
| `RESEND_FROM_EMAIL` | Remitente verificado en Resend |
| `CONTACT_TO_EMAIL` | Correo que recibe los avisos |
| `SUPABASE_URL` | Proyecto de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave secreta de Supabase (solo servidor) |
| `SUPABASE_TABLE` | Tabla destino (por defecto `contact_messages`) |

## 📬 Formulario de contacto (cómo funciona)

1. La web envía un `POST` a `/api/contact` (o a `NEXT_PUBLIC_API_URL/api/contact`).
2. Se valida (nombre, email, mensaje) y se filtra spam con un honeypot.
3. **Siempre** se guarda en `data/messages.json` (registro local, nada se pierde).
4. **Opcional:** si están configuradas, además se envía a:
   - **Supabase** (guardar en base de datos)
   - **Resend** (email de aviso)
   
   La lógica está en `src/lib/integrations.js`.

### Conectar Supabase (guardar en base de datos)
1. Creá un proyecto en https://supabase.com
2. SQL Editor → pegá y ejecutá `supabase/schema.sql`.
3. Settings → API → copiá la **Project URL** y la **service_role key**.
4. En `.env.local`:
   ```
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   SUPABASE_TABLE=contact_messages
   ```

> La `service_role key` es **secreta**: va solo en el servidor (`.env.local`),
> nunca en el navegador ni en el repo.

### Conectar Resend (recibir los mensajes por mail)
1. Creá cuenta en https://resend.com y verificá tu dominio
   (o usá el remitente de prueba `onboarding@resend.dev`).
2. Creá una **API Key**.
3. En `.env.local`:
   ```
   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=Nombre <no-reply@tudominio.com>
   CONTACT_TO_EMAIL=tu@correo.com
   ```

> Si no configurás nada, **igual funciona**: guarda en `data/messages.json`.
> Ver los guardados (backend Express): `GET http://localhost:4000/api/messages`.

## 🚀 Desplegar

- **Vercel** (recomendado, gratis): importás el repo y listo. El formulario
  funciona con la API integrada de Next.js.
- **Servidor propio / VPS:** `npm run build` + `npm run start` (web) y
  `npm run api` (backend), detrás de un reverse proxy.

> En hosting serverless, `data/messages.json` puede perderse entre
> reinicios. Para producción real, conectá una base de datos (Postgres,
> Supabase, MongoDB): la lógica está aislada en `src/lib/messages.js`.

## 🔎 SEO y rendimiento

- `<title>`, meta description, Open Graph, Twitter Card, canonical y
  **JSON-LD (schema.org)** en `src/pages/index.tsx`.
- `public/robots.txt` y `public/sitemap.xml`.
- Fuentes optimizadas con `next/font` y cabeceras de seguridad en `next.config.mjs`.

> Reemplazá `yorenstudios.com` por tu dominio real en `src/lib/content.ts`,
> `public/robots.txt` y `public/sitemap.xml`.

## 📝 Notas

- El proyecto fue **compilado y probado** (Node 24): home, formulario y
  backend Express funcionando.
- `_document.tsx` define `lang="es"`.
- Se respeta `prefers-reduced-motion`: las animaciones se desactivan solas
  para quien tenga esa preferencia activada.

---

Hecho con ❤️ por **Yoren Studios**.
