// DICIONÁRIO DE IDIOMAS DA LANDING PAGE
const translations = {
    pt: {
        current: "🇧🇷 PT | R$ BRL", home: "Início", features: "Recursos", pricing: "Planos", login: "Entrar",
        heroTitle: 'Crie, publique e lucre com suas músicas <span class="highlight">usando IA</span>',
        heroSubtitle: "A estrutura mais rápida e fácil para transformar suas ideias em faixas de alta qualidade.",
        btnStart: "Começar de Graça", pricingTitle: "Escolha o seu plano", badgePopular: "Popular",
        planFreeTitle: "Gratuito", planFreePrice: "R$ 0<span>/mês</span>", btnFree: "Começar",
        planProTitle: "Plano Pro", planProPrice: "R$ 29<span>/mês</span>", btnPro: "Assinar Pro",
        planStudioTitle: "Estúdio", planStudioPrice: "R$ 99<span>/mês</span>", btnStudio: "Contratar",
        fFree1: "5 músicas por mês", fFree2: "Qualidade padrão (MP3)", fFree3: "Uso não comercial",
        fPro1: "Músicas ilimitadas", fPro2: "Alta qualidade (WAV)", fPro3: "Direitos comerciais inclusos",
        fStudio1: "Acesso total via API", fStudio2: "Suporte prioritário 24/7", fStudio3: "Isolamento de faixas (Stems)",
        mainFeaturesTitle: "Por que criar com nossa IA?", fCardT1: "Geração Instantânea", fCardD1: "Crie músicas completas, arranjos e batidas exclusivas em menos de 30 segundos.", fCardT2: "100% Royalty-Free", fCardD2: "Todas as faixas geradas são livres de direitos autorais. Publique no Spotify ou YouTube sem problemas.", fCardT3: "Qualidade de Estúdio", fCardD3: "Exporte seus projetos em arquivos de alta fidelidade WAV com canais de áudio isolados.",
        fTerms: "Termos de Uso", fPrivacy: "Política de Privacidade", fCopy: "© 2026 MUV IA. Todos os direitos reservados."
    },
    en: {
        current: "🇺🇸 EN | $ USD", home: "Home", features: "Features", pricing: "Pricing", login: "Sign In",
        heroTitle: 'Create, publish and profit from your music <span class="highlight">using AI</span>',
        heroSubtitle: "The fastest and easiest framework to turn your ideas into high-quality tracks.",
        btnStart: "Start for Free", pricingTitle: "Choose your plan", badgePopular: "Popular",
        planFreeTitle: "Free", planFreePrice: "$ 0<span>/month</span>", btnFree: "Get Started",
        planProTitle: "Pro Plan", planProPrice: "$ 5.99<span>/month</span>", btnPro: "Subscribe Pro",
        planStudioTitle: "Studio", planStudioPrice: "$ 19.99<span>/month</span>", btnStudio: "Purchase",
        fFree1: "5 songs per month", fFree2: "Standard quality (MP3)", fFree3: "Non-commercial use",
        fPro1: "Unlimited songs", fPro2: "High quality (WAV)", fPro3: "Commercial rights included",
        fStudio1: "Full API Access", fStudio2: "24/7 priority support", fStudio3: "Track stems isolation",
        mainFeaturesTitle: "Why create with our AI?", fCardT1: "Instant Generation", fCardD1: "Create full songs, arrangements and unique beats in less than 30 seconds.", fCardT2: "100% Royalty-Free", fCardD2: "All generated tracks are copyright-free. Publish on Spotify or YouTube with no issues.", fCardT3: "Studio Quality", fCardD3: "Export your projects in high-fidelity WAV files with separated audio stems.",
        fTerms: "Terms of Service", fPrivacy: "Privacy Policy", fCopy: "© 2026 MUV IA. All rights reserved."
    },
    es: {
        current: "🇪🇸 ES | € EUR", home: "Inicio", features: "Características", pricing: "Precios", login: "Iniciar Sesión",
        heroTitle: 'Crea, publica y gana dinheiro con tu música <span class="highlight">con IA</span>',
        heroSubtitle: "La estructura más rápida y sencilla para transformar tus ideas en pistas de alta calidad.",
        btnStart: "Empezar Gratis", pricingTitle: "Elige tu plan", badgePopular: "Popular",
        planFreeTitle: "Gratis", planFreePrice: "€ 0<span>/mes</span>", btnFree: "Empezar",
        planProTitle: "Plan Pro", planProPrice: "€ 5.49<span>/mes</span>", btnPro: "Suscribirse Pro",
        planStudioTitle: "Estudio", planStudioPrice: "€ 18.49<span>/mes</span>", btnStudio: "Contratar",
        fFree1: "5 canciones al mes", fFree2: "Calidad estándar (MP3)", fFree3: "Uso no comercial",
        fPro1: "Canciones ilimitadas", fPro2: "Alta calidad (WAV)", fPro3: "Derechos comerciales incluidos",
        fStudio1: "Acceso completo a la API", fStudio2: "Soporte prioritario 24/7", fStudio3: "Aislamiento de pistas (Stems)",
        mainFeaturesTitle: "¿Por qué crear con nuestra IA?", fCardT1: "Generación Instantánea", fCardD1: "Crea canciones completas, arreglos y ritmos exclusivos en menos de 30 segundos.", fCardT2: "100% Libre de Regalías", fCardD2: "Todas las pistas generadas están libres de derechos de autor. Publica en Spotify o YouTube sin problemas.", fCardT3: "Calidad de Estudio", fCardD3: "Exporta tus projetos en archivos WAV de alta fidelidad con canales de audio aislados.",
        fTerms: "Términos de Uso", fPrivacy: "Política de Privacidad", fCopy: "© 2026 MUV IA. Todos los derechos reservados."
    },
    fr: {
        current: "🇫🇷 FR | € EUR", home: "Accueil", features: "Fonctionnalités", pricing: "Tarifs", login: "Connexion",
        heroTitle: 'Créez, publiez et gagnez de l\'argent avec votre musique <span class="highlight">via l\'IA</span>',
        heroSubtitle: "La structure la plus rapide et la plus simple pour transformer vos idées en morceaux de haute qualité.",
        btnStart: "Commencer Gratuitement", pricingTitle: "Choisissez votre forfait", badgePopular: "Populaire",
        planFreeTitle: "Gratuit", planFreePrice: "€ 0<span>/mois</span>", btnFree: "Commencer",
        planProTitle: "Forfait Pro", planProPrice: "€ 5.49<span>/mois</span>", btnPro: "S'abonner au Pro",
        planStudioTitle: "Studio", planStudioPrice: "€ 18.49<span>/mois</span>", btnStudio: "Acheter",
        fFree1: "5 chansons par mois", fFree2: "Qualité standard (MP3)", fFree3: "Usage non commercial",
        fPro1: "Chansons illimitées", fPro2: "Haute qualité (WAV)", fPro3: "Droits commerciaux inclus",
        fStudio1: "Accès complet à l'API", fStudio2: "Support prioritaire 24/7", fStudio3: "Isolation des pistes (Stems)",
        mainFeaturesTitle: "Pourquoi créer avec notre IA ?", fCardT1: "Génération Instantanée", fCardD1: "Créez des chansons complètes, des arrangements et des beats exclusifs en moins de 30 secondes.", fCardT2: "100% Libre de Droits", fCardD2: "Tous les morceaux générés sont libres de droits. Publiez sur Spotify ou YouTube sans problème.", fCardT3: "Qualité Studio", fCardD3: "Exportez vos projets dans des fichiers WAV haute fidélité avec des pistes audio isolées.",
        fTerms: "Conditions d'Utilisation", fPrivacy: "Politique de Confidentialité", fCopy: "© 2026 MUV IA. Tous droits réservés."
    }
};

