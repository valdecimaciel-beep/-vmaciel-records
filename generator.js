// VMIA - GENERATOR 55 ESTILOS - FINAL
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

document.addEventListener("DOMContentLoaded", () => {
    const c = document.getElementById("styles-container");
    if(c) renderizarEstilos(estilosMusicais);
});

function renderizarEstilos(lista){
    const container=document.getElementById("styles-container");
    if(!container) return;
    container.innerHTML="";
    lista.forEach(estilo=>{
        const btn=document.createElement("button");
        btn.className="style-item-btn";
        btn.innerText=estilo;
        if(estilo===estiloSelecionado) btn.classList.add("selected");
        btn.onclick=()=>selecionarEstilo(btn,estilo);
        container.appendChild(btn);
    });
}
function filterStyles(){
    const input=document.getElementById("search-style");
    if(!input) return;
    const termo=input.value.toLowerCase();
    const filtrados=estilosMusicais.filter(e=>e.toLowerCase().includes(termo));
    renderizarEstilos(filtrados);
}
function selecionarEstilo(el,nome){
    document.querySelectorAll(".style-item-btn").forEach(b=>b.classList.remove("selected"));
    el.classList.add("selected");
    estiloSelecionado=nome;
    const cur=document.getElementById("current-style");
    if(cur) cur.innerText=nome;
}
function toggleMenu(){
    const m=document.getElementById("sliding-menu");
    if(m) m.classList.toggle("open");
}
function toggleAccordion(id){
    const c=document.getElementById(id);
    if(c) c.classList.toggle("open");
}
function updateBPM(v){
    const b=document.getElementById("bpm-val");
    if(b) b.innerText=v;
}
function fillTitle(t){
    const i=document.getElementById("track-title-input");
    if(i) i.value=t;
}
function selectVoice(card,tipo){
    document.querySelectorAll(".voice-card").forEach(c=>c.classList.remove("active"));
    card.classList.add("active");
    vozSelecionada=tipo;
}
function triggerMusicGeneration(){
    const titulo=document.getElementById("track-title-input")?.value.trim()||"";
    const ideia=document.getElementById("idea-input")?.value.trim()||"";
    const letra=document.getElementById("lyrics-input")?.value.trim()||"";
    const motor=document.querySelector('input[name="v3-option"]:checked')?.value||"v3";
    const bpm=document.getElementById("bpm-slider")?.value||"90";
    if(!titulo || !estiloSelecionado){
        alert("⚠ ATENÇÃO: Digite um TÍTULO e selecione um ESTILO na lista de 55 estilos.");
        if(!titulo) document.getElementById("track-title-input").style.borderColor="#ff4a4a";
        if(!estiloSelecionado) document.querySelector(".selected-style-bar").style.borderColor="#ff4a4a";
        return;
    }
    document.getElementById("track-title-input").style.borderColor="#333";
    document.querySelector(".selected-style-bar").style.borderColor="#FFD700";
    const statusAlt=document.getElementById("alt-track-status");
    if(statusAlt) statusAlt.innerHTML=`<div style="color:#FFD700;font-weight:bold;width:100%;text-align:center;">✨ Processando ${estiloSelecionado} - ${titulo}...</div>`;
    console.log("🚀 VMIA ENGINE:",{titulo,estilo:estiloSelecionado,ideia,letra,bpm,motor,voz:vozSelecionada});
    const playerTitle=document.getElementById("player-track-title");
    if(playerTitle) playerTitle.innerText=titulo;
}
async function generateAutoTitle(){
    const letra=document.getElementById("lyrics-input")?.value||"";
    if(!letra.trim()){alert("Digite uma letra primeiro");return;}
    const input=document.getElementById("track-title-input");
    if(input) input.value="Nova Faixa "+estiloSelecionado;
}
