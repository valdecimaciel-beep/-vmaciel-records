exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  try {
    const apiKey = process.env.SUNO_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({error: 'SUNO_API_KEY nao configurada no Netlify'}) };
    }
    let body = {};
    try { body = JSON.parse(event.body || '{}'); } catch {}

    // ==========================================
    // PARTE NOVA - EXPANSOR AUTOMÁTICO
    // ==========================================
    let ideiaOriginal = (body.lyrics || body.prompt || '').toString();
    let letraParaUsar = ideiaOriginal;

    const precisaExpandir = ideiaOriginal.length > 10 && ideiaOriginal.length < 300 &&!ideiaOriginal.includes('[Verso') &&!ideiaOriginal.includes('[Refrão');

    if (precisaExpandir) {
      console.log('Ideia curta detectada, expandindo:', ideiaOriginal);
      try {
        const openaiKey = process.env.OPENAI_API_KEY;
        if (openaiKey) {
          const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + openaiKey
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                { role: "system", content: "Você é um compositor de sertanejo sofrência. Recebe uma ideia curta e triste e transforma em letra completa com [Verso 1], [Verso 2], [Pré-Refrão], [Refrão - emocional, chiclete], [Ponte]. Use a ideia original como base, não fuja dela. Letra simples, que dói, pra cantar bebendo." },
                { role: "user", content: `Expanda essa ideia em letra completa: ${ideiaOriginal}` }
              ],
              temperature: 0.9,
              max_tokens: 800
            })
          });
          const openaiData = await openaiRes.json();
          if (openaiData.choices && openaiData.choices[0]) {
            letraParaUsar = openaiData.choices[0].message.content;
            console.log('Letra expandida com sucesso!');
          }
        }
      } catch (errExpand) {
        console.log('Erro ao expandir, usando original:', errExpand.message);
        letraParaUsar = ideiaOriginal;
      }
    }

    // ==========================================
    // SEU CÓDIGO SAGRADO - PRESERVADO
    // ==========================================
    const payload = {
      prompt: (letraParaUsar || body.prompt || 'pop song').toString().slice(0,2800),
      style: body.style || 'pop',
      title: body.title || 'Minha Musica',
      customMode: true,
      instrumental:!letraParaUsar,
      model: 'V4_5',
      callBackUrl: 'https://api.sunoapi.org/api/callback',
      wait_audio: false
    };

    const res = await fetch('https://api.sunoapi.org/api/v1/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    console.log('Suno response', res.status, text.slice(0,1000));
    return { statusCode: res.status, headers, body: text };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, headers, body: JSON.stringify({error: e.message}) };
  }
};
