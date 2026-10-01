const T={es:{n1:"Recorrido",n2:"Instalaciones",n3:"Membresías",n4:"Lugar",n5:"Contacto",lt:"Dónde estamos",la:"Calle Principal 123, Tu Ciudad",lh:"Lunes a viernes 5:00 a 22:00. Sábados 6:00 a 20:00. Domingos 7:00 a 14:00.",lmap:"Cómo llegar",ct:"Escríbenos",cta:"Inscríbete hoy",h1:"Entrena como un titán.",h1p:"Pesas, cardio, clases y vestidores premium en un solo lugar. Tu primera semana empieza hoy.",hint:"Explora",
gt:"Conoce cada espacio antes de entrar",pt:"Elige tu membresía",ft:"Tu mejor versión empieza en la puerta.",
checkout:{eyebrow:"Inscripción TITAN FITNESS",title:"Elige tu siguiente nivel.",selected:"Plan seleccionado",nameLabel:"Nombre completo",emailLabel:"Correo electrónico",phoneLabel:"Teléfono",planLabel:"Membresía",submit:"Confirmar inscripción",closeLabel:"Cerrar",networkError:"No se pudo conectar con el servidor. Por favor, inténtalo de nuevo.",plans:["Básica ($19/mes)","Pro ($39/mes) · Recomendada","VIP ($69/mes)","Dúo ($59/mes)"]},
r0:["Entrada","Recepción y acceso, abierto hasta tarde."],r1:["Pesas","Mancuernas, racks y bancos para cada nivel."],r2:["Cardio","Caminadoras y elípticas frente a la ciudad."],r3:["Funcional","Kettlebells, cuerdas y cajas para entrenar fuerte."],r4:["Clases","Sesiones guiadas con música y luces."],r5:["Vestidores","Casilleros amplios y espacio para recuperarte."],
s:["Entrenador personal","Fuerza","Zona de pesas","Recepción","Mancuernas","Cardio","Zona funcional","Clases grupales","Vestidores"],mes:"/mes",
p:[["Básica",19,["Acceso a zona de pesas","Zona de cardio","Vestidores y casilleros"]],["Pro",39,["Todo lo de Básica","Clases grupales ilimitadas","Zona funcional","Plan de entrenamiento"]],["VIP",69,["Todo lo de Pro","Entrenador personal 4 sesiones/mes","Invitado gratis cada semana","Acceso 24 horas"]],["Dúo",59,["Todo lo de Pro para 2 personas","Entrenan juntos y pagan menos","Clases grupales ilimitadas"]]]},
en:{n1:"Tour",n2:"Facilities",n3:"Memberships",n4:"Location",n5:"Contact",lt:"Find us",la:"123 Main Street, Your City",lh:"Mon to Fri 5:00 to 22:00. Sat 6:00 to 20:00. Sun 7:00 to 14:00.",lmap:"Get directions",ct:"Contact us",cta:"Join today",h1:"Train like a titan.",h1p:"Weights, cardio, classes and premium locker rooms in one place. Your first week starts today.",hint:"Explore",
gt:"See every space before you walk in",pt:"Choose your membership",ft:"Your best self starts at the door.",
checkout:{eyebrow:"TITAN FITNESS registration",title:"Choose your next level.",selected:"Selected plan",nameLabel:"Full name",emailLabel:"Email address",phoneLabel:"Phone number",planLabel:"Membership plan",submit:"Confirm & Register",closeLabel:"Close",networkError:"Could not connect to server. Please try again.",plans:["Basic ($19/mo)","Pro ($39/mo) · Recommended","VIP ($69/mo)","Duo ($59/mo)"]},
r0:["Entrance","Reception and access, open late."],r1:["Weights","Dumbbells, racks and benches for every level."],r2:["Cardio","Treadmills and ellipticals facing the city."],r3:["Functional","Kettlebells, ropes and boxes for hard training."],r4:["Classes","Guided sessions with music and lights."],r5:["Locker rooms","Roomy lockers and space to recover."],
s:["Personal training","Strength","Weights area","Reception","Dumbbells","Cardio","Functional area","Group classes","Locker rooms"],mes:"/month",
p:[["Basic",19,["Weights area access","Cardio area","Locker rooms and lockers"]],["Pro",39,["Everything in Basic","Unlimited group classes","Functional area","Training plan"]],["VIP",69,["Everything in Pro","Personal training, 4 sessions/month","Free guest every week","24-hour access"]],["Duo",59,["Everything in Pro for 2 people","Train together, pay less","Unlimited group classes"]]]}};
let lang='es';try{lang=localStorage.getItem('lang')||'es'}catch(e){}
const $=s=>document.querySelector(s),img='assets/img/';
/* Recorrido: cada capa es una sala. Para cambiar el video o una imagen, edita esta lista. */
const L=['galeria-recepcion','galeria-mancuernas','galeria-cardio','galeria-funcional','galeria-clases','galeria-vestidores'].map(i=>({i:i+'.jpg'}));
const G=['galeria-entrenador','atleta-barra-tiza','sala-pesas-atleta','galeria-recepcion','galeria-mancuernas','galeria-cardio','galeria-funcional','galeria-clases','galeria-vestidores'];
const N=L.length,layers=$('#layers'),rooms=$('#rooms'),els=[];
L.forEach((l,k)=>{const d=document.createElement('div');d.className='layer';
 {const i=new Image();i.src=img+l.i;i.alt='';d.append(i)}
 layers.append(d);els.push(d);const li=document.createElement('li'),b=document.createElement('button');b.onclick=()=>goTo(k);li.append(b);rooms.append(li)});
