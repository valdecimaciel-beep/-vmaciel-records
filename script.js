// VM PROJECT - JS Final Completo - VM com Features
console.log('VM carregado');

const translations = {
    pt: {
        current: "🇧🇷 PT | R$ BRL", home: "Início", features: "Recursos", pricing: "Planos", login: "Entrar",
        heroTitle: 'Crie, publique e lucre com suas músicas <span class="highlight">usando IA</span>',
        heroSubtitle: "A estrutura mais rápida e fácil para transformar suas ideias em faixas de alta qualidade.",
        btnStart: "Começar de Graça", playerGenre: "Gênero: Lo-Fi", btnDownload: "Baixar MP3",
        pricingTitle: "Escolha o seu plano", badgePopular: "Popular",
        planFreeTitle: "Gratuito", planFreePrice: "R$ 0<span>/mês</span>", btnFree: "Começar",
        planProTitle: "Plano Pro", planProPrice: "R$ 29<span>/mês</span>", btnPro: "Assinar Pro",
        planStudioTitle: "Estúdio", planStudioPrice: "R$ 99<span>/mês</span>", btnStudio: "Contratar",
        fFree1: "5 músicas por mês", fFree2: "Qualidade padrão (MP3)", fFree3: "Uso não comercial",
        fPro1: "Músicas ilimitadas", fPro2: "Alta qualidade (WAV)", fPro3: "Direitos comerciais inclusos",
        fStudio1: "Acesso total via API", fStudio2: "Suporte prioritário 24/7", fStudio3: "Isolamento de faixas (Stems)",
        featuresTitle: "Por que criar com nossa IA?",
        featCard1Title: "Geração Instantânea", featCard1Desc: "Crie músicas completas, arranjos e batidas exclusivas em menos de 30 segundos.",
        featCard2Title: "100% Royalty-Free", featCard2Desc: "Todas as faixas geradas são livres de direitos autorais. Publique no Spotify ou YouTube sem problemas.",
        featCard3Title: "Qualidade de Estúdio", featCard3Desc: "Exporte seus projetos em arquivos de alta fidelidade WAV com canais de áudio isolados."
    },
    en: {
        current: "🇺🇸 EN | $ USD", home: "Home", features: "Features", pricing: "Pricing", login: "Sign In",
        heroTitle: 'Create, publish and profit from your music <span class="highlight">using AI</span>',
        heroSubtitle: "The fastest and easiest framework to turn your ideas into high-quality tracks.",
        btnStart: "Start for Free", playerGenre: "Genre: Lo-Fi", btnDownload: "Download MP3",
        pricingTitle: "Choose your plan", badgePopular: "Popular",
        planFreeTitle: "Free", planFreePrice: "$ 0<span>/month</span>", btnFree: "Get Started",
        planProTitle: "Pro Plan", planProPrice: "$ 5.99<span>/month</span>", btnPro: "Subscribe Pro",
        planStudioTitle: "Studio", planStudioPrice: "$ 19.99<span>/month</span>", btnStudio: "Purchase",
        fFree1: "5 songs per month", fFree2: "Standard quality (MP3)", fFree3: "Non-commercial use",
        fPro1: "Unlimited songs", fPro2: "High quality (WAV)", fPro3: "Commercial rights included",
        fStudio1: "Full API Access", fStudio2: "24/7 priority support", fStudio3: "Track stems isolation",
        featuresTitle: "Why create with our AI?",
        featCard1Title: "Instant Generation", featCard1Desc: "Create full songs, arrangements and exclusive beats in less than 30 seconds.",
        featCard2Title: "100% Royalty-Free", featCard2Desc: "All generated tracks are copyright-free. Publish on Spotify or YouTube without issues.",
        featCard3Title: "Studio Quality", featCard3Desc: "Export your projects in high-fidelity WAV files with isolated audio stems."
    },
    es: {
        current: "🇪🇸 ES | € EUR", home: "Inicio", features: "Características", pricing: "Precios", login: "Iniciar Sesión",
        heroTitle: 'Crea, publica y gana dinheiro con tu música <span class="highlight">con IA</span>',
        heroSubtitle: "La estructura más rápida y sencilla para transformar tus ideas en pistas de alta qualidade.",
        btnStart: "Empezar Gratis", playerGenre: "Género: Lo-Fi", btnDownload: "Descargar MP3",
        pricingTitle: "Elige tu plan", badgePopular: "Popular",
        planFreeTitle: "Gratis", planFreePrice: "€ 0<span>/mes</span>", btnFree: "Empezar",
        planProTitle: "Plan Pro", planProPrice: "€ 5.49<span>/mes</span>", btnPro: "Suscribirse Pro",
        planStudioTitle: "Estudio", planStudioPrice: "€ 18.49<span>/mes</span>", btnStudio: "Contratar",
        fFree1: "5 canciones al mes", fFree2: "Calidad estándar (MP3)", fFree3: "Uso não comercial",
        fPro1: "Canciones ilimitadas", fPro2: "Alta calidad (WAV)", fPro3: "Derechos comerciales incluidos",
        fStudio1: "Acceso completo a la API", fStudio2: "Soporte prioritario 24/7", fStudio3: "Aislamiento de pistas (Stems)",
        featuresTitle: "¿Por qué criar con nuestra IA?",
        featCard1Title: "Generación Instantánea", featCard1Desc: "Crea canciones completas, arreglos y beats exclusivos en menos de 30 segundos.",
        featCard2Title: "100% Libre de Regalías", featCard2Desc: "Todas las pistas generadas son libres de derechos. Publica en Spotify o YouTube sin problemas.",
        featCard3Title: "Calidad de Estudio", featCard3Desc: "Exporta tus proyectos en arquivos WAV de alta fidelidade con pistas aisladas."
    },
    fr: {
        current: "🇫🇷 FR | € EUR", home: "Accueil", features: "Fonctionnalités", pricing: "Tarifs", login: "Connexion",
        heroTitle: 'Créez, publiez et gagnez de l\'argent avec votre musique <span class="highlight">via l\'IA</span>',
        heroSubtitle: "La structure la plus rapide et la plus simple pour transformer vos idées en morceaux de haute qualité.",
        btnStart: "Commencer Gratuitement", playerGenre: "Genre: Lo-Fi", badgePopular: "Populaire",
        pricingTitle: "Choisissez votre forfait", btnDownload: "Télécharger MP3",
        planFreeTitle: "Gratuit", planFreePrice: "€ 0<span>/mois</span>", btnFree: "Commencer",
        planProTitle: "Forfait Pro", planProPrice: "€ 5.49<span>/mois</span>", btnPro: "S'abonner au Pro",
        planStudioTitle: "Studio", planStudioPrice: "€ 18.49<span>/mois</span>", btnStudio: "Acheter",
        fFree1: "5 chansons par mois", fFree2: "Qualité standard (MP3)", fFree3: "Usage non commercial",
        fPro1: "Chansons illimitées", fPro2: "Haute qualité (WAV)", fPro3: "Droits commerciaux inclus",
        fStudio1: "Accès complet à l'API", fStudio2: "Support prioritaire 24/7", fStudio3: "Isolation des pistes (Stems)",
        featuresTitle: "Pourquoi créer avec notre IA?",
        featCard1Title: "Génération Instantanée", featCard1Desc: "Créez des morceaux complets, des arrangements et des beats exclusifs en moins de 30 secondes.",
        featCard2Title: "100% Sans Redevance", featCard2Desc: "Toutes les pistes générées sont libres de droits. Publiez sur Spotify ou YouTube sans problème.",
        featCard3Title: "Qualité Studio", featCard3Desc: "Exportez vos projets en fichiers WAV haute fidélité avec pistes isolées."
    }
};

