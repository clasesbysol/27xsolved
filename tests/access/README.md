# Pruebas del sistema de accesos

- `npm i && npm run bundle && npx playwright install chromium`
- `npm run coverage` — todo el contenido de cada materia y TP figura en el panel de accesos (falla y lista lo que falte). Correrlo cada vez que se agrega contenido.
- `npm run tree` — lógica del árbol (selección parcial, compactado, permisos anteriores).
- `npm run e2e` — 23 pruebas en el navegador contra un Supabase simulado (`mock.js`, reproduce Auth + RLS).
- `rls-shim.sql` + `../../supabase/schema.sql` + migraciones + `rls-test.sql` — prueba de las políticas en un PostgreSQL local.
