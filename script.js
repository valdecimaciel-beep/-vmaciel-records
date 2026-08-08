// script.js - Login e Navegação V2.1
function openLogin(){
 const m=document.getElementById("login-modal");
 if(m){m.classList.add("open"); document.body.style.overflow="hidden";}
}
function closeLogin(){
 const m=document.getElementById("login-modal");
 if(m){m.classList.remove("open"); document.body.style.overflow="";}
}
function changeLanguage(lang){
 const map={
   pt:{home:"Início",feat:"Recursos",pricing:"Planos",login:"Entrar",heroTitle:"Crie, publique e lucre com suas músicas "},
   en:{home:"Home",feat:"Features",pricing:"Pricing",login:"Log in"},
   es:{home:"Inicio",feat:"Funciones",pricing:"Planes",login:"Entrar"},
   fr:{home:"Accueil",feat:"Fonctions",pricing:"Tarifs",login:"Connexion"}
 };
 const t=map[lang]||map.pt;
 const nh=document.getElementById("nav-home"); if(nh) nh.innerText=t.home;
 const nf=document.getElementById("nav-features"); if(nf) nf.innerText=t.feat;
 const np=document.getElementById("nav-pricing"); if(np) np.innerText=t.pricing;
 const bl=document.getElementById("btn-login"); if(bl) bl.innerText=t.login;
 const active=document.getElementById("active-lang");
 if(active){
   const flags={pt:"🇧🇷 PT | R$ BRL",en:"🇺🇸 EN | $ USD",es:"🇪🇸 ES | € EUR",fr:"🇫🇷 FR | € EUR"};
   active.innerText=flags[lang]||flags.pt;
 }
}

document.addEventListener("DOMContentLoaded",()=>{
 // login
 document.getElementById("btn-login")?.addEventListener("click",openLogin);
 document.getElementById("modal-close")?.addEventListener("click",closeLogin);
 document.getElementById("btn-do-login")?.addEventListener("click",()=>{
   alert("Login simulado - aqui entra sua integração com Firebase/Supabase");
   closeLogin();
 });
 document.getElementById("btn-google")?.addEventListener("click",()=>{
   alert("Google Login - integrar com Firebase Auth");
   closeLogin();
 });
 document.getElementById("login-modal")?.addEventListener("click",(e)=>{
   if(e.target.id==="login-modal") closeLogin();
 });
 document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") closeLogin(); });

 // todos os botões de planos abrem login
 document.querySelectorAll(".btn-open-login").forEach(b=>b.addEventListener("click",openLogin));

 // hero scroll
 document.getElementById("btn-start")?.addEventListener("click",()=>{
   document.getElementById("generator")?.scrollIntoView({behavior:"smooth"});
 });

 // player play
 let playing=false;
 document.getElementById("btn-play")?.addEventListener("click",function(){
   playing=!playing;
   this.innerText=playing?"⏸":"▶";
   const cover=document.getElementById("track-cover");
   if(cover) cover.style.transform=playing?"rotate(5deg) scale(1.05)":"";
 });
 document.getElementById("progress-bar")?.addEventListener("click",function(e){
   const rect=this.getBoundingClientRect();
   const pct=((e.clientX-rect.left)/rect.width)*100;
   document.getElementById("progress-current").style.width=pct+"%";
 });
});