function changeLanguage(lang) {
    const t = translations[lang];
    if(!t) return;
    const setText = (id, value) => { const el = document.getElementById(id); if(el) el.innerText = value; };
    const setHTML = (id, value) => { const el = document.getElementById(id); if(el) el.innerHTML = value; };
    setText("active-lang", t.current);
    setText("nav-home", t.home);
    setText("nav-features", t.features);
    setText("nav-pricing", t.pricing);
    setText("btn-login", t.login);
    setHTML("hero-title", t.heroTitle);
    setText("hero-subtitle", t.heroSubtitle);
    setText("btn-start", t.btnStart);
    setText("player-track-genre", t.playerGenre);
    setText("btn-download", t.btnDownload);
    setText("pricing-title", t.pricingTitle);
    setText("badge-popular", t.badgePopular);
    setText("plan-free-title", t.planFreeTitle);
    setHTML("plan-free-price", t.planFreePrice);
    setText("btn-free", t.btnFree);
    setText("plan-pro-title", t.planProTitle);
    setHTML("plan-pro-price", t.planProPrice);
    setText("btn-pro", t.btnPro);
    setText("plan-studio-title", t.planStudioTitle);
    setHTML("plan-studio-price", t.planStudioPrice);
    setText("btn-studio", t.btnStudio);
    setText("feat-free-1", t.fFree1);
    setText("feat-free-2", t.fFree2);
    setText("feat-free-3", t.fFree3);
    setText("feat-pro-1", t.fPro1);
    setText("feat-pro-2", t.fPro2);
    setText("feat-pro-3", t.fPro3);
    setText("feat-studio-1", t.fStudio1);
}

// Configuração do clique do botão Entrar
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("btn-login");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            alert("Botão Entrar funcionando! Sistema de login pronto para integração.");
        });
    }
});
// ==========================================
// FUNÇÕES DO GERADOR DE MÚSICA (VM IA)
// ==========================================

function generateAutoTitle() {
    const titulos = ["Amor de Verão", "Batida do Futuro", "Cyber Sertanejo", "Eco do Grave", "Lofi da Madrugada"];
    const sorteado = titulos[Math.floor(Math.random() * titulos.length)];
    const input = document.getElementById("track-title-input");
    if(input) input.value = sorteado;
}

function filterStyles() {
    console.log("Filtrando estilos musicais...");
    // Função pronta para integração de busca
}

function selectVoice(elemento, tipoVoz) {
    const cards = document.querySelectorAll('.voice-card');
    cards.forEach(card => card.classList.remove('active'));
    elemento.classList.add('active');
    console.log("Voz selecionada:", tipoVoz);
}

function updateBPM(valor) {
    const bpmVal = document.getElementById("bpm-val");
    if(bpmVal) bpmVal.innerText = valor;
}

function triggerMusicGeneration() {
    const status = document.getElementById("alt-track-status");
    if(status) {
        status.style.color = "#FFD700";
        status.innerText = "✨ IA processando sua música... Aguarde 30 segundos.";
        setTimeout(() => {
            status.style.color = "#00FF00";
            status.innerText = "🎵 Música gerada com sucesso! Player atualizado.";
        }, 3000);
    }
}
