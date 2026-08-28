// ET 27 · Física Aplicada — machete fijo de fórmulas para la vista Administrador.
// Se inyecta debajo del índice lateral únicamente dentro de Física Aplicada.
(function(){
  'use strict';

  const STYLE_ID='et27-physics-cheat-style';
  const RAIL_CLASS='physicsLeftRail';

  const groups=[
    {
      title:'Esenciales',
      items:[
        ['Tensión superficial',String.raw`\gamma=\frac{F}{L}`],
        ['Fuerza superficial',String.raw`F_{\gamma}=\gamma L`],
        ['Película · 2 caras',String.raw`F=2\gamma l`],
        ['Peso',String.raw`P=mg`],
        ['Masa',String.raw`m=\rho V`],
        ['Placa · volumen',String.raw`V=Ae`],
        ['Equilibrio de placa',String.raw`\rho Aeg=\gamma P`],
        ['Espesor máximo',String.raw`e_{\max}=\frac{\gamma P}{\rho Ag}`],
        ['Disco · atajo',String.raw`e_{\max}=\frac{4\gamma}{\rho gd}`],
        ['Energía superficial',String.raw`W=\gamma\,\Delta A`]
      ]
    },
    {
      title:'Geometría',
      items:[
        ['Cuadrado · perímetro',String.raw`P=4L`],
        ['Cuadrado · área',String.raw`A=L^2`],
        ['Rectángulo · perímetro',String.raw`P=2(a+b)`],
        ['Rectángulo · área',String.raw`A=ab`],
        ['Círculo · perímetro',String.raw`P=2\pi r=\pi d`],
        ['Círculo · área',String.raw`A=\pi r^2=\frac{\pi d^2}{4}`],
        ['Anillo · perímetro',String.raw`P=2\pi R_e+2\pi R_i`],
        ['Anillo · área',String.raw`A=\pi\left(R_e^2-R_i^2\right)`],
        ['Con agujero · perímetro',String.raw`P_T=P_{ext}+P_{int}`],
        ['Con agujero · área',String.raw`A_T=A_{ext}-A_{agujero}`],
        ['Prisma / placa',String.raw`V=A_{base}\,h`],
        ['Cilindro',String.raw`V=\pi r^2h`]
      ]
    },
    {
      title:'Capilaridad',
      items:[
        ['Ley de Jurin',String.raw`h=\frac{2\gamma\cos\theta}{\rho gr}`],
        ['Con diámetro',String.raw`h=\frac{4\gamma\cos\theta}{\rho gd}`],
        ['Despeje de ángulo',String.raw`\cos\theta=\frac{h\rho gr}{2\gamma}`],
        ['Despeje de radio',String.raw`r=\frac{2\gamma\cos\theta}{\rho gh}`],
        ['Mismo r y θ',String.raw`\frac{h_1}{h_2}=\frac{\gamma_1/\rho_1}{\gamma_2/\rho_2}`],
        ['Comparación de γ',String.raw`\gamma_2=\gamma_1\frac{h_2\rho_2}{h_1\rho_1}`]
      ]
    },
    {
      title:'Métodos y presión',
      items:[
        ['Du Noüy · longitud',String.raw`L\approx4\pi r`],
        ['Du Noüy · fuerza',String.raw`F\approx4\pi r\gamma`],
        ['Du Noüy · tensión',String.raw`\gamma\approx\frac{F}{4\pi r}`],
        ['Cuentagotas',String.raw`\gamma_x=\gamma_a\frac{\rho_x n_a}{\rho_a n_x}`],
        ['Gota · Laplace',String.raw`\Delta p=\frac{2\gamma}{r}`],
        ['Burbuja de jabón',String.raw`\Delta p=\frac{4\gamma}{r}`]
      ]
    },
    {
      title:'Error y unidades',
      items:[
        ['Error relativo',String.raw`e_{rel}=\frac{\Delta x}{x}`],
        ['Error porcentual',String.raw`e_{\%}=100\,e_{rel}`],
        ['Error absoluto',String.raw`\Delta x=e_{rel}\,x`],
        ['Cociente · máx.',String.raw`e_{F/L}\approx e_F+e_L`],
        ['Conversión γ',String.raw`1\,\mathrm{N/m}=1000\,\mathrm{dyn/cm}`],
        ['Fuerza',String.raw`1\,\mathrm{N}=10^5\,\mathrm{dyn}`],
        ['Trabajo CGS',String.raw`1\,\mathrm{erg}=10^{-7}\,\mathrm{J}`]
      ]
    }
  ];

  function addStyles(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .physicsLeftRail{
        position:sticky;top:88px;align-self:start;min-width:0;
        display:grid;grid-template-rows:auto minmax(0,1fr);gap:13px;
        max-height:calc(100vh - 104px);overflow:hidden;
      }
      .physicsLeftRail>.unitToc{
        position:static!important;top:auto!important;margin:0!important;padding:18px;
        background:var(--surface);border:1px solid var(--border);border-radius:20px;
        box-shadow:var(--shadow);max-height:none!important;overflow:visible!important;
      }
      .physicsLeftRail>.unitToc>b{display:block;padding:5px 10px 13px;color:var(--text);font-size:.82rem}
      .physicsLeftRail>.unitToc>div{display:grid;gap:3px;margin:0;overflow:visible}
      .physicsLeftRail>.unitToc button{
        display:grid;grid-template-columns:28px 1fr;gap:8px;align-items:start;width:100%;
        padding:9px 10px;border:0;border-radius:10px;background:transparent;color:var(--muted);
        text-align:left;white-space:normal;font:700 .84rem/1.25 Nunito,sans-serif;
      }
      .physicsLeftRail>.unitToc button span{color:var(--accent);font-size:.73rem}
      .physicsLeftRail>.unitToc button:hover,.physicsLeftRail>.unitToc button.active{
        background:color-mix(in srgb,var(--accent) 10%,var(--surface));color:var(--text)
      }
      .physicsLeftRail>.unitToc button.active{box-shadow:inset 3px 0 var(--accent)}
      .physicsFormulaCheat{
        min-height:0;overflow:auto;overscroll-behavior:contain;scrollbar-width:thin;
        padding:12px 11px 13px;border:1px solid color-mix(in srgb,var(--accent) 28%,var(--border));
        border-radius:20px;background:color-mix(in srgb,var(--surface) 97%,var(--accent));
        box-shadow:0 13px 36px rgba(18,64,61,.07);
      }
      .physicsCheatHead{
        position:sticky;top:-12px;z-index:2;margin:-12px -11px 8px;padding:12px 12px 9px;
        background:color-mix(in srgb,var(--surface) 97%,var(--accent));border-bottom:1px solid var(--border)
      }
      .physicsCheatHead span{display:block;color:var(--accent);font-size:.62rem;font-weight:950;letter-spacing:.14em;text-transform:uppercase}
      .physicsCheatHead b{display:block;margin-top:2px;font-size:.9rem;letter-spacing:-.015em}
      .physicsCheatHead small{display:block;margin-top:2px;color:var(--muted);font-size:.64rem;line-height:1.25}
      .physicsCheatGroup{padding:7px 2px 4px;border-top:1px solid var(--border)}
      .physicsCheatGroup:first-of-type{border-top:0;padding-top:2px}
      .physicsCheatGroup>strong{display:block;margin:0 3px 5px;color:var(--muted);font-size:.61rem;font-weight:950;letter-spacing:.11em;text-transform:uppercase}
      .physicsCheatItem{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:5px;align-items:center;padding:4px 3px;border-radius:8px}
      .physicsCheatItem:hover{background:color-mix(in srgb,var(--accent) 7%,var(--surface))}
      .physicsCheatItem>span{color:var(--muted);font-size:.61rem;font-weight:800;line-height:1.12}
      .physicsCheatMath{min-width:0;text-align:right;overflow:hidden;font-size:.73rem;color:var(--text)}
      .physicsCheatMath .katex{font-size:1em}
      :root[data-theme=dark] .physicsFormulaCheat{box-shadow:0 14px 34px rgba(0,0,0,.24)}
      @media(max-width:920px){
        .physicsLeftRail{position:static;display:block;max-height:none;overflow:visible}
        .physicsLeftRail>.unitToc{display:none!important;position:sticky!important;top:122px!important;z-index:11;max-height:55vh!important;overflow:auto!important;margin-bottom:16px!important}
        .physicsLeftRail>.unitToc.open{display:block!important}
        .physicsFormulaCheat{display:none}
      }
    `;
    document.head.appendChild(style);
  }

  function sheetHtml(){
    return `<section class="physicsFormulaCheat" aria-label="Machete fijo de fórmulas de Física Aplicada">
      <header class="physicsCheatHead">
        <span>ADMIN · MACHETE FIJO</span>
        <b>Fórmulas que usamos</b>
        <small>Geometría + tensión superficial + métodos</small>
      </header>
      ${groups.map(group=>`<div class="physicsCheatGroup"><strong>${group.title}</strong>${group.items.map(([label,latex])=>`<div class="physicsCheatItem"><span>${label}</span><div class="physicsCheatMath" data-cheat-latex="${encodeURIComponent(latex)}"></div></div>`).join('')}</div>`).join('')}
    </section>`;
  }

  function renderMath(root){
    if(!window.katex){setTimeout(()=>renderMath(root),80);return}
    root.querySelectorAll('[data-cheat-latex]').forEach(el=>{
      if(el.dataset.rendered)return;
      try{
        window.katex.render(decodeURIComponent(el.dataset.cheatLatex),el,{throwOnError:false,displayMode:false,strict:'ignore'});
        el.dataset.rendered='1';
      }catch(_err){}
    });
  }

  function isAdminPhysics(){
    const role=document.querySelector('.pill')?.textContent?.trim();
    const title=document.querySelector('.unitHero h1')?.textContent?.trim();
    return role==='Administrador'&&title==='Física Aplicada';
  }

  function inject(){
    addStyles();
    if(!isAdminPhysics())return;
    const layout=document.querySelector('.studyLayout');
    if(!layout||layout.querySelector(':scope > .'+RAIL_CLASS))return;
    const toc=layout.querySelector(':scope > .unitToc');
    if(!toc)return;
    const rail=document.createElement('aside');
    rail.className=RAIL_CLASS;
    layout.insertBefore(rail,toc);
    rail.appendChild(toc);
    rail.insertAdjacentHTML('beforeend',sheetHtml());
    renderMath(rail);
  }

  let queued=false;
  function schedule(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;inject()});
  }

  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);
  else schedule();
})();
