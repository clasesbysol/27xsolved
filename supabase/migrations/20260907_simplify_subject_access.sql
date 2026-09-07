-- 27xSOLved · permisos simples por materia.
-- Convención en access_grants:
--   unit/*            = acceso a la materia
--   resource/answers  = acceso a todas las respuestas de esa materia
--   evaluation/*      = acceso a las evaluaciones de esa materia

-- Conservamos a los alumnos que ya tenían algún permiso legado de Química o Física,
-- pero convertimos esos permisos granulares en acceso a la materia completa.
insert into public.access_grants (email, subject, unit_no, grant_type, grant_key)
select distinct email, 'chemistry', u.unit_no, 'unit', '*'
from public.access_grants g
cross join generate_series(1,13) as u(unit_no)
where g.subject='chemistry'
on conflict do nothing;

insert into public.access_grants (email, subject, unit_no, grant_type, grant_key)
select distinct email, 'physics_applied', 1, 'unit', '*'
from public.access_grants g
where g.subject='physics_applied'
on conflict do nothing;

-- El panel nuevo ya no usa permisos por capítulo/sección/recurso legado.
delete from public.access_grants
where subject in ('chemistry','physics_applied')
  and not (grant_type='unit' and grant_key='*')
  and not (grant_type='resource' and grant_key='answers')
  and not (grant_type='evaluation' and grant_key='*');

create or replace function public.has_cbc_subject_permission(
  target_subject text,
  target_type text,
  target_key text
)
returns boolean
language sql
stable
security invoker
set search_path=public
as $$
  select public.is_cbc_admin() or exists(
    select 1
    from public.access_profiles p
    join public.access_grants g on lower(g.email)=lower(p.email)
    where lower(p.email)=lower(coalesce(auth.jwt()->>'email',''))
      and p.active
      and now()>=p.access_starts_at
      and (p.access_expires_at is null or now()<=p.access_expires_at)
      and g.subject=target_subject
      and g.grant_type=target_type
      and g.grant_key=target_key
  )
$$;

-- Las respuestas dejan de depender de un interruptor global por ejercicio.
-- Un alumno autenticado las ve sólo si tiene acceso al ejercicio y además
-- el permiso "Respuestas" para esa materia. El administrador siempre las ve.
drop policy if exists "read visible solutions" on public.exercise_solutions;
drop policy if exists "read permitted solutions" on public.exercise_solutions;
create policy "read permitted solutions"
on public.exercise_solutions
for select
to authenticated
using (
  public.is_cbc_admin()
  or (
    public.can_access_exercise(exercise_id)
    and exists(
      select 1
      from public.exercises e
      where e.id=exercise_id
        and public.has_cbc_subject_permission(e.subject,'resource','answers')
    )
  )
);