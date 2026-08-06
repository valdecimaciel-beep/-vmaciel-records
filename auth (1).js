// LÓGICA DE CADASTRO E LOGIN - CORRIGIDO E LIMPO
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
        const btn = document.getElementById("btn-submit-auth");
        
        btn.disabled = true;
        const originalText = btn.innerText;
        btn.innerText = "Aguarde...";

        try {
            if (isLoginMode) {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                window.location.href = "criacao.html";
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { 
                        emailRedirectTo: window.location.origin + '/criacao.html' 
                    }
                });
                if (error) throw error;
                alert("Conta criada! Verifique seu e-mail para confirmar.");
                toggleAuthMode(e);
            }
        } catch (error) {
            alert("Erro: " + error.message);
        } finally {
            btn.disabled = false;
            btn.innerText = isLoginMode ? "Entrar" : "Criar Conta";
        }
    });
}