function goTo(k){const t=$('#recorrido');scrollTo({top:t.offsetTop+(k+.15)/N*(t.offsetHeight-innerHeight),behavior:'smooth'})}
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
let target=0,cur=0,lastT=-1,act=-1;
function progress(){const t=$('#recorrido'),r=t.getBoundingClientRect();return Math.min(1,Math.max(0,-r.top/(t.offsetHeight-innerHeight)))}
function ramp(d){return d<-.3?0:d<0?(d+.3)/.3:d<.7?1:d<1?1-(d-.7)/.3:0}
function frame(){target=progress();cur+=(target-cur)*(reduce?1:.07);
 const p=Math.min(cur*N,N-.001);
 els.forEach((e,k)=>{const d=p-k,o=(k==N-1&&d>=0)?1:ramp(d);e.style.opacity=o;e.style.visibility=o?'visible':'hidden';
  e.style.transform=reduce?'none':`scale(${d>=0?1+.45*d:1+.25*d})`});
 const a=Math.min(N-1,Math.floor(p+.15));
 if(a!==act){act=a;[...rooms.children].forEach((c,k)=>c.classList.toggle('on',k===a));caption()}
 $('.hint').style.opacity=cur<.03?1:0;requestAnimationFrame(frame)}
function caption(){const c=T[lang]['r'+Math.max(0,act)];$('#capT').textContent=c[0];$('#capP').textContent=c[1]}
/* Idioma ES | EN */
function setLang(l){lang=l;try{localStorage.setItem('lang',l)}catch(e){}
 document.documentElement.lang=l;const t=T[l];
 document.querySelectorAll('[data-i]').forEach(e=>e.textContent=t[e.dataset.i]);
 document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===l));
 [...rooms.children].forEach((c,k)=>c.firstChild.textContent=t['r'+k][0]);
 document.querySelectorAll('.slide span').forEach((s,k)=>s.textContent=t.s[k]);
 document.querySelectorAll('[data-checkout]').forEach(e=>e.textContent=t.checkout[e.dataset.checkout]);
 document.querySelectorAll('[data-checkout-aria]').forEach(e=>e.setAttribute('aria-label',t.checkout[e.dataset.checkoutAria]));
 [...$('#registration-plan').options].forEach((o,k)=>o.textContent=t.checkout.plans[k]);
 $('#cards').innerHTML=t.p.map((p,k)=>`<article class="card${k==1?' pro':''}"><h3>${p[0]}</h3><div class="price">$${p[1]}<small> ${t.mes}</small></div><ul>${p[2].map(x=>`<li>${x}</li>`).join('')}</ul><a class="btn" href="#registration-modal" data-open-registration data-plan="${['basic','pro','vip','duo'][k]}">${t.cta}</a></article>`).join('');
 if(act>=0)caption()}
