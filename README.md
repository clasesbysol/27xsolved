# 27xSOLved

**27xSOLved** es una plataforma educativa independiente para organizar, practicar y conservar lo aprendido. No es un sitio oficial de la Escuela Técnica N.º 27.

## Qué trae v0.1.0

- App web estática + PWA instalable, sin proceso de build.
- Pantalla inicial con **Instalar app**, **Ver como invitado** e **Ingresar con Gmail**.
- Sesión persistente: después del primer ingreso, abre directo a la app hasta cerrar sesión.
- Inicio por materias: **Química** y **Matemática**.
- Química con las 13 unidades ya estructuradas.
- Invitado: Unidad 1 completa + preview de Unidades 2–13.
- Matemática: reservada, vacía por ahora.
- Buscador global y botón siempre disponible.
- Índice lateral con las 13 unidades.
- Paleta turquesa sólida, sin degradados, con selector de color personalizado.
- Panel **Accesos** visible únicamente al administrador.
- Gestión por mail: buscar alumno → año → materia → árbol de contenidos (ver “Accesos granulares”), duración y suspender/reactivar.
- Preparado para Supabase Auth + Google y seguridad RLS.
- Sin sincronización de progreso, favoritos o resaltados para alumnos: sólo persisten localmente preferencias visuales y la sesión de acceso.

## Inicio nuevo (v1.2.0)

- **Arranque:** solcito amarillo con forma de balón que se llena mientras busca actualizaciones (`boot-splash.js`). Se ve una vez por apertura.
- **Modo profe (admin):** el inicio es la grilla de años por color → ventana con las materias del año → cartel **Teoría / TP / Machete** (`home-2026.js`). "Plan y materias" usa la misma grilla para todos.
- **Alumnos:** ven su año (lo eligen o se lo asignás en Accesos; pueden cambiarlo y el cambio queda registrado), sus materias habilitadas y las demás en gris con candado, "Seguir donde dejaste" y la etiqueta **Nuevo**. Horario semanal y tareas son opcionales (botoncitos) y se guardan en su cuenta.
- **Panel de control → Actividad de alumnos:** último ingreso, temas abiertos y ranking por materia (`admin-activity.js`). Los alumnos ven un aviso la primera vez.
- **Química General · Unidad 5: Cinética química** (`quimica-general-4-cinetica.js`), con la teoría en el orden de la carpeta. El material fuente está en `assets/quimica-general/cinetica/`.

**Paso único en Supabase:** ejecutar `supabase/migrations/20261019_home_students_activity.sql` en el SQL Editor. Hasta que se ejecute, la app funciona igual pero el año, horario y tareas quedan solo en el dispositivo y no se registra actividad.

## Accesos granulares (v1.3.0)

**Paso obligatorio en Supabase:** ejecutar `supabase/migrations/20261020_granular_access_tree.sql` en el SQL Editor. Habilita el tipo de permiso `node`, exige correo confirmado para leer permisos y agrega `has_cbc_node_access`. Sin esta migración se pueden seguir dando materias completas, pero el panel avisa que no puede guardar selecciones parciales (y no borra nada). Revisar también que en **Authentication → Providers → Email** estén activados el ingreso con correo y **Confirm email**.

