// script.js V5 - VMaciel Studio - FINAL COM IDIOMA E LOGIN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZveaL-4xKFL4K8NZcP0noc3nO7rx3otg",
  authDomain: "vmaciel-studio.firebaseapp.com",
  projectId: "vmaciel-studio",
  storageBucket: "vmaciel-studio.firebasestorage.app",
  messagingSenderId: "613960209117",
  appId: "1:613960209117:web:7ea74de3b8f76411614134",
  measurementId: "G-4VNL2WH326"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function openLogin(){
 const m=document.getElementById("login-modal");
 if(m){ m.classList.add("open"); document.body.style.overflow="hidden"; }
}
function closeLogin(){
 const m=document.getElementById("login-modal");
 if(m){ m.classList.remove("open"); document.body.style.overflow=""; }
}

// TRADUÇÃO COMPLETA RESTAURADA
function changeLanguage(lang){
 localStorage.setItem("vm_lang", lang);
 const dict={
   pt:{
     home:"Início", feat:"Recursos", pricing:"Planos", login:"Entrar",
     heroTitle1:"Crie, publique e lucre com suas", heroTitle2:"músicas usando IA",
     heroSub:"A estrutura mais rápida e fácil para transformar suas ideias em faixas de alta qualidade. Sem estúdio, sem limites.",
     cta:"Começar de Graça", ctaSub:"Sem cartão • 3 músicas grátis • MP3/WAV",
     langLabel:"🇧🇷 PT | R$ BRL"
   },
   en:{
     home:"Home", feat:"Features", pricing:"Pricing", login:"Log in",
     heroTitle1:"Create, publish and profit with your", heroTitle2:"music using AI",
     heroSub:"The fastest and easiest framework to turn your ideas into high-quality tracks. No studio, no limits.",
     cta:"Start for Free", ctaSub:"No card • 3 free tracks • MP3/WAV",
     langLabel:"🇺🇸 EN | $ USD"
   },
   es:{
     home:"Inicio", feat:"Funciones", pricing:"Planes", login:"Entrar",
     heroTitle1:"Crea, publica y gana con tu", heroTitle2:"música usando IA",
     heroSub:"La estructura más rápida y fácil para transformar tus ideas en pistas de alta calidad. Sin estudio, sin límites.",
     cta:"Empezar Gratis", ctaSub:"Sin tarjeta • 3 músicas gratis • MP3/WAV",
     langLabel:"🇪🇸 ES | € EUR"
   },
   fr:{
     home:"Accueil", feat:"Fonctions", pricing:"Tarifs", login:"Connexion",
     heroTitle1:"Créez, publiez et gagnez avec votre", heroTitle2:"musique avec l'IA",
     heroSub:"La structure la plus rapide et facile pour transformer vos idées en morceaux de haute qualité.",
     cta:"Commencer Gratuitement", ctaSub:"Sans carte • 3 musiques gratuites • MP3/WAV",
     langLabel:"🇫🇷 FR | € EUR"
   }
 };
 const t=dict[lang]||dict.pt;
 const setText=(id,val)=>{ const el=document.getElementById(id); if(el) el.innerText=val; };
 setText("nav-home", t.home);
 setText("nav-features", t.feat);
 setText("nav-pricing", t.pricing);
 // Mantém nome do usuário se logado, senão traduz botão
 const btnLogin=document.getElementById("btn-login");
 if(btnLogin && !btnLogin.dataset.logged){
   btnLogin.innerText=t.login;
 }
 const active=document.getElementById("active-lang");
 if(active) active.innerText=t.langLabel;

 // Hero
 const h1 = document.querySelector("h1");
 if(h1){
   // Recria o H1 com span amarelo
   h1.innerHTML = `${t.heroTitle1} <br><span style="color:#FFD700">${t.heroTitle2}</span>`;
 }
 const heroSubEl = document.querySelector(".hero p, .hero-subtitle, [data-i18n='heroSub']");
 if(heroSubEl) heroSubEl.innerText = t.heroSub;
 const ctaBtn = document.getElementById("btn-start");
 if(ctaBtn) ctaBtn.innerText = t.cta;
}

document.addEventListener("DOMContentLoaded",()=>{
 document.getElementById("btn-login")?.addEventListener("click", openLogin);
 document.getElementById("modal-close")?.addEventListener("click", closeLogin);
 document.getElementById("login-modal")?.addEventListener("click",(e)=>{ if(e.target.id==="login-modal") closeLogin(); });
 document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") closeLogin(); });
 document.querySelectorAll(".btn-open-login").forEach(b=>b.addEventListener("click", openLogin));
 document.getElementById("btn-start")?.addEventListener("click",()=>{
   document.getElementById("generator")?.scrollIntoView({behavior:"smooth"});
 });

 // Restaura idioma salvo
 const savedLang = localStorage.getItem("vm_lang") || "pt";
 changeLanguage(savedLang);

 // LOGIN EMAIL
 document.getElementById("btn-do-login")?.addEventListener("click", async ()=>{
   const email = document.getElementById("login-email")?.value.trim();
   const pass = document.getElementById("login-pass")?.value.trim();
   if(!email || !pass){ alert("Digite email e senha"); return; }
   const btn = document.getElementById("btn-do-login");
   btn.innerText = "Entrando..."; btn.disabled=true;
   try{
     try{ await signInWithEmailAndPassword(auth,email,pass); }
     catch(err){
       if(err.code==="auth/user-not-found"||err.code==="auth/invalid-credential"||err.code==="auth/invalid-login-credentials"){
         await createUserWithEmailAndPassword(auth,email,pass);
       }else throw err;
     }
     closeLogin();
   }catch(err){ alert("Erro: "+err.message); btn.innerText="Entrar"; btn.disabled=false; }
 });

 // LOGIN GOOGLE
 document.getElementById("btn-google")?.addEventListener("click", async ()=>{
   try{ await signInWithPopup(auth,provider); closeLogin(); }
   catch(err){ alert("Erro Google: "+err.message); }
 });

 // ESTADO LOGADO - AGORA COM DIFERENÇA VISUAL
 onAuthStateChanged(auth,(user)=>{
   const btnLogin=document.getElementById("btn-login");
   if(user && btnLogin){
     const name = user.displayName ? user.displayName.split(" ")[0] : user.email.split("@")[0];
     btnLogin.innerText=name;
     btnLogin.dataset.logged="1";
     btnLogin.style.borderColor="#FFD700";
     console.log("✅ Logado:",user.email);
     // Após logar, rola pro gerador automaticamente (só na primeira vez)
     if(!sessionStorage.getItem("scrolled")){
       setTimeout(()=>{
         document.getElementById("generator")?.scrollIntoView({behavior:"smooth"});
         sessionStorage.setItem("scrolled","1");
       },800);
     }
   }else if(btnLogin){
     delete btnLogin.dataset.logged;
     const lang = localStorage.getItem("vm_lang")||"pt";
     changeLanguage(lang);
   }
 });

 // Player
 let playing=false;
 document.getElementById("btn-play")?.addEventListener("click",function(){
   playing=!playing; this.innerText=playing?"⏸":"▶";
   const cover=document.getElementById("track-cover");
   if(cover) cover.style.transform=playing?"rotate(5deg) scale(1.05)":"";
 });
});

window.openLogin=openLogin;
window.closeLogin=closeLogin;
window.changeLanguage=changeLanguage;
