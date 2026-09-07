(function () {
  'use strict';

  const app = document.getElementById('subjectApp');
  const catalog = window.ET27_ACADEMIC_CATALOG || { years: [], content: {} };
  const params = new URLSearchParams(location.search);
  const subjectId = params.get('subject') || '';
  const subjects = catalog.years.flatMap(year => year.subjects.map(subject => ({ ...subject, year: year.year })));
  const subject = subjects.find(item => item.id === subjectId);
  const content = catalog.content?.[subjectId] || null;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  function applyTheme() {
    let mode = 'system';
    try { mode = localStorage.getItem('cbc-theme') || JSON.parse(localStorage.getItem('27xsolved-theme') || '"system"'); } catch (_) {}
    document.documentElement.dataset.theme = ['light', 'dark', 'system'].includes(mode) ? mode : 'system';
  }

  function formula(latex, display = true) {
    return `<span class="math-node" data-latex="${encodeURIComponent(latex)}" data-display="${display ? '1' : '0'}">${esc(latex)}</span>`;
  }

  let mathAttempts = 0;
  function renderMath() {
    if (!window.katex) {
      mathAttempts += 1;
      if (mathAttempts < 30) window.setTimeout(renderMath, 150);
      return;
    }
    document.querySelectorAll('[data-latex]').forEach(node => {
      if (node.dataset.rendered === '1') return;
      try {
        window.katex.render(decodeURIComponent(node.dataset.latex), node, {
          throwOnError: false,
          displayMode: node.dataset.display === '1'
        });
        node.dataset.rendered = '1';
      } catch (_) {}
    });
  }

  function pvDiagram() {
    return `<figure class="pv-diagram">
      <svg viewBox="0 0 600 360" role="img" aria-label="Diagrama presión-volumen del ciclo A B C">
        <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="#50666a"/></marker></defs>
        <g stroke="#dbe7e5" stroke-width="1">
          ${[90,160,230,300,370,440,510].map(x => `<line x1="${x}" y1="32" x2="${x}" y2="300"/>`).join('')}
          ${[50,90,130,170,210,250,290].map(y => `<line x1="70" y1="${y}" x2="540" y2="${y}"/>`).join('')}
        </g>
        <g stroke="#50666a" stroke-width="2" fill="none" marker-end="url(#arrow)"><path d="M70 300H548"/><path d="M70 300V24"/></g>
        <g fill="#50666a" font-family="Nunito, sans-serif" font-size="14"><text x="500" y="327">V (L)</text><text x="18" y="34">P (kPa)</text></g>
        <g stroke="#1768ac" stroke-width="4" fill="none"><path d="M160 250L160 50"/><path d="M160 50 C230 118 345 198 510 250"/><path d="M510 250L160 250"/></g>
        <g fill="#183037" font-family="Nunito, sans-serif" font-size="15" font-weight="800"><text x="138" y="274">A</text><text x="138" y="43">B</text><text x="518" y="271">C</text></g>
        <g fill="#6a7d80" font-family="Nunito, sans-serif" font-size="12"><text x="150" y="319">2</text><text x="503" y="319">6</text><text x="48" y="255">2</text><text x="48" y="55">6</text></g>
      </svg>
      <figcaption>Esquema P–V de la guía: AB isocórica, BC isotérmica y CA isobárica.</figcaption>
    </figure>`;
  }

  function summaryMarkup() {
    if (!content?.summary) {
      return `<div class="placeholder-card"><b>Resumen listo para completar</b><p>La estructura ya está armada. Cuando agreguemos apuntes o PDFs, la teoría va a quedar organizada acá por unidades y temas.</p></div>`;
    }
    const s = content.summary;
    return `<article class="topic-card">
      <span>${esc(content.sourceLabel || 'Material cargado')}</span>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.lead)}</p>
      <div class="state-callout"><b>Funciones de estado.</b> ${esc(s.stateFunctions)}<div>${formula('\\Delta U = Q + L')}</div></div>
      <div class="transform-grid">${(s.transformations || []).map(item => `<article class="transform-card">
        <header><b>${esc(item.name)}</b><small>${esc(item.rule)}</small></header>
        <div class="transform-formulas">
          <div><label>ΔU</label>${formula(item.dU)}</div>
          <div><label>Q</label>${formula(item.q)}</div>
          <div><label>L</label>${formula(item.l)}</div>
        </div>
      </article>`).join('')}</div>
    </article>`;
  }

  function mentalMapMarkup() {
    if (!content?.summary) {
      return `<div class="placeholder-card"><b>Mapa mental listo para completar</b><p>Este espacio queda reservado para conexiones entre conceptos, fórmulas y tipos de ejercicio.</p></div>`;
    }
    const s = content.summary;
    const transformations = s.transformations || [];
    return `<article class="topic-card mental-map-card">
      <span>MAPA MENTAL</span>
      <h3>${esc(s.title)}</h3>
      <div class="mental-map-root"><b>Primer principio</b><small>${formula('\\Delta U=Q+L', false)}</small></div>
      <div class="mental-map-grid">
        ${transformations.map(item => `<div class="mental-map-node"><b>${esc(item.name)}</b><span>${esc(item.rule)}</span><small>ΔU · Q · L</small></div>`).join('')}
      </div>
      <p class="mental-map-note">Usalo como hoja de ruta: primero identificá qué variable permanece constante y después elegí las expresiones de ΔU, Q y L.</p>
    </article>`;
  }

  function exerciseMarkup() {
    if (!content?.exercises?.length) {
      return `<div class="placeholder-card"><b>Ejercicios</b><p>Las guías, problemas y resoluciones paso a paso se van a agregar acá, manteniendo la numeración original del material.</p></div>`;
    }
    return `<div class="exercise-list">${content.exercises.map(exercise => `<details class="exercise-item" data-searchable>
      <summary><span class="exercise-number">${exercise.n}</span><span class="exercise-copy"><small>Ejercicio ${exercise.n}</small><b>${esc(exercise.title)}</b></span><span class="exercise-chevron">›</span></summary>
      <div class="exercise-body"><p>${esc(exercise.statement)}</p>${exercise.parts?.length ? `<ol>${exercise.parts.map(part => `<li>${esc(part)}</li>`).join('')}</ol>` : ''}${exercise.diagram === 'pv-abc' ? pvDiagram() : ''}<div class="solution-placeholder"><b>Resolución</b><span>La consigna ya está separada del bloque de resolución. Cuando carguemos la resolución desarrollada, va a aparecer acá sin alterar el enunciado.</span></div></div>
    </details>`).join('')}</div>`;
  }

  function formulaSheetMarkup() {
    if (!content?.formulas?.length) {
      return `<small>HOJA DE FÓRMULAS</small><h3>${esc(subject?.name || 'Materia')}</h3><p>Queda fija al costado y se completa con las fórmulas de cada tema.</p><div class="formula-list"><div class="formula-item"><small>Próximamente</small><span>Sin fórmulas cargadas todavía.</span></div></div>`;
    }
    return `<small>HOJA DE FÓRMULAS</small><h3>${esc(subject.name)}</h3><p>Fórmulas del material cargado. Se mantienen visibles mientras recorrés la materia.</p><div class="formula-list">${content.formulas.map(item => `<div class="formula-item"><small>${esc(item.label)}</small>${formula(item.latex)}</div>`).join('')}</div>`;
  }

  function notFound() {
    app.className = '';
    app.innerHTML = `<main style="min-height:100vh;display:grid;place-items:center;padding:24px"><section class="placeholder-card" style="max-width:560px"><b>No encontré esta materia.</b><p>Volvé al plan y elegí una de las materias cargadas.</p><p style="margin-top:16px"><a class="back-plan" href="./?view=subjects">← Plan y materias</a></p></section></main>`;
  }

  function bindSearch() {
    const search = document.getElementById('subjectSearch');
    search?.addEventListener('input', event => {
      const query = event.target.value.trim().toLocaleLowerCase('es');
      const sections = [...document.querySelectorAll('.subject-main > .subject-section')];
      let visibleSections = 0;

      sections.forEach(section => {
        const exercises = [...section.querySelectorAll('.exercise-item[data-searchable]')];
        if (exercises.length && query) {
          let exerciseMatches = 0;
          exercises.forEach(node => {
            const match = node.textContent.toLocaleLowerCase('es').includes(query);
            node.classList.toggle('search-hidden', !match);
            if (match) exerciseMatches += 1;
          });
          const sectionOwnText = section.querySelector('.section-title')?.textContent?.toLocaleLowerCase('es') || '';
          const sectionMatch = exerciseMatches > 0 || sectionOwnText.includes(query);
          section.classList.toggle('search-hidden', !sectionMatch);
          if (sectionMatch) visibleSections += 1;
          return;
        }

        exercises.forEach(node => node.classList.remove('search-hidden'));
        const match = !query || section.textContent.toLocaleLowerCase('es').includes(query);
        section.classList.toggle('search-hidden', !match);
        if (match) visibleSections += 1;
      });

      document.getElementById('emptySearch')?.classList.toggle('show', Boolean(query) && visibleSections === 0);
    });
  }

  function render() {
    if (!subject) return notFound();
    document.title = `${subject.name} · 27xSOLved`;
    app.className = '';
    app.innerHTML = `<div class="subject-app">
      <header class="subject-topbar">
        <a class="subject-brand" href="./"><img src="./assets/brand/icon-192.png" alt="27xSOLved"><b>27x<span>SOLved</span></b></a>
        <a class="back-plan" href="./?view=subjects">← Plan y materias</a>
        <label class="subject-search">⌕<input id="subjectSearch" type="search" placeholder="Buscar dentro de la materia…"></label>
      </header>

      <section class="subject-hero">
        <div class="subject-hero-card">
          <div><small>${subject.year}.º año · ${esc(subject.kind)}</small><h1>${esc(subject.name)}</h1><p>${content ? esc(content.sourceNote || 'Primer bloque cargado.') : 'Esqueleto inicial listo para integrar apuntes, PDFs, guías y parciales.'}</p></div>
          <div class="subject-hero-mark">${esc(subject.letter)}</div>
        </div>
      </section>

      <div class="subject-layout">
        <nav class="subject-index" aria-label="Contenido de la materia">
          <small>CONTENIDO</small>
          <a href="#resumen"><span>01</span>Resumen</a>
          <a href="#mapa"><span>02</span>Mapa mental</a>
          <a href="#ejercicios"><span>03</span>Ejercicios</a>
          <a href="#parciales"><span>04</span>Parciales</a>
        </nav>

        <main class="subject-main" id="searchArea">
          <section class="subject-section" id="resumen" data-searchable>
            <div class="section-title"><div><small>01 · RESUMEN</small><h2>Resumen</h2></div><p>Teoría ordenada por unidades y temas.</p></div>
            ${summaryMarkup()}
          </section>

          <section class="subject-section" id="mapa" data-searchable>
            <div class="section-title"><div><small>02 · MAPA MENTAL</small><h2>Mapa mental</h2></div><p>Conexiones rápidas entre conceptos.</p></div>
            ${mentalMapMarkup()}
          </section>

          <section class="subject-section" id="ejercicios">
            <div class="section-title"><div><small>03 · EJERCICIOS</small><h2>Ejercicios</h2></div><p>Consignas primero; resoluciones separadas.</p></div>
            ${exerciseMarkup()}
          </section>

          <section class="subject-section" id="parciales" data-searchable>
            <div class="section-title"><div><small>04 · PARCIALES</small><h2>Parciales</h2></div><p>Modelos, parciales y práctica de evaluación.</p></div>
            <div class="evaluation-card"><b>Sección preparada</b><p>Acá van a quedar los parciales de la materia, con consignas y resoluciones organizadas por año o fecha cuando los agreguemos.</p></div>
          </section>
          <div class="empty-search" id="emptySearch">No encontré coincidencias dentro del material cargado.</div>
        </main>

        <aside class="formula-sheet" id="formulaSheet">${formulaSheetMarkup()}</aside>
      </div>
      <button class="formula-fab" id="formulaFab" type="button" aria-controls="formulaSheet" aria-expanded="false">ƒx Fórmulas</button>
      <footer class="subject-footer">27xSOLved · estructura académica 1.1.7 · proyecto educativo independiente.</footer>
    </div>`;

    const sheet = document.getElementById('formulaSheet');
    const fab = document.getElementById('formulaFab');
    fab?.addEventListener('click', () => {
      const open = sheet?.classList.toggle('open') || false;
      fab.setAttribute('aria-expanded', String(open));
    });

    bindSearch();
    renderMath();
  }

  applyTheme();
  render();
})();
