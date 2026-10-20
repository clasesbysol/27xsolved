\set ON_ERROR_STOP 0
insert into auth.users values
 ('00000000-0000-0000-0000-000000000001','clasesbysol@gmail.com',now()),
 ('00000000-0000-0000-0000-000000000002','alumno@gmail.com',now()),
 ('00000000-0000-0000-0000-000000000003','impostor@gmail.com',null);
-- admin
set role authenticated;
set request.jwt.claims='{"sub":"00000000-0000-0000-0000-000000000001","email":"clasesbysol@gmail.com","role":"authenticated"}';
select 'admin is_admin', public.is_cbc_admin();
insert into access_profiles(email) values ('alumno@gmail.com'),('impostor@gmail.com');
insert into access_grants(email,subject,unit_no,grant_type,grant_key) values
 ('alumno@gmail.com','quimica-general-4',1,'node','teoria/cinetica/qg5-ley'),
 ('alumno@gmail.com','matematica-1',1,'node','clases'),
 ('impostor@gmail.com','matematica-1',1,'node','clases');
select 'bad key rejected'; insert into access_grants(email,subject,unit_no,grant_type,grant_key) values ('alumno@gmail.com','x',1,'node','a//b');
select 'admin sees grants', count(*) from access_grants;
-- student
set request.jwt.claims='{"sub":"00000000-0000-0000-0000-000000000002","email":"alumno@gmail.com","role":"authenticated"}';
select 'student is_admin', public.is_cbc_admin();
select 'student sees own grants', count(*) from access_grants;
select 'student node ley', public.has_cbc_node_access('quimica-general-4','teoria/cinetica/qg5-ley');
select 'student node guia (expect f)', public.has_cbc_node_access('quimica-general-4','teoria/cinetica/qg5-guia');
select 'student math child', public.has_cbc_node_access('matematica-1','clases/ex1/teoria');
select 'student math prefix trick (expect f)', public.has_cbc_node_access('matematica-1','clasesX/ex1');
select 'student insert grant (expect error)'; insert into access_grants(email,subject,unit_no,grant_type,grant_key) values ('alumno@gmail.com','matematica-1',1,'node','*');
select 'student update grant rows', count(*) from (select 1) x; update access_grants set grant_key='*' where email='alumno@gmail.com';
select 'after update attempt', grant_key from access_grants order by 1;
select 'student update profile active (0 rows expected)'; update access_profiles set active=true, access_expires_at=null where email='alumno@gmail.com';
insert into student_profiles(email,year) values ('alumno@gmail.com',4);
update student_profiles set year=5 where email='alumno@gmail.com';
select 'year', year from student_profiles;
select 'grants after year change', count(*) from access_grants;
select 'student read planner of others'; select count(*) from student_planner;
select 'student read activity (0 expected)', count(*) from activity_events;
-- impostor (unconfirmed email)
set request.jwt.claims='{"sub":"00000000-0000-0000-0000-000000000003","email":"impostor@gmail.com","role":"authenticated"}';
select 'impostor sees grants (0 expected)', count(*) from access_grants;
select 'impostor node (f expected)', public.has_cbc_node_access('matematica-1','clases');
-- fake admin claim without matching user
set request.jwt.claims='{"sub":"00000000-0000-0000-0000-000000000003","email":"clasesbysol@gmail.com","role":"authenticated"}';
select 'forged admin claim (f expected)', public.is_cbc_admin();
-- legacy full
reset role;
insert into access_grants(email,subject,unit_no,grant_type,grant_key) values ('alumno@gmail.com','physics_applied',1,'unit','*');
set role authenticated;
set request.jwt.claims='{"sub":"00000000-0000-0000-0000-000000000002","email":"alumno@gmail.com","role":"authenticated"}';
select 'legacy full node', public.has_cbc_node_access('physics_applied','tension/guia');
