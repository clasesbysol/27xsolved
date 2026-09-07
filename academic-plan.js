// Plan por años de 27xSOLved. Se monta sobre la vista actual sin tocar el motor académico.
(function () {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  function catalog() {
    return window.ET27_ACADEMIC_CATALOG || { years: [] };
  }

  function card(subject) {
    const ready = subject.status === 'Disponible' || /cargada/i.test(subject.status || '');
    return `<a class="academic-subject-card ${ready ? 'is-ready' : 'is-skeleton'}" href="${esc(subject.href)}">
      <span class="academic-subject-mark">${esc(subject.letter)}</span>
      <span class="academic-subject-copy">
        <small>${esc(subject.kind)}</small>
        <strong>${esc(subject.name)}</strong>
        <em>${esc(subject.status || 'Esqueleto listo')}</em>
      </span>
      <b aria-hidden="true">›</b>
    </a>`;
  }

  function yearMarkup(year) {
    const regular = year.subjects.filter(subject => subject.kind === 'Materia');
    const labs = year.subjects.filter(subject => subject.kind !== 'Materia');
    return `<section class="academic-year" id="anio-${year.year}">
      <header class="academic-year-head">
        <div><span>${year.year}.º año</span><h2>${year.year}.º año</h2></div>
        <small>${year.subjects.length} espacios cargados</small>
      </header>
      <div class="academic-year-group">
        <div class="academic-group-title"><b>Materias</b><span>${regular.length}</span></div>
        <div class="academic-subject-grid">${regular.map(card).join('')}</div>
      </div>
      ${labs.length ? `<div class="academic-year-group academic-lab-group">
        <div class="academic-group-title"><b>TP / Laboratorios</b><span>${labs.length}</span></div>
        <div class="academic-subject-grid">${labs.map(card).join('')}</div>
      </div>` : ''}
    </section>`;
  }

  function markup() {
    const years = catalog().years || [];
    return `<section class="academic-plan-shell" data-academic-plan>
      <nav class="academic-year-jump" aria-label="Ir a un año">
        ${years.map(year => `<a href="#anio-${year.year}">${year.year}.º</a>`).join('')}
      </nav>
      <div class="academic-plan-years">${years.map(yearMarkup).join('')}</div>
      <aside class="academic-plan-note"><b>Esqueleto inicial</b><p>Las materias ya quedan separadas por año. Cada materia nueva abre con Resumen, Ejercicios, Evaluaciones y una hoja de fórmulas lateral; el contenido se completa a medida que agregamos material.</p></aside>
    </section>`;
  }

  window.ET27AcademicPlanMarkup = markup;

  function patchSubjects() {
    const intro = $$('.pageIntro').find(node => /Mis materias|Plan y materias/i.test($('h1', node)?.textContent || ''));
    if (!intro) return;
    const content = intro.closest('.content');
    if (!content) return;

    const h1 = $('h1', intro);
    const eyebrow = $('.eyebrow', intro);
    const p = $('p', intro);
    if (h1) h1.textContent = 'Plan y materias';
    if (eyebrow) eyebrow.textContent = '4.º · 5.º · 6.º año';
    if (p) p.textContent = 'Entrá por año y después por materia. Los TP y laboratorios quedan como materias separadas.';

    const nativeSubjects = $('.subjects', content);
    let plan = $('[data-academic-plan]', content);
    if (!plan) {
      const host = document.createElement('div');
      host.innerHTML = markup();
      plan = host.firstElementChild;
      if (nativeSubjects) nativeSubjects.replaceWith(plan);
      else intro.after(plan);
    }

    $('.planLink', content)?.remove();
  }

  function patchPlanRoute() {
    const topTitle = $('.top > b');
    if (topTitle && topTitle.textContent.trim() === 'Plan por años') topTitle.textContent = 'Plan y materias';
  }

  function patch() {
    patchSubjects();
    patchPlanRoute();
  }

  const observer = new MutationObserver(() => patch());
  const app = document.getElementById('app');
  if (app) observer.observe(app, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', patch, { once: true });
  window.setTimeout(patch, 0);
})();

// El motor actual referencia planPage como función global. La definimos acá para que
// la ruta ?view=plan también use el mismo catálogo por años.
function planPage() {
  return `<section class="pageIntro"><span class="eyebrow">4.º · 5.º · 6.º año</span><h1>Plan y materias</h1><p>Entrá por año y después por materia. Los TP y laboratorios quedan como materias separadas.</p></section>${window.ET27AcademicPlanMarkup ? window.ET27AcademicPlanMarkup() : ''}`;
}
