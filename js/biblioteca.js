// BIBLIOTECA DO USUÁRIO - VM IA (ÁREA LOGADA)
document.addEventListener("DOMContentLoaded", async () => {
    if (!window.supabase) return;

    // Verifica sessão ativa
    const { data: { session } } = await window.supabase.auth.getSession();
    if (!session) {
        window.location.href = "login.html";
        return;
    }

    const userId = session.user.id;
    carregarBiblioteca(userId);
});

async function carregarBiblioteca(userId) {
    try {
        // Busca as músicas salvas na tabela 'musicas' filtrando pelo ID do usuário
        const { data, error } = await window.supabase
            .from('musicas')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;

        console.log("Músicas carregadas com sucesso:", data);
        // Lógica visual para renderizar as músicas na tela (HTML) aqui abaixo
        
    } catch (error) {
        console.error("Erro ao carregar biblioteca:", error.message);
    }
}