document.querySelectorAll('.lang button').forEach(b=>b.onclick=()=>setLang(b.dataset.l));
const checkout=$('#registration-modal'),checkoutForm=$('#registration-form'),planSelect=$('#registration-plan'),planSummary=$('#plan-summary');
let registrationTrigger=null,registrationTimer=null;
function updatePlanSummary(){const option=planSelect.options[planSelect.selectedIndex],price=[19,39,69,59][planSelect.selectedIndex];planSummary.textContent=`${option.textContent.split(' (')[0]} · $${price}${lang==='es'?'/mes':'/mo'}`}
function openRegistration(plan='pro',trigger){clearTimeout(registrationTimer);registrationTimer=null;registrationTrigger=trigger;planSelect.value=plan;updatePlanSummary();$('#checkout-status').textContent='';$('#checkout-status').hidden=true;$('#checkout-toast').textContent='';$('#checkout-toast').hidden=true;checkout.hidden=false;document.body.classList.add('checkout-open');checkout.querySelector('input').focus()}
function closeRegistration(){if(checkout.hidden)return;clearTimeout(registrationTimer);registrationTimer=null;checkout.hidden=true;document.body.classList.remove('checkout-open');if(registrationTrigger)registrationTrigger.focus()}
document.addEventListener('click',e=>{const trigger=e.target.closest('[data-open-registration]');if(trigger){e.preventDefault();openRegistration(trigger.dataset.plan,trigger)}else if(e.target===checkout||e.target.closest('[data-close-registration]'))closeRegistration()});
document.addEventListener('keydown',e=>{if(checkout.hidden)return;if(e.key==='Escape'){closeRegistration();return}if(e.key==='Tab'){const focusable=[...checkout.querySelectorAll('button,input,select')].filter(el=>!el.disabled);const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
planSelect.addEventListener('change',updatePlanSummary);
checkoutForm.addEventListener('submit',async e=>{
 e.preventDefault();
 if(!checkoutForm.reportValidity())return;
 const submitButton=checkoutForm.querySelector('[type="submit"]');
 const status=$('#checkout-status'),toast=$('#checkout-toast'),formData=new FormData(checkoutForm),selectedPlan=planSelect.value;
 formData.append('idioma',lang);submitButton.disabled=true;status.textContent='';status.hidden=true;toast.textContent='';toast.hidden=true;
 try{
  const response=await fetch('procesar_registro.php',{method:'POST',body:formData});
  const result=await response.json();
  if(!response.ok||result.status!=='success')throw new Error(result.message||T[lang].checkout.networkError);
  checkoutForm.reset();planSelect.value=selectedPlan;updatePlanSummary();toast.textContent=result.message;toast.hidden=false;
  registrationTimer=setTimeout(()=>{registrationTimer=null;closeRegistration()},2000);
 }catch(error){status.textContent=error instanceof TypeError||error instanceof SyntaxError?T[lang].checkout.networkError:(error.message||T[lang].checkout.networkError);status.hidden=false}
 finally{submitButton.disabled=false}
});
/* Carrusel */
const tr=$('#track'),dots=$('#dots');let cs=0,timer;
G.forEach((g,k)=>{tr.insertAdjacentHTML('beforeend',`<div class="slide"><img src="${img}${g}.jpg" alt="" loading="lazy"><span></span></div>`);
 const b=document.createElement('button');b.setAttribute('aria-label',k+1);b.onclick=()=>show(k);dots.append(b)});
function show(k){cs=(k+G.length)%G.length;tr.style.transform=`translateX(-${cs*100}%)`;[...dots.children].forEach((d,i)=>d.classList.toggle('on',i===cs));clearInterval(timer);timer=setInterval(()=>show(cs+1),5000)}
$('.prev').onclick=()=>show(cs-1);$('.next').onclick=()=>show(cs+1);$('#car').addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(cs-1);if(e.key==='ArrowRight')show(cs+1)});
let sx=null;$('#car').addEventListener('pointerdown',e=>sx=e.clientX);$('#car').addEventListener('pointerup',e=>{if(sx!==null&&Math.abs(e.clientX-sx)>40)show(cs+(e.clientX<sx?1:-1));sx=null});
if(!reduce)$('#car').addEventListener('pointerenter',()=>clearInterval(timer));$('#car').addEventListener('pointerleave',()=>show(cs));
setLang(lang);show(0);requestAnimationFrame(frame);
