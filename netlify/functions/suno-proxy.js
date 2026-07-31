exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  try {
    const apiKey = process.env.SUNO_API_KEY;
    if (!apiKey) return { statusCode: 500, headers, body: JSON.stringify({error: 'SUNO_API_KEY nao configurada'}) };
    let body = {}; try { body = JSON.parse(event.body || '{}'); } catch {}
    let ideia = (body.lyrics || body.prompt || '').toString().trim();
    let letra = ideia;
    if (ideia.length > 5 && ideia.length < 500 &&!ideia.includes('[Verso')) {
      let ok = false;
      try {
        const oKey = process.env.OPENAI_API_KEY;
        if (oKey) {
          const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + oKey },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                { role: "system", content: "Você é compositor sertanejo sofrência. Transforme o TEMA curto em letra completa de 25 linhas com história, sem repetir a frase original. Estrutura: [Verso 1] [Pre-Refrão] [Refrão] [Verso 2] [Refrão] [Ponte]. Refrão forte, chiclete." },
                { role: "user", content: `Tema: ${ideia}` }
              ],
              temperature: 1.0, max_tokens: 1000
            })
          });
          const j = await r.json();
          if (j.choices && j.choices[0].message.content.length > 120) { letra = j.choices[0].message.content; ok = true; }
        }
      } catch (e) {}
      if (!ok) {
        letra = `[Verso 1]
${ideia}
Garrafas vazias na mesa, madrugada fria
Seu número na tela que eu não tive coragem
[Pré-Refrão]
Tentei ser forte, jurei que ia superar
Mas o peito aperta toda vez que lembro seu olhar
[Refrão]
Coração tá em luto, não aprendeu a te esquecer
Tô vivendo de lembrança, sem saber viver
Falta o teu abraço pra dor acalmar
Sem você por perto não sei recomeçar
[Verso 2]
Os vizinhos já sabem da minha solidão
Choro alto no banheiro pra aliviar a paixão
Deixou perfume na roupa que eu não lavei
[Ponte]
Se o sol tá de luto é porque você partiu
Levou minha luz, meu riso, tudo que eu senti`;
      }
    }
    const payload = { prompt: letra.slice(0,2800), style: body.style || 'sertanejo sofrencia emocional', title: body.title || 'Minha Musica', customMode: true, instrumental: false, model: 'V4_5', callBackUrl: 'https://api.sunoapi.org/api/callback', wait_audio: false };
    const res = await fetch('https://api.sunoapi.org/api/v1/generate', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey }, body: JSON.stringify(payload) });
    const text = await res.text();
    return { statusCode: res.status, headers, body: text };
  } catch (e) { return { statusCode: 500, headers, body: JSON.stringify({error: e.message}) }; }
};
