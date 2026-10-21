// 27xSOLved · Solcito de fondo elegido en el simulador (21/10/2026).
// Sólo Inicio, Calendario y Ajustes. No interfiere con botones ni formularios.
(()=>{'use strict';
const SETTINGS={size:55,speed:289,opacity:.83,rotation:240,trail:true};
const VIEWS=new Set(['home','plan','subjects','calendar','settings']);
let canvas=null,ctx=null,host=null,raf=0,last=0,x=28,y=38,vx:Math.SQRT1_2,vy:Math.SQRT1_2,angle=0,trail=[];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function stop(){if(raf)cancelAnimationFrame(raf);raf=0;last=0;if(canvas){canvas.remove();canvas=null}ctx=null;host=null;trail=[]}
function setup(){
 const view=document.documentElement.dataset.view;
 const target=VIEWS.has(view)?document.querySelector('#app.appShell .main > main.content'):null;
 if(!target||reduced.matches||document.hidden){stop();return}
 if(target===host&&canvas?.isConnected)return;
 stop();host=target;canvas=document.createElement('canvas');canvas.className='et27-bouncing-sun';canvas.setAttribute('aria-hidden','true');
 host.prepend(canvas);ctx=canvas.getContext('2d');if(!ctx){stop();return}
 x=28;y=38;vx=Math.SQRT1_2;vy=Math.SQRT1_2;angle=0;trail=[];raf=requestAnimationFrame(frame)
}
function resize(){
 const w=Math.max(1,host.clientWidth),h=Math.max(1,Math.min(window.innerHeight-72,host.clientHeight||window.innerHeight));
 const ratio=Math.min(devicePixelRatio||1,1.5);
 const cw=Math.round(w*ratio),ch=Math.round(h*ratio);
 if(canvas.width!==cw||canvas.height!==ch){canvas.width=cw;canvas.height=ch;canvas.style.width=w+'px';canvas.style.height=h+'px'}
 ctx.setTransform(ratio,0,0,ratio,0,0);
 return{w,h}
}
function drawSun(){
 const r=SETTINGS.size/2;
 ctx.save();ctx.translate(x+r,y+r);ctx.rotate(angle);ctx.globalAlpha=SETTINGS.opacity;
 ctx.strokeStyle='#F2AA2C';ctx.lineWidth=3.85;ctx.lineCap='round';
 for(let i=0;i<10;i++){const a=i*Math.PI/5;ctx.beginPath();ctx.moveTo(Math.cos(a)*19,Math.sin(a)*19);ctx.lineTo(Math.cos(a)*25,Math.sin(a)*25);ctx.stroke()}
 ctx.beginPath();ctx.arc(0,0,16.5,0,Math.PI*2);ctx.fillStyle='#FFD95D';ctx.fill();
 ctx.fillStyle='#85501D';ctx.beginPath();ctx.arc(-5.5,-2.8,1.7,0,Math.PI*2);ctx.arc(5.5,-2.8,1.7,0,Math.PI*2);ctx.fill();
 ctx.beginPath();ctx.strokeStyle='#85501D';ctx.lineWidth=2;ctx.arc(0,1.2,8,0.18*Math.PI,0.82*Math.PI);ctx.stroke();
 ctx.restore()
}
function frame(time){
 if(!canvas?.isConnected||!host?.isConnected||!VIEWS.has(document.documentElement.dataset.view)||reduced.matches||document.hidden){stop();return}
 const {w,h}=resize(),dt=last?Math.min((time-last)/1000,.05):0;last=time;
 const maxX=Math.max(0,w-SETTINGS.size),maxY=Math.max(0,h-SETTINGS.size);
 x+=vx*SETTINGS.speed*dt;y+=vy*SETTINGS.speed*dt;
 if(x<0){x=-x;vx=Math.abs(vx)}else if(x>maxX){x=2*maxX-x;vx=-Math.abs(vx)}
 if(y<0){y=-y;vy=Math.abs(vy)}else if(y>maxY){y=2*maxY-y;vy=-Math.abs(vy)}
 x=Math.max(0,Math.min(maxX,x));y=Math.max(0,Math.min(maxY,y));
 angle+=SETTINGS.rotation*Math.PI/180*dt;
 if(SETTINGS.trail&&dt){trail.push({x:x+27.5,y:y+27.5,life:1});if(trail.length>22)trail.shift()}
 ctx.clearRect(0,0,w,h);
 trail=trail.filter(t=>(t.life-=dt*2.3)>0);
 for(const t of trail){ctx.beginPath();ctx.fillStyle='rgba(249,198,78,'+(t.life*.18)+')';ctx.arc(t.x,t.y,3.1*t.life,0,Math.PI*2);ctx.fill()}
 drawSun();raf=requestAnimationFrame(frame)
}
let pending=false;
const observer=new MutationObserver(()=>{if(pending)return;pending=true;queueMicrotask(()=>{pending=false;setup()})});
function start(){observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-view']});const root=document.querySelector('#app')||document.body;observer.observe(root,{childList:true,subtree:false});window.addEventListener('27x:rendered',setup);setup()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
document.addEventListener('visibilitychange',setup);reduced.addEventListener?.('change',setup);
})();