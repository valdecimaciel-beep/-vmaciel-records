// LÓGICA DE AUTENTICAÇÃO - VM IA
let isLoginMode = false;

function toggleAuthMode(e) {
    if (e) e.preventDefault();
    isLoginMode = !isLoginMode;
    
    const elements = {
        title: document.getElementById("auth-title"),
        subtitle: document.getElementById("auth-subtitle"),
        btn: document.getElementById("btn-submit-auth"),
        desc: document.getElementById("auth-toggle-desc"),
        link: document.getElementById("auth-toggle-link")
    };

    if (elements.title) elements.title.innerText = isLoginMode ? "Fazer Login" : "Criar sua conta";
    if (elements.subtitle) elements.subtitle.innerText = isLoginMode ? "Entre para acessar seus projetos." : "Comece a gerar faixas profissionais hoje.";
    if (elements.btn) elements.btn.innerText = isLoginMode ? "Entrar" : "Criar Conta";
    if (elements.desc) elements.desc.innerText = isLoginMode ? "Não tem uma conta?" : "Já tem uma conta?";
    if (elements.link) elements.link.innerText = isLoginMode ? "Cadastre-se" : "Fazer Login";
}

document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.querySelector(".auth-form");
    const toggleLink = document.getElementById("auth-toggle-link");

    if (toggleLink) toggleLink.addEventListener("click", toggleAuthMode);

    if (authForm) {
        authForm.addEventListener("submit", async function(e) {
            e.preventDefault();
            
            const email = document.getElementById("email")?.value;
            const password = document.getElementById("password")?.value;
            const btn = document.getElementById("btn-submit-auth");
            
            if (!email || !password || !btn || !window.supabase) return;
            
            btn.disabled = true;
            const originalText = btn.innerText;
            btn.innerText = "Aguarde...";

            try {
                if (isLoginMode) {
                    const { data, error } = await window.supabase.auth.signInWithPassword({ email, password });
                    if (error) throw error;
                    window.location.href = "criacao.html"; 
                } else {
                    const { data, error } = await window.supabase.auth.signUp({
                        email,
                        password,
                        options: { emailRedirectTo: window.location.origin + '/pages/criacao.html' }
                    });
                    if (error) throw error;
                    alert("Conta criada! Verifique seu e-mail para confirmar.");
                    toggleAuthMode(e);
                }
            } catch (error) {
                alert("Erro: " + error.message);
            } finally {
                btn.disabled = false;
                btn.innerText = originalText;
            }
        });
    }
});
