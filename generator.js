// VMIA - GENERATOR 55 ESTILOS - V2 CORRIGIDO
const estilosMusicais = [
"Sertanejo Sofrência","Sertanejo Universitário","Sertanejo Acústico","Modão Bruto",
"Forró Romântico","Piseiro Apaixonado","Arrocha Sofrência","Melodia Funk de Brega",
"Pagode anos 90","Pagodão Baiano","Samba Romântico","MPB Acústica","MPB Pop",
"Pop Nacional","Hino Pop 2025","Trap Funk","Funk Consciente","Melodia Funk 150 BPM",
"Funk Mandelão","Hip Hop Boombap","R&B Soul","Reggaeton Latino","Raízes do Reggae",
"Axé Verão","Adoração do Evangelho","Evangelho Pentecostal","Lo-fi Chill",
"Lo-fi Sertanejo","Acústico Voz e Violão","Rock Nacional","Rock Balada","Emo Trap",
"K-Pop Brasil","Bachata Romanda","Salsa Caliente","Pop Rock 2000","Indie Folk",
"Indie Pop","Casa Eletrônica","Festival de EDM","Deriva Phonk","Jazz Noturno",
"Lamento do Blues","Vaquejada","Forró","Brega Recife","Sertanejo Pisadinha",
"Funk 150 Romântico","Pop Sertanejo","Bossa Nova","Gospel","Romântico",
"Estilo Gaúcho","Violão Solo","Bandinhas do Sul"
];
let estiloSelecionado = "";
let vozSelecionada = "padrao";

function renderizarEstilos(lista){
 const container=document.getElementById("styles-container");
 if(!container) return;
 container.innerHTML="";
 lista.forEach(estilo=>{
   const btn=document.createElement("button");
   btn.className="style-item-btn";
   btn.innerText=estilo;
   if(estilo===estiloSelecionado) btn.classList.add("selected");
   btn.addEventListener("click",()=>selecionarEstilo(btn,estilo));
   container.appendChild(btn);
 });
}
function filterStyles(){
 const termo=(document.getElementById("search-style")?.value||"").toLowerCase();
 const filtrados=estilosMusicais.filter(e=>e.toLowerCase().includes(termo));
 renderizarEstilos(filtrados);
}
function selecionarEstilo(el,nome){
 document.querySelectorAll(".style-item-btn").forEach(b=>b.classList.remove("selected"));
 el.classList.add("selected");
 estiloSelecionado=nome;
 const cur=document.getElementById("current-style");
 if(cur) cur.innerText=nome;
 const genre=document.getElementById("player-track-genre");
 if(genre) genre.innerText="Gênero: "+nome;
}
function updateBPM(v){const b=document.getElementById("bpm-val");if(b) b.innerText=v;}
function selectVoice(card,tipo){
 document.querySelectorAll(".voice-card").forEach(c=>c.classList.remove("active"));
 card.classList.add("active");
 vozSelecionada=tipo;
}
function generateAutoTitle(){
 const letra=document.getElementById("lyrics-input")?.value.trim()||"";
 const ideia=document.getElementById("idea-input")?.value.trim()||"";
 if(!letra && !ideia){alert("Digite uma letra ou ideia primeiro para gerar título");return;}
 const base = letra.split(" ").slice(0,3).join(" ") || ideia.split(" ").slice(0,3).join(" ") || "Amor de Verão";
 const input=document.getElementById("track-title-input");
 if(input) input.value = base.charAt(0).toUpperCase()+base.slice(1)+" - "+(estiloSelecionado||"Hit");
}
async function triggerMusicGeneration(){
 const titulo=document.getElementById("track-title-input")?.value.trim()||"";
 const ideia=document.getElementById("idea-input")?.value.trim()||"";
 const letra=document.getElementById("lyrics-input")?.value.trim()||"";
 const bpm=document.getElementById("bpm-slider")?.value||"90";
 if(!titulo || !estiloSelecionado){
   alert("⚠ Digite um TÍTULO e selecione um ESTILO.");
   return;
 }
 const statusAlt=document.getElementById("alt-track-status");
 const btn=document.getElementById("btn-generate");
 if(btn){btn.disabled=true; btn.innerText="⏳ Gerando...";}
 if(statusAlt){statusAlt.className="status-box loading"; statusAlt.innerHTML=`✨ Processando <b>${estiloSelecionado}</b> - ${titulo}<br><small style="color:#777">${bpm} BPM • Voz ${vozSelecionada}</small>`;}
 console.log("VMIA ENGINE",{titulo, estilo:estiloSelecionado, ideia, letra, bpm, voz:vozSelecionada});
 await new Promise(r=>setTimeout(r,2200));
 const playerTitle=document.getElementById("player-track-title");
 if(playerTitle) playerTitle.innerText=titulo;
 if(statusAlt){statusAlt.className="status-box"; statusAlt.style.color="#FFD700"; statusAlt.innerHTML=`✅ <b>${titulo}</b> gerada com sucesso!<br><small style="color:#777">Tocando no player abaixo</small>`;}
 const prog=document.getElementById("progress-current");
 if(prog) prog.style.width="0%";
 setTimeout(()=>{if(prog) prog.style.width="35%";},200);
 if(btn){btn.disabled=false; btn.innerText="✨ Gerar Música com IA";}
 document.getElementById("btn-play").innerText="⏸";
}

// init
document.addEventListener("DOMContentLoaded",()=>{
 renderizarEstilos(estilosMusicais);
 document.getElementById("search-style")?.addEventListener("input",filterStyles);
 document.getElementById("bpm-slider")?.addEventListener("input",(e)=>updateBPM(e.target.value));
 document.querySelectorAll(".voice-card").forEach(card=>{
   card.addEventListener("click",()=>selectVoice(card,card.dataset.voice));
 });
 document.getElementById("btn-gen-title")?.addEventListener("click",generateAutoTitle);
 document.getElementById("btn-generate")?.addEventListener("click",triggerMusicGeneration);
});
