// script.js - VMACIEL STUDIO - FIREBASE REAL V3.0
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

console.log("✅ Firebase VMaciel Studio Conectado!");

function openLogin(){
 const m=document.getElementById("login-modal");
 if(m){ m.classList.add("open"); document.body.style.overflow="hidden"; }
}
function closeLogin(){
 const m=document.getElementById("login-modal");
 if(m){ m.classList.remove("open"); document.body.style.overflow=""; }
}
function changeLanguage(lang){
 const map={
   pt:{home:"Início",feat:"Recursos",pricing:"Planos",login:"Entrar"},
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

 // BOTÃO ENTRAR
 document.getElementById("btn-login")?.addEventListener("click", openLogin);
 document.getElementById("modal-close")?.addEventListener("click", closeLogin);
 document.getElementById("login-modal")?.addEventListener("click",(e)=>{ if(e.target.id==="login-modal") closeLogin(); });
 document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") closeLogin(); });

 // Planos abrem login
 document.querySelectorAll(".btn-open-login").forEach(b=>b.addEventListener("click", openLogin));

 // Hero scroll
 document.getElementById("btn-start")?.addEventListener("click",()=>{
   document.getElementById("generator")?.scrollIntoView({behavior:"smooth"});
 });

 // LOGIN COM EMAIL - REAL
 document.getElementById("btn-do-login")?.addEventListener("click", async ()=>{
   const email = document.getElementById("login-email")?.value.trim();
   const pass = document.getElementById("login-pass")?.value.trim();
   if(!email || !pass){ alert("Digite email e senha"); return; }
   const btn = document.getElementById("btn-do-login");
   btn.innerText = "Entrando...";
   btn.disabled = true;
   try{
     // Tenta logar, se não existe cria conta
     try{
       await signInWithEmailAndPassword(auth, email, pass);
     }catch(err){
       if(err.code === "auth/user-not-found" || err.code === "auth/invalid-credential"){
         await createUserWithEmailAndPassword(auth, email, pass);
       }else{ throw err; }
     }
     closeLogin();
   }catch(err){
     alert("Erro: " + err.message);
     btn.innerText = "Entrar";
     btn.disabled = false;
   }
 });

 // LOGIN COM GOOGLE - REAL
 document.getElementById("btn-google")?.addEventListener("click", async ()=>{
   try{
     await signInWithPopup(auth, provider);
     closeLogin();
   }catch(err){ alert("Erro Google: " + err.message); }
 });

 // ESTADO DO USUÁRIO
 onAuthStateChanged(auth, (user)=>{
   const btnLogin = document.getElementById("btn-login");
   if(user && btnLogin){
     btnLogin.innerText = user.displayName ? user.displayName.split(" ")[0] : user.email.split("@")[0];
     btnLogin.onclick = null;
     btnLogin.addEventListener("click", async (e)=>{
       e.preventDefault();
       if(confirm(`Sair da conta ${user.email}?`)){
         await signOut(auth);
         location.reload();
       }
     }, {once:true});
     console.log("Logado:", user.email);
   }
 });

 // Player
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
   const cur=document.getElementById("progress-current");
   if(cur) cur.style.width=pct+"%";
 });
});

// Torna funções globais para o HTML
window.openLogin = openLogin;
window.closeLogin = closeLogin;
window.changeLanguage = changeLanguage;
