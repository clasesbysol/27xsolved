# 27xSOLved · reglas para trabajar en este repositorio

## Regla obligatoria: todo contenido nuevo va al panel de accesos

Cada vez que se agrega o cambia contenido de una materia (unidad, capítulo, sección, guía de
ejercicios, evaluación, TP, página nueva), ese contenido tiene que aparecer en el **Panel de
control → Accesos** para que la profe pueda habilitarlo. Si no está en el árbol, ningún alumno
con acceso parcial lo puede ver y no hay forma de dárselo salvo con "Toda la materia".

El árbol del panel está en `access-tree.js` (`DEFS`). Según la materia:

- **Química General, Química Inorgánica, Analítica Cualitativa, Física (Tema 2):** el árbol se
  arma solo desde los datos (`window.ET27_QG4`, `ET27_QI4`, `ET27_QAC5`, `ET27_HIDRO`). Alcanza
  con que el contenido nuevo entre por `units.push(...)` / `sections.push(...)` con un `key`
  único y estable, y que el archivo esté cargado en `index.html`. No inventar otra vía de
  render (contenido inyectado fuera de `sections` no queda en el panel).
- **Procesos y Operaciones Químicas, Matemática de 1.º, Física (Tema 1):** el árbol está
  declarado a mano. Al agregar una unidad, sección o página hay que:
  1. agregar el nodo en `DEFS` con su título real (`kind:'exercises'` para bloques de ejercicios,
     `tags:['eval']` para evaluaciones);
  2. agregar en `pages` el id de cada `<section>` nueva → ruta del árbol (para el TP de Procesos,
     `pages['materia.html#tp']`, con rutas completas `tp/...`).
- **Materias en esqueleto (`materia.html` estándar):** no hace falta nada mientras usen las
  secciones estándar. Si se les agrega otra organización, pasan a tener entrada propia en `DEFS`.
- **TP que figura aparte en el catálogo:** se habilita dentro de su materia, en el nodo `tp`.

No cambiar los `key` de contenido ya publicado: los permisos guardados usan esas rutas.

### Comprobarlo antes de cada commit con contenido

```bash
cd tests/access
npm i && npm run bundle          # la primera vez
npm run coverage                 # tiene que terminar en "Todo el contenido está en el panel de accesos."
npm run tree && npm run e2e      # si se tocó access-tree.js / access-control.js / admin-access.js
```

`npm run coverage` abre cada materia y TP del catálogo como un alumno que tiene todo tildado
nodo por nodo (sin "materia completa") y como admin; lista cualquier sección que exista en la
página pero no en el panel. Si Playwright no puede descargar su navegador, usar el Chrome del
sistema: `CHROME=/usr/bin/google-chrome npm run coverage`.

Al tocar `access-tree.js` o `access-control.js`, subir el `?v=` de esos scripts en los `.html`
y el `CACHE` de `sw.js`, para que los alumnos reciban la versión nueva.
