// 27xSOLved · interfaz 2026
// Capa de presentación y organización desacoplada del motor académico.
(() => {
  'use strict';

  const BRAND = '#0f9f9a';
  const BRAND_STRONG = '#087e79';
  const SUN = '#f2b84b';
  const SCHEDULE_KEY = '27xsolved-weekly-schedule-v1';
  const CHECKLIST_KEY = '27xsolved-checklist-v1';
  const USAGE_KEY = '27xsolved-usage-v1';
  const APP_ACCENT_KEY = 'cbc-accent';
  const APP_STORED_ACCENT_KEY = '27xsolved-accent';
  const SUBJECTS = [
    { id: 'chemistry', view: 'chemistry', letter: 'Q', name: 'Química General', meta: 'Unidades, teoría y práctica' },
    { id: 'physics', view: 'physics', letter: 'F', name: 'Física Aplicada', meta: 'Teoría, fórmulas y ejercicios' }
  ];
  const DAYS = [[1, 'Lunes'], [2, 'Martes'], [3, 'Miércoles'], [4, 'Jueves'], [5, 'Viernes']];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const readJSON = (key, fallback) => {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (_) {
      return fallback;
    }
  };
  const writeJSON = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  };
  const appStore = (name, fallback) => readJSON(`27xsolved-${name}`, fallback);
  const uid = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    localStorage.setItem(APP_ACCENT_KEY, BRAND);
    localStorage.setItem(APP_STORED_ACCENT_KEY, JSON.stringify(BRAND));
  } catch (_) {}
  document.documentElement.style.setProperty('--accent', BRAND);
  document.documentElement.style.setProperty('--brand-accent', BRAND);
  document.documentElement.style.setProperty('--brand-accent-strong', BRAND_STRONG);
  document.documentElement.style.setProperty('--brand-sun', SUN);

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function setButtonLabel(button, label) {
    if (!button) return;
    const current = [...button.childNodes]
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent)
      .join('')
      .trim();
    if (current === label) return;
    [...button.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => node.remove());
    button.append(document.createTextNode(label));
  }

  function routeTo(view) {
    const native = $$('[data-v]').find(node => node.dataset.v === view && !node.closest('[data-ui-generated]') && node.isConnected);
    if (native) {
      native.click();
      return;
    }
    const url = new URL(location.href);
    url.searchParams.set('view', view);
    location.assign(url.toString());
  }

  function patchSidebar() {
    const sidebar = $('.sidebar');
    const nav = $('.sidebar > nav');
    if (!sidebar || !nav) return;

    const home = $('button[data-v="home"]', nav);
    const subjects = $('button[data-v="subjects"]', nav);
    const calendar = $('button[data-v="calendar"]', nav);
    const settings = $('.sideBottom button[data-v="settings"]') || $('button[data-v="settings"]', sidebar);

    setButtonLabel(home, 'Inicio');
    setButtonLabel(subjects, 'Plan y materias');
    setButtonLabel(calendar, 'Calendario');
    if (settings) {
      setButtonLabel(settings, 'Configuración');
      if (settings.parentElement !== nav) nav.append(settings);
    }

    ['desk', 'favorites', 'review', 'library'].forEach(view => {
      const button = $(`button[data-v="${view}"]`, nav);
      if (button) button.remove();
    });

    const profile = $('.sideBottom button[data-v="profile"]');
    if (profile) profile.remove();

    setText($('.compactIndex .sideLabel'), 'Materias a mano');

    let recent = $('.ui-recent-sidebar', sidebar);
    if (!recent) {
      recent = document.createElement('section');
      recent.className = 'ui-recent-sidebar';
      recent.dataset.uiGenerated = 'true';
      $('.compactIndex', sidebar)?.after(recent);
    }
    const recents = appStore('recent', []).slice(0, 4);
    const signature = JSON.stringify(recents.map(item => [item.key, item.at]));
    if (recent.dataset.signature !== signature) {
      recent.dataset.signature = signature;
      recent.innerHTML = recents.length
        ? `<div class="sideLabel">Abiertas recientemente</div><div class="ui-recent-list">${recents.map(item => `
            <button type="button" data-ui-nav="${esc(item.target || 'subjects')}">
              <span>${item.kind === 'unit' ? 'U' : 'M'}</span><b>${esc(item.label)}</b>
            </button>`).join('')}</div>`
        : '';
    }

    const avatar = $('.avatarButton');
    if (avatar) {
      avatar.dataset.v = 'settings';
      avatar.setAttribute('aria-label', 'Abrir configuración y perfil');
    }

    const mobile = $('.mobileNav');
    if (mobile) {
      const mobileSubjects = $('button[data-v="subjects"]', mobile);
      const oldDesk = $('button[data-v="desk"]', mobile);
      const mobileCalendar = $('button[data-v="calendar"]', mobile);
      setButtonLabel(mobileSubjects, 'Plan');
      setButtonLabel(mobileCalendar, 'Calendario');
      if (oldDesk) {
        oldDesk.dataset.v = 'settings';
        setText($('span', oldDesk), '⚙');
        setButtonLabel(oldDesk, 'Ajustes');
        mobileCalendar?.after(oldDesk);
      }
    }
  }

  function patchTopbar() {
    const title = $('.top > b');
    if (!title) return;
    if (title.textContent.trim() === 'Mis materias') setText(title, 'Plan y materias');
    if (title.textContent.trim() === 'Ajustes' || title.textContent.trim() === 'Perfil') setText(title, 'Configuración');
  }

  function courseCards() {
    return SUBJECTS.map(subject => `
      <article class="ui-course-card">
        <button type="button" data-ui-nav="${subject.view}">
          <span class="ui-course-mark">${subject.letter}</span>
          <span class="ui-course-copy"><small>Disponible</small><strong>${subject.name}</strong><em>${subject.meta}</em></span>
          <b aria-hidden="true">›</b>
        </button>
      </article>`).join('');
  }

  function scheduleData() {
    const value = readJSON(SCHEDULE_KEY, []);
    return Array.isArray(value) ? value : [];
  }

  function scheduleMarkup() {
    const schedule = scheduleData().slice().sort((a, b) => Number(a.day) - Number(b.day) || String(a.start).localeCompare(String(b.start)));
    return `
      <div class="sectionHead ui-section-head">
        <div><h2>Horario semanal</h2><p>Lunes a viernes. Tocá un bloque para editarlo.</p></div>
        <button class="secondary small" type="button" data-ui-schedule-add>+ Agregar materia</button>
      </div>
      <form class="ui-schedule-form" data-ui-schedule-form hidden>
        <input type="hidden" name="id">
        <label>Materia<input name="name" maxlength="80" required placeholder="Ej.: Química General"></label>
        <label>Día<select name="day" required>${DAYS.map(([value, label]) => `<option value="${value}">${label}</option>`).join('')}</select></label>
        <label>Desde<input name="start" type="time" value="08:00" required></label>
        <label>Hasta<input name="end" type="time" value="10:00" required></label>
        <label class="ui-color-field">Color<input name="color" type="color" value="${BRAND}"></label>
        <div class="ui-schedule-form-actions"><button type="button" class="ghost small" data-ui-schedule-cancel>Cancelar</button><button class="primary small">Guardar</button></div>
        <p class="ui-form-error" data-ui-schedule-error hidden></p>
      </form>
      <div class="ui-schedule-grid">${DAYS.map(([day, label]) => {
        const blocks = schedule.filter(item => Number(item.day) === day);
        return `<article class="ui-schedule-day"><header>${label}</header><div>${blocks.length ? blocks.map(item => `
          <article class="ui-schedule-block" style="--schedule:${esc(item.color || BRAND)}">
            <button type="button" data-ui-schedule-edit="${esc(item.id)}"><span>${esc(item.start)}–${esc(item.end)}</span><b>${esc(item.name)}</b></button>
            <button type="button" class="ui-schedule-delete" data-ui-schedule-delete="${esc(item.id)}" aria-label="Eliminar ${esc(item.name)}">×</button>
          </article>`).join('') : '<p class="ui-day-empty">Sin materias</p>'}</div></article>`;
      }).join('')}</div>`;
  }

  function renderSchedule(root = document) {
    const host = $('.ui-weekly-schedule-section', root);
    if (!host) return;
    const signature = JSON.stringify(scheduleData());
    if (host.dataset.signature === signature && host.children.length) return;
    host.dataset.signature = signature;
    host.innerHTML = scheduleMarkup();
  }

  function upcomingEvents() {
    const events = appStore('events', []);
    const today = new Date();
    const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return (Array.isArray(events) ? events : [])
      .filter(item => item?.date && item.date >= localToday)
      .sort((a, b) => String(a.date).localeCompare(String(b.date)))
      .slice(0, 6);
  }

  function formatDate(date) {
    if (!date) return '';
    const parsed = new Date(`${date}T12:00:00`);
    return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' }).format(parsed);
  }

  function checklistData() {
    const value = readJSON(CHECKLIST_KEY, []);
    return Array.isArray(value) ? value : [];
  }

  function secondaryMarkup() {
    const events = upcomingEvents();
    const checklist = checklistData();
    const pending = checklist.filter(item => !item.done).length;
    return `
      <article class="ui-secondary-card ui-important-card">
        <div class="ui-card-title"><div><h3>Fechas importantes</h3><p>Lo próximo que tenés que tener presente.</p></div><button type="button" data-ui-nav="calendar">Ver calendario</button></div>
        <div class="ui-event-list">${events.length ? events.map(event => `
          <article><i class="ui-event-dot ui-event-${esc(event.type || 'study')}"></i><div><b>${esc(event.title)}</b><small>${formatDate(event.date)}</small></div></article>`).join('') : '<div class="ui-empty-compact"><b>No hay fechas próximas</b><span>Agregalas desde Calendario.</span></div>'}</div>
      </article>
      <article class="ui-secondary-card ui-checklist-card">
        <div class="ui-card-title"><div><h3>Checklist</h3><p>Pendientes de estudio</p></div><span>${pending}</span></div>
        <form class="ui-checklist-form" data-ui-checklist-form><input name="task" maxlength="160" placeholder="Agregar una tarea…" required><button class="secondary small">Agregar</button></form>
        <div class="ui-checklist-list">${checklist.length ? checklist.map(item => `
          <label class="ui-check-item ${item.done ? 'done' : ''}"><input type="checkbox" data-ui-check="${esc(item.id)}" ${item.done ? 'checked' : ''}><span>${esc(item.text)}</span><button type="button" data-ui-check-delete="${esc(item.id)}" aria-label="Eliminar tarea">×</button></label>`).join('') : '<div class="ui-empty-compact"><b>Lista despejada</b><span>Escribí lo que no querés olvidarte.</span></div>'}</div>
      </article>`;
  }

  function renderHomeSecondary(root = document) {
    const host = $('.ui-home-secondary', root);
    if (!host) return;
    const signature = JSON.stringify([upcomingEvents(), checklistData()]);
    if (host.dataset.signature === signature && host.children.length) return;
    host.dataset.signature = signature;
    host.innerHTML = secondaryMarkup();
  }

  function patchHome() {
    const hero = $('.homeGreeting');
    if (!hero) return;
    const content = hero.closest('.content');
    if (!content) return;

    if (!hero.classList.contains('ui-home-hero')) {
      const deskCount = appStore('desk', []).length;
      hero.classList.add('ui-home-hero');
      hero.innerHTML = `
        <div class="ui-hero-copy"><span class="eyebrow">Tu espacio académico</span><h1>Mesa de estudio</h1><p>Organizá la semana y retomá tus materias desde un mismo lugar.</p><div class="ui-hero-actions"><button type="button" class="primary" data-ui-nav="desk">Abrir mesa</button><span>${deskCount ? `${deskCount} recurso${deskCount === 1 ? '' : 's'} a mano` : 'Tu mesa está lista para usar'}</span></div></div>
        <img src="./assets/brand/27xsolved-logo.webp" alt="Logo de 27xSOLved">`;
    }

    const courseSection = $('section.homeSection', content);
    if (courseSection && !courseSection.classList.contains('ui-current-section')) {
      courseSection.classList.add('ui-current-section');
      const head = $('.sectionHead', courseSection);
      if (head) head.innerHTML = '<div><h2>Materias en curso</h2><p>Entrá directo a lo que estás estudiando.</p></div><button class="textButton" type="button" data-ui-nav="subjects">Plan y materias</button>';
      const grid = $('.pinnedGrid', courseSection);
      if (grid) {
        grid.className = 'ui-course-grid';
        grid.innerHTML = courseCards();
      }
    }

    if (courseSection && !$('.ui-weekly-schedule-section', content)) {
      const schedule = document.createElement('section');
      schedule.className = 'ui-weekly-schedule-section';
      schedule.dataset.uiGenerated = 'true';
      courseSection.before(schedule);
      renderSchedule(content);
    }

    const columns = $('.homeColumns', content);
    if (columns && !columns.classList.contains('ui-home-secondary')) {
      columns.className = 'ui-home-secondary';
      columns.dataset.uiGenerated = 'true';
      columns.innerHTML = secondaryMarkup();
      columns.dataset.signature = JSON.stringify([upcomingEvents(), checklistData()]);
    } else {
      renderHomeSecondary(content);
    }

    $('.independentNote', content)?.classList.add('ui-independent-note');
  }

  function accountInfo() {
    if (localStorage.getItem('cbc-mode') === 'guest') {
      return { name: 'Estudiante invitado', email: 'Datos guardados en este dispositivo', status: 'Modo invitado' };
    }
    let email = '';
    try {
      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index) || '';
        if (!key.includes('auth-token')) continue;
        const value = JSON.parse(localStorage.getItem(key) || '{}');
        email = value?.user?.email || value?.session?.user?.email || value?.currentSession?.user?.email || '';
        if (email) break;
      }
    } catch (_) {}
    if (!email) return { name: 'Tu perfil', email: 'Sesión local', status: 'Cuenta de 27xSOLved' };
    const admin = String(window.CBCLASES_CONFIG?.adminEmail || '').toLowerCase() === String(email).toLowerCase();
    return { name: admin ? 'Administración' : 'Estudiante', email, status: admin ? 'Cuenta administradora' : 'Cuenta conectada' };
  }

  function dayKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function usageData() {
    const value = readJSON(USAGE_KEY, {});
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  }

  function usageMarkup() {
    const usage = usageData();
    const days = [];
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() - offset);
      days.push({ date, key: dayKey(date), minutes: Number(usage[dayKey(date)] || 0) });
    }
    const total = days.reduce((sum, item) => sum + item.minutes, 0);
    const max = Math.max(1, ...days.map(item => item.minutes));
    const today = days[days.length - 1]?.minutes || 0;
    return `<div class="ui-usage-summary"><div><strong>${today} min</strong><span>hoy</span></div><div><strong>${total} min</strong><span>últimos 7 días</span></div></div><div class="ui-usage-chart">${days.map(item => `
      <div><i style="--usage-height:${Math.max(4, Math.round(item.minutes / max * 100))}%"></i><span>${new Intl.DateTimeFormat('es-AR', { weekday: 'narrow' }).format(item.date)}</span><small>${item.minutes}</small></div>`).join('')}</div>`;
  }

  function renderUsagePanel(root = document) {
    const panel = $('.ui-usage-panel', root);
    if (!panel) return;
    const signature = JSON.stringify(usageData());
    if (panel.dataset.signature === signature) return;
    panel.dataset.signature = signature;
    panel.innerHTML = usageMarkup();
  }

  function patchSettings() {
    const appearance = $('.appearanceCard');
    if (!appearance) return;
    const content = appearance.closest('.content');
    if (!content) return;
    const intro = $('.pageIntro', content);
    if (intro) {
      setText($('h1', intro), 'Configuración');
      setText($('p', intro), 'Tu perfil, actividad, apariencia y datos de la aplicación.');
    }

    let grid = $('.ui-settings-grid', content);
    if (!grid) {
      grid = document.createElement('div');
      grid.className = 'ui-settings-grid';
      grid.dataset.uiGenerated = 'true';
      intro?.after(grid);
      const info = accountInfo();
      grid.insertAdjacentHTML('beforeend', `
        <section class="ui-settings-card ui-profile-settings"><div class="ui-settings-heading"><div><h2>Perfil</h2><p>Tu cuenta y el alcance del guardado.</p></div></div><div class="ui-profile-panel"><img src="./assets/brand/icon-192.png" alt="Logo de 27xSOLved"><div><strong>${esc(info.name)}</strong><span>${esc(info.email)}</span><small>${esc(info.status)}</small></div></div></section>
        <section class="ui-settings-card ui-usage-settings"><div class="ui-settings-heading"><div><h2>Tiempo de uso</h2><p>Actividad de estudio de los últimos siete días.</p></div></div><div class="ui-usage-panel">${usageMarkup()}</div></section>`);
      $$('.settingsCard', content).filter(card => !card.closest('.ui-settings-grid')).forEach(card => grid.append(card));
    }

    const accentField = $$('fieldset', appearance).find(fieldset => /color de acento/i.test(fieldset.textContent || ''));
    if (accentField) accentField.remove();
    if (!$('.ui-brand-color-note', appearance)) {
      appearance.insertAdjacentHTML('beforeend', `<div class="ui-brand-color-note"><i></i><span><b>Color de marca</b><small>El turquesa de las moléculas del logo identifica acciones y estados activos.</small></span></div>`);
    }
    setText($('p', appearance), 'Elegí claro, oscuro o sistema. La identidad de 27xSOLved conserva el color del logo.');
    renderUsagePanel(content);
  }

  function patchSubjects() {
    const intro = $$('.pageIntro').find(node => $('h1', node)?.textContent.trim() === 'Mis materias');
    if (intro) {
      setText($('h1', intro), 'Plan y materias');
      setText($('.eyebrow', intro), 'Organización académica');
      setText($('p', intro), 'Tus materias, accesos y recorrido académico en un mismo lugar.');
      const planLink = $('.planLink', intro.closest('.content'));
      if (planLink) {
        setText($('b', planLink), 'Avance de la carrera');
        setText($('p', planLink), 'Consultá el plan por años y las materias disponibles en 27xSOLved.');
        setText($('button', planLink), 'Ver plan por años');
      }
    }

    const planHero = $$('.hero.compact').find(node => $('h1', node)?.textContent.trim() === 'Materias por año');
    if (planHero) {
      setText($('h1', planHero), 'Plan y materias');
      setText($('p', planHero), 'Recorrido por años. Solo se muestran como confirmadas las materias ya verificadas en el proyecto.');
    }
  }

  function patchGlobal() {
    document.documentElement.style.setProperty('--accent', BRAND);
    const meta = $('meta[name="theme-color"]');
    if (meta && document.documentElement.dataset.theme !== 'dark' && meta.getAttribute('content') !== BRAND) meta.setAttribute('content', BRAND);
    $$('[data-favorite]').forEach(button => button.remove());
    patchSidebar();
    patchTopbar();
    patchHome();
    patchSubjects();
    patchSettings();
  }

  function openScheduleForm(id = '') {
    const form = $('[data-ui-schedule-form]');
    if (!form) return;
    const item = id ? scheduleData().find(entry => entry.id === id) : null;
    form.hidden = false;
    form.elements.id.value = item?.id || '';
    form.elements.name.value = item?.name || '';
    form.elements.day.value = String(item?.day || 1);
    form.elements.start.value = item?.start || '08:00';
    form.elements.end.value = item?.end || '10:00';
    form.elements.color.value = item?.color || BRAND;
    const error = $('[data-ui-schedule-error]', form);
    if (error) error.hidden = true;
    form.elements.name.focus();
  }

  function saveSchedule(form) {
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const start = String(data.get('start') || '');
    const end = String(data.get('end') || '');
    const error = $('[data-ui-schedule-error]', form);
    if (!name || !start || !end || end <= start) {
      if (error) {
        error.hidden = false;
        error.textContent = end <= start ? 'La hora de finalización tiene que ser posterior al inicio.' : 'Completá todos los datos.';
      }
      return;
    }
    const id = String(data.get('id') || '');
    const next = scheduleData();
    const entry = { id: id || uid(), name, day: Number(data.get('day') || 1), start, end, color: String(data.get('color') || BRAND) };
    const index = next.findIndex(item => item.id === id);
    if (index >= 0) next[index] = entry;
    else next.push(entry);
    writeJSON(SCHEDULE_KEY, next);
    renderSchedule();
  }

  function saveChecklist(text) {
    const clean = String(text || '').trim();
    if (!clean) return;
    const next = checklistData();
    next.push({ id: uid(), text: clean, done: false, createdAt: new Date().toISOString() });
    writeJSON(CHECKLIST_KEY, next);
    renderHomeSecondary();
  }

  document.addEventListener('click', event => {
    const nav = event.target.closest('[data-ui-nav]');
    if (nav) {
      event.preventDefault();
      routeTo(nav.dataset.uiNav);
      return;
    }
    if (event.target.closest('[data-ui-schedule-add]')) {
      event.preventDefault();
      openScheduleForm();
      return;
    }
    if (event.target.closest('[data-ui-schedule-cancel]')) {
      event.preventDefault();
      const form = $('[data-ui-schedule-form]');
      if (form) form.hidden = true;
      return;
    }
    const edit = event.target.closest('[data-ui-schedule-edit]');
    if (edit) {
      event.preventDefault();
      openScheduleForm(edit.dataset.uiScheduleEdit);
      return;
    }
    const removeSchedule = event.target.closest('[data-ui-schedule-delete]');
    if (removeSchedule) {
      event.preventDefault();
      writeJSON(SCHEDULE_KEY, scheduleData().filter(item => item.id !== removeSchedule.dataset.uiScheduleDelete));
      renderSchedule();
      return;
    }
    const removeTask = event.target.closest('[data-ui-check-delete]');
    if (removeTask) {
      event.preventDefault();
      writeJSON(CHECKLIST_KEY, checklistData().filter(item => item.id !== removeTask.dataset.uiCheckDelete));
      renderHomeSecondary();
      return;
    }
    const colorChoice = event.target.closest('[data-color]');
    if (colorChoice) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  document.addEventListener('change', event => {
    const checkbox = event.target.closest('[data-ui-check]');
    if (!checkbox) return;
    writeJSON(CHECKLIST_KEY, checklistData().map(item => item.id === checkbox.dataset.uiCheck ? { ...item, done: checkbox.checked } : item));
    renderHomeSecondary();
  });

  document.addEventListener('submit', event => {
    const scheduleForm = event.target.closest('[data-ui-schedule-form]');
    if (scheduleForm) {
      event.preventDefault();
      saveSchedule(scheduleForm);
      return;
    }
    const checklistForm = event.target.closest('[data-ui-checklist-form]');
    if (checklistForm) {
      event.preventDefault();
      const field = checklistForm.elements.task;
      saveChecklist(field.value);
      field.value = '';
    }
  });

  let usageStarted = false;
  function startUsageTracking() {
    if (usageStarted) return;
    usageStarted = true;
    window.setInterval(() => {
      if (document.hidden || !$('.appShell')) return;
      const usage = usageData();
      const key = dayKey();
      usage[key] = Number(usage[key] || 0) + 1;
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 21);
      Object.keys(usage).forEach(day => {
        if (day < dayKey(cutoff)) delete usage[day];
      });
      writeJSON(USAGE_KEY, usage);
      renderUsagePanel();
    }, 60000);
  }

  let queued = false;
  function queueRefresh() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      patchGlobal();
    });
  }

  function init() {
    const app = $('#app');
    if (!app) return;
    const observer = new MutationObserver(queueRefresh);
    observer.observe(app, { childList: true, subtree: true });
    startUsageTracking();
    queueRefresh();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
