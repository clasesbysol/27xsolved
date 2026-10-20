-- 27xSOLved · permisos granulares por árbol de contenidos (octubre 2026)
--
-- Qué hace:
--   1. Habilita el tipo de permiso grant_type='node' en access_grants. Cada fila guarda una ruta
--      del árbol de contenidos de la materia (ver access-tree.js), por ejemplo:
--        subject='chemistry', grant_type='node', grant_key='teoria/cinetica/qg5-ley'
--      La ruta habilita ese nodo y todo lo que tenga adentro. La materia completa se sigue
--      guardando con las filas clásicas (unit/* + resource/answers + evaluation/*).
--   2. Exige que el correo de la sesión esté confirmado para leer permisos y para ser
--      administrador. Así nadie puede "reclamar" los permisos de otro creando una cuenta con
--      correo y contraseña sin confirmar ese correo.
--   3. Agrega public.has_cbc_node_access(materia, ruta) para proteger desde la base cualquier
--      contenido que se sirva desde Supabase.
--
-- Cómo aplicarla: Supabase → SQL Editor → pegar este archivo → Run. Es idempotente.
-- Los permisos ya otorgados no se modifican.
--
-- Para volver atrás el punto 2 (sólo si el administrador no pudiera entrar):
--   create or replace function public.is_cbc_admin() returns boolean language sql stable
--   security definer set search_path=public
--   as $$ select lower(coalesce(auth.jwt()->>'email',''))='clasesbysol@gmail.com' $$;

-- ---------- 1. Nuevo tipo de permiso ----------
alter table public.access_grants drop constraint if exists access_grants_grant_type_check;
alter table public.access_grants add constraint access_grants_grant_type_check
  check (grant_type in ('unit','chapter','guide','practice','evaluation','partial','resource','node'));

alter table public.access_grants drop constraint if exists access_grants_node_key_check;
alter table public.access_grants add constraint access_grants_node_key_check
  check (grant_type<>'node' or grant_key ~ '^(\*|[A-Za-z0-9._-]+(/[A-Za-z0-9._-]+)*)$');

-- ---------- 2. Correo confirmado ----------
create or replace function public.jwt_email_verified()
returns boolean language sql stable security definer set search_path=public,auth
as $$
  select exists(
    select 1 from auth.users u
    where u.id=auth.uid()
      and u.email_confirmed_at is not null
      and lower(u.email)=lower(coalesce(auth.jwt()->>'email',''))
  )
$$;

create or replace function public.is_cbc_admin()
returns boolean language sql stable security definer set search_path=public
as $$
  select lower(coalesce(auth.jwt()->>'email',''))='clasesbysol@gmail.com'
     and public.jwt_email_verified()
$$;

drop policy if exists "read own access" on public.access_profiles;
create policy "read own access" on public.access_profiles for select to authenticated
  using ((lower(email)=lower(coalesce(auth.jwt()->>'email','')) and public.jwt_email_verified()) or public.is_cbc_admin());

drop policy if exists "read own grants" on public.access_grants;
create policy "read own grants" on public.access_grants for select to authenticated
  using ((lower(email)=lower(coalesce(auth.jwt()->>'email','')) and public.jwt_email_verified()) or public.is_cbc_admin());

-- has_active_cbc_access / has_cbc_subject_permission también dependen del correo confirmado.
create or replace function public.has_active_cbc_access(target_subject text,target_unit integer,target_type text,target_key text)
returns boolean language sql stable security definer set search_path=public
as $$
  select public.is_cbc_admin() or (public.jwt_email_verified() and exists(
    select 1 from public.access_profiles p join public.access_grants g on lower(g.email)=lower(p.email)
    where lower(p.email)=lower(coalesce(auth.jwt()->>'email','')) and p.active
      and now()>=p.access_starts_at and (p.access_expires_at is null or now()<=p.access_expires_at)
      and g.subject=target_subject and g.unit_no=target_unit
      and ((g.grant_type='unit' and g.grant_key='*') or (g.grant_type=target_type and g.grant_key=target_key))
  ))
$$;

create or replace function public.has_cbc_subject_permission(target_subject text,target_type text,target_key text)
returns boolean language sql stable security invoker set search_path=public
as $$
  select public.is_cbc_admin() or (public.jwt_email_verified() and exists(
    select 1 from public.access_profiles p join public.access_grants g on lower(g.email)=lower(p.email)
    where lower(p.email)=lower(coalesce(auth.jwt()->>'email',''))
      and p.active and now()>=p.access_starts_at
      and (p.access_expires_at is null or now()<=p.access_expires_at)
      and g.subject=target_subject and g.grant_type=target_type and g.grant_key=target_key
  ))
$$;

-- ---------- 3. Permiso por ruta del árbol ----------
-- true si el alumno tiene la materia completa (unit/* sin resource/theory) o una ruta que
-- sea target_path o un ancestro de target_path.
create or replace function public.has_cbc_node_access(target_subject text,target_path text)
returns boolean language sql stable security definer set search_path=public
as $$
  select public.is_cbc_admin() or (public.jwt_email_verified() and exists(
    select 1 from public.access_profiles p
    where lower(p.email)=lower(coalesce(auth.jwt()->>'email','')) and p.active
      and now()>=p.access_starts_at and (p.access_expires_at is null or now()<=p.access_expires_at)
      and (
        exists(select 1 from public.access_grants g
               where lower(g.email)=lower(p.email) and g.subject=target_subject and g.grant_type='node'
                 and (g.grant_key='*' or g.grant_key=target_path or left(target_path,length(g.grant_key)+1)=g.grant_key||'/'))
        or (exists(select 1 from public.access_grants g
                   where lower(g.email)=lower(p.email) and g.subject=target_subject and g.grant_type='unit' and g.grant_key='*')
            and not exists(select 1 from public.access_grants g
                   where lower(g.email)=lower(p.email) and g.subject=target_subject and g.grant_type='resource' and g.grant_key='theory'))
      )
  ))
$$;

create index if not exists access_grants_node_idx on public.access_grants(lower(email),subject,grant_type,grant_key);
