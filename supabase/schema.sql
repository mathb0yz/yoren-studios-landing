-- =====================================================================
--  YOREN STUDIOS - Esquema de Supabase para el formulario de contacto
-- =====================================================================
--  Como usarlo:
--    1) Entra a tu proyecto de Supabase -> "SQL Editor".
--    2) Pega todo este archivo y ejecuta (Run).
--    3) Copia la URL del proyecto y la "service_role key" (Settings > API)
--       y pegalas en tu .env.local:
--            SUPABASE_URL=https://xxxx.supabase.co
--            SUPABASE_SERVICE_ROLE_KEY=eyJ...
--            SUPABASE_TABLE=contact_messages
--
--  OJO: la service_role key es SECRETA. Va solo en el servidor
--  (.env.local), nunca en el navegador ni en el repo.
-- =====================================================================

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service text,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

-- Row Level Security:
-- El backend escribe con la service_role key, que IGNORA RLS.
-- Dejamos RLS activado y SIN politicas publicas, para que nadie pueda
-- leer los mensajes desde el navegador.
alter table public.contact_messages enable row level security;
