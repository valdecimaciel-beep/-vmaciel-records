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

    let ideiaOriginal = (body.lyrics || body.prompt || '').toString().trim();
    let letraParaUsar = ideiaOriginal;

    const precisaExpandir = ideiaOriginal.length > 5 && ideiaOriginal.length < 500 &&!ideiaOriginal.includes('[Verso');

    if (precisaExpandir) {
      console.log('Expandindo ideia:', ideiaOriginal);
      let expandiu = false;
      // TENTA OPENAI
      try {
        const openaiKey = process.env.OPENAI_API_KEY;
        if (openaiKey) {
          const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + openaiKey },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                { role: "system", content: "Você é um compositor de sertanejo sofrência, estilo Marília Mendonça, Henrique e Juliano. Transforme a ideia curta em LETRA COMPLETA, com história diferente em cada verso. NUNCA repita a mesma frase 2x. Estrutura: [Verso 1], [Pré-Refrão], [Refrão - forte, chiclete, sofrência], [Verso 2 - com história nova], [Refrão - variação], [Ponte]. Letra de 20 linhas no mínimo." },
                { role: "user", content: ideiaOriginal }
              ],
              temperature: 0.95,
              max_tokens: 1000
            })
          });
          const openaiData = await openaiRes.json();
          console.log('OpenAI response', JSON.stringify(openaiData).slice(0,800));
          if (openaiData.choices && openaiData.choices[0] && openaiData.choices[0].message.content.length > 100) {
            letraParaUsar = openaiData.choices[0].message.content;
            expandiu = true;
          }
        }
      } catch (errExpand) {
        console.log('Erro OpenAI:', errExpand.message);
      }

      // FALLBACK LOCAL - SE OPENAI FALHAR, EXPANDE NA MARRA
      if (!expandiu) {
        console.log('Usando expansão local');
        letraParaUsar = `[Verso 1]
${ideiaOriginal}
Acordei sozinho, cama vazia, coração doendo
O café amargou igual saudade que tô vivendo

[Pré-Refrão]
E eu tento te esquecer mas não consigo
Cada canto da casa lembra nós dois

[Refrão - Full, emotional, long]
${ideiaOriginal}
Fiquei aqui bebendo, chorando tua ausência
Como é que a gente ama e depois vira carência
${ideiaOriginal.toUpperCase()}
Não dá pra seguir sem você aqui

[Verso 2]
Lá fora a rua segue, mas aqui dentro parou
Seu cheiro no travesseiro, seu nome que não calou
Jurei ser forte, mas tô quebrado no chão

[Refrão - variação]
${ideiaOriginal}
Hoje eu entendi que amor que vai não volta mais
Mas meu coração teimoso ainda te espera demais

[Ponte]
Se um dia você voltar, vai me encontrar no mesmo lugar
No mesmo bar, na mesma dor, esperando você voltar`;
      }
    }

    const payload = {
      prompt: letraParaUsar.slice(0,2800),
      style: body.style || 'sertanejo sofrencia, emotional',
      title: body.title || 'Minha Musica',
      customMode: true,
      instrumental: false,
      model: 'V4_5',
      callBackUrl: 'https://api.sunoapi.org/api/callback',
      wait_audio: false
    };

    console.log('Payload final prompt tamanho', letraParaUsar.length);
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