function changeLanguage(lang) {
    if(!document.getElementById("active-lang")) return;
    document.getElementById("active-lang").innerText = translations[lang].current;
    document.getElementById("nav-home").innerText = translations[lang].home;
    document.getElementById("nav-features").innerText = translations[lang].features;
    document.getElementById("nav-pricing").innerText = translations[lang].pricing;
    document.getElementById("btn-login").innerText = translations[lang].login;
    document.getElementById("hero-title").innerHTML = translations[lang].heroTitle;
    document.getElementById("hero-subtitle").innerText = translations[lang].heroSubtitle;
    document.getElementById("btn-start").innerText = translations[lang].btnStart;
    document.getElementById("pricing-title").innerText = translations[lang].pricingTitle;
    document.getElementById("badge-popular").innerText = translations[lang].badgePopular;
    document.getElementById("plan-free-title").innerText = translations[lang].planFreeTitle;
    document.getElementById("plan-free-price").innerHTML = translations[lang].planFreePrice;
    document.getElementById("btn-free").innerText = translations[lang].btnFree;
    document.getElementById("plan-pro-title").innerText = translations[lang].planProTitle;
    document.getElementById("plan-pro-price").innerHTML = translations[lang].planProPrice;
    document.getElementById("btn-pro").innerText = translations[lang].btnPro;
    document.getElementById("plan-studio-title").innerText = translations[lang].planStudioTitle;
    document.getElementById("plan-studio-price").innerHTML = translations[lang].planStudioPrice;
    document.getElementById("btn-studio").innerText = translations[lang].btnStudio;
    document.getElementById("feat-free-1").innerText = translations[lang].fFree1;
    document.getElementById("feat-free-2").innerText = translations[lang].fFree2;
    document.getElementById("feat-free-3").innerText = translations[lang].fFree3;
    document.getElementById("feat-pro-1").innerText = translations[lang].fPro1;
    document.getElementById("feat-pro-2").innerText = translations[lang].fPro2;
    document.getElementById("feat-pro-3").innerText = translations[lang].fPro3;
    document.getElementById("feat-studio-1").innerText = translations[lang].fStudio1;
    document.getElementById("feat-studio-2").innerText = translations[lang].fStudio2;
    document.getElementById("feat-studio-3").innerText = translations[lang].fStudio3;
    document.getElementById("features-title").innerText = translations[lang].mainFeaturesTitle;
    document.getElementById("feat-card-title-1").innerText = translations[lang].fCardT1;
    document.getElementById("feat-card-desc-1").innerText = translations[lang].fCardD1;
    document.getElementById("feat-card-title-2").innerText = translations[lang].fCardT2;
    document.getElementById("feat-card-desc-2").innerText = translations[lang].fCardD2;
    document.getElementById("feat-card-title-3").innerText = translations[lang].fCardT3;
    document.getElementById("feat-card-desc-3").innerText = translations[lang].fCardD3;
    document.getElementById("footer-terms").innerText = translations[lang].fTerms;
    document.getElementById("footer-privacy").innerText = translations[lang].fPrivacy;
    document.getElementById("footer-copy").innerText = translations[lang].fCopy;
}

