// Plan académico 27xSOLved · parche estable e idempotente.
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
    return `<section class="academic-plan-shell" data-academic-plan data-plan-version="1.1.7">
      <nav class="academic-year-jump" aria-label="Ir a un año">
        ${years.map(year => `<a href="#anio-${year.year}">${year.year}.º</a>`).join('')}
      </nav>
      <div class="academic-plan-years">${years.map(yearMarkup).join('')}</div>
      <aside class="academic-plan-note"><b>Esqueleto académico actualizado</b><p>Cada materia nueva abre con Resumen, Mapa mental, Ejercicios, Parciales y hoja de fórmulas. Versión 1.1.7.</p></aside>
    </section>`;
  }

  window.ET27AcademicPlanMarkup = markup;

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function mountPlan(content, replaceNode) {
    let plan = $('[data-academic-plan]', content);
    if (plan) return plan;
    const host = document.createElement('div');
    host.innerHTML = markup();
    plan = host.firstElementChild;
    if (replaceNode) replaceNode.replaceWith(plan);
    else content.append(plan);
    return plan;
  }

  function patchSubjects() {
    const content = $('#app .main .content');
    if (!content) return;
    const intro = $$('.pageIntro', content).find(node => /Mis materias|Plan y materias/i.test($('h1', node)?.textContent || ''));
    if (!intro) return;

    setText($('h1', intro), 'Plan y materias');
    setText($('.eyebrow', intro), '4.º · 5.º · 6.º año');
    setText($('p', intro), 'Entrá por año y después por materia. Los TP y laboratorios quedan separados para encontrarlos rápido.');

    const nativeSubjects = $('.subjects', content);
    mountPlan(content, nativeSubjects);
    $('.planLink', content)?.remove();
  }

  function patchLibrary() {
    const content = $('#app .main .content');
    if (!content) return;
    const intro = $$('.pageIntro', content).find(node => /^Biblioteca$/i.test($('h1', node)?.textContent?.trim() || ''));
    if (!intro) return;

    setText($('p', intro), 'Todo el contenido disponible, ordenado por año y por materia.');
    const nativeSubjects = $('.subjects', content);
    mountPlan(content, nativeSubjects);
  }

  function patchTopbar() {
    const topTitle = $('#app .top > b');
    if (!topTitle) return;
    if (topTitle.textContent.trim() === 'Plan por años' || topTitle.textContent.trim() === 'Mis materias') {
      setText(topTitle, 'Plan y materias');
    }
  }

  function patch() {
    patchSubjects();
    patchLibrary();
    patchTopbar();
  }

  let scheduled = false;
  function schedulePatch() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      patch();
    });
  }

  const app = document.getElementById('app');
  if (app) {
    const observer = new MutationObserver(schedulePatch);
    observer.observe(app, { childList: true, subtree: true });
  }
  document.addEventListener('DOMContentLoaded', schedulePatch, { once: true });
  schedulePatch();
})();

function planPage() {
  return `<section class="pageIntro"><span class="eyebrow">4.º · 5.º · 6.º año</span><h1>Plan y materias</h1><p>Entrá por año y después por materia. Los TP y laboratorios quedan separados para encontrarlos rápido.</p></section>${window.ET27AcademicPlanMarkup ? window.ET27AcademicPlanMarkup() : ''}`;
}