- **Panel de control → Accesos:** alumno → año → materia → sección → unidad → capítulo → bloque de ejercicios, con casilleros jerárquicos (tildar un nivel habilita todo lo de adentro; destildar un hijo deja al padre en estado parcial). Atajos: *Toda la materia*, *Solo teoría*, *Nada*. La lista de alumnos resume qué tiene habilitado cada uno.
- **Árbol por materia:** `access-tree.js`. Química General, Inorgánica, Analítica Cualitativa y Física Aplicada se arman solos con los datos cargados (unidades y capítulos nuevos aparecen automáticamente). Matemática de 1.º y Procesos tienen el árbol declarado con sus títulos reales (y el mapa id de sección → ruta). Las materias en esqueleto usan el árbol estándar de `materia.html`. Los TP que figuran aparte en el catálogo se habilitan dentro de su materia, en la sección **TP / Laboratorio**.
- **Política de contenido nuevo:** tildar un nodo completo incluye lo que se agregue después adentro de ese nodo. Si una unidad tiene sólo algunos capítulos tildados, un capítulo nuevo queda bloqueado. Las reglas, fórmulas y tablas laterales (machete) quedan siempre disponibles para quien tenga algún acceso a la materia.
- **Cómo se guarda:** materia completa = filas clásicas `unit/*` + `resource/answers` + `evaluation/*`; selección parcial = una fila `grant_type='node'` por ruta (por ejemplo `teoria/cinetica/qg5-ley`). Los permisos del sistema anterior (“teórica”, “teórica + evaluaciones”, “por sección”) se leen traducidos al árbol y sólo se reescriben si se modifica esa materia.
- **Aplicación:** `access-control.js` es la única autoridad en el navegador. Verifica la sesión con Supabase (`/auth/v1/user`, correo confirmado), lee los permisos con RLS y **quita del DOM** lo no habilitado, reemplazándolo por un aviso. `app.js`, Matemática, `materia.html` y Física consultan `ET27Access.can(materia, ruta)`. localStorage y parámetros de URL no otorgan acceso; los guiones docentes sólo aparecen para el administrador verificado.
- **Límite importante:** el contenido de las materias está en archivos `.js`/`.html` públicos del repositorio (y de GitHub Pages). El control impide verlo dentro de la app, pero alguien con conocimientos técnicos puede abrir esos archivos directamente. Para protección total hay que servir el contenido desde Supabase (tablas con RLS usando `has_cbc_node_access`) o hacer privado el sitio.

### Agregar o editar una materia
1. Agregarla en `academic-catalog.js`.
2. Si usa `materia.html` con las secciones estándar, no hace falta nada más.
3. Si tiene otra organización, agregar una entrada en `DEFS` de `access-tree.js` con `children` (o `build()` si se arma desde los datos) y, si es una página estática, `pages: {'archivo.html': {idDeSeccion: 'ruta/del/arbol'}}`. Marcar los bloques de ejercicios con `kind:'exercises'`.

## Registro, año y privacidad
- Ingreso con **Google** o **cuenta con correo y contraseña** (con confirmación por correo, aviso de no reutilizar la contraseña del Gmail y aclaración de que crear la cuenta no da acceso a las materias). Al crear la cuenta se pregunta el año.
- El alumno cambia su año desde **Inicio** o **Configuración → Tu año**; se guarda en `student_profiles` y queda registrado en `student_year_changes`. Cambiar de año no modifica permisos.
- Aviso de actividad: el profe ve ingresos, temas abiertos, último tema y año. El horario y las tareas (`student_planner`) sólo los puede leer el propio alumno (RLS) y no aparecen en el panel.

## Probar la interfaz

Como no hay build, alcanza con servir la carpeta con cualquier servidor estático. Por ejemplo:

```bash
python -m http.server 8080
```

Luego abrir `http://localhost:8080`.

## Activar Gmail + accesos reales

1. Crear un proyecto en Supabase.
2. Activar **Authentication → Providers → Google**.
3. Ejecutar `supabase/schema.sql` en el SQL Editor.
4. Completar `config.js` con la URL y anon key del proyecto.
5. Confirmar el mail administrador en `config.js` y en `supabase/schema.sql`.
6. Configurar la URL publicada como Site URL / Redirect URL de Supabase.

La anon key puede estar en el navegador; la protección real está en las políticas RLS del esquema.

## Contenido protegido

El contenido premium no debe quedar escondido dentro del HTML público. La arquitectura deja preparado Supabase para que:

- Unidad 1 pueda ser pública.
- Los previews de Unidades 2–13 sean públicos.
- El contenido completo de Unidades 2–13 sólo se entregue si el mail tiene acceso suficiente.

## Próxima etapa

Cargar Química unidad por unidad a partir de los PDFs de diapositivas, ejercitación y parciales, manteniendo teoría, ejercicios resueltos, glosario y navegación de clase.
