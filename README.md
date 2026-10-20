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
- Gestión por mail: buscar alumno → año → materia → nivel (sin acceso, solo teórica, teórica + evaluaciones o materia completa), duración y suspender/reactivar. Lógica en `admin-access.js`; la aplicación de permisos en cada página está en `access-control.js`.
- Química: el nivel "teórica" habilita los capítulos cargados al momento de guardar. Si se agregan capítulos nuevos, volver a guardar el acceso del alumno.
- Preparado para Supabase Auth + Google y seguridad RLS.
- Sin sincronización de progreso, favoritos o resaltados para alumnos: sólo persisten localmente preferencias visuales y la sesión de acceso.

## Inicio nuevo (v1.2.0)

- **Arranque:** solcito amarillo con forma de balón que se llena mientras busca actualizaciones (`boot-splash.js`). Se ve una vez por apertura.
- **Modo profe (admin):** el inicio es la grilla de años por color → ventana con las materias del año → cartel **Teoría / TP / Machete** (`home-2026.js`). "Plan y materias" usa la misma grilla para todos.
- **Alumnos:** ven su año (lo eligen o se lo asignás en Accesos; pueden cambiarlo y el cambio queda registrado), sus materias habilitadas y las demás en gris con candado, "Seguir donde dejaste" y la etiqueta **Nuevo**. Horario semanal y tareas son opcionales (botoncitos) y se guardan en su cuenta.
- **Panel de control → Actividad de alumnos:** último ingreso, temas abiertos y ranking por materia (`admin-activity.js`). Los alumnos ven un aviso la primera vez.
- **Química General · Unidad 5: Cinética química** (`quimica-general-4-cinetica.js`), con la teoría en el orden de la carpeta. El material fuente está en `assets/quimica-general/cinetica/`.

**Paso único en Supabase:** ejecutar `supabase/migrations/20261019_home_students_activity.sql` en el SQL Editor. Hasta que se ejecute, la app funciona igual pero el año, horario y tareas quedan solo en el dispositivo y no se registra actividad.

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