// LÓGICA DE CADASTRO E LOGIN (SUPABASE)
let isLoginMode = false;
function toggleAuthMode(e) {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    document.getElementById("auth-title").innerText = isLoginMode ? "Fazer Login" : "Criar sua conta";
    document.getElementById("auth-subtitle").innerText = isLoginMode ? "Entre para acessar seus projetos." : "Começa a gerar faixas profissionais hoje.";
    document.getElementById("btn-submit-auth").innerText = isLoginMode ? "Entrar" : "Criar Conta";
    document.getElementById("auth-toggle-desc").innerText = isLoginMode ? "Não tem uma conta?" : "Já tem uma conta?";
    document.getElementById("auth-toggle-link").innerText = isLoginMode ? "Cadastre-se" : "Fazer Login";
}

const authForm = document.querySelector(".auth-form");
if (authForm) {
    authForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        if (isLoginMode) {
            const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
            if (error) alert("Erro: " + error.message);
            else window.location.href = "criacao.html";
        } else {
            const { data, error } = await supabaseClient.auth.signUp({
                email, password,
                options: { emailRedirectTo: window.location.origin + '/criacao.html' }
            });
            if (error) alert("Erro: " + error.message);
            else alert("Conta criada! Confirme o link enviado para o seu e-mail.");
        }
    });
}

function toggleMenu(){ document.getElementById("sliding-menu")?.classList.toggle("open"); }
function handleLogout(){ supabaseClient.auth.signOut().then(()=> window.location.href='login.html'); }
