// netlify/functions/suno-proxy.js - V10 BLINDADO CORRIGIDO
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  try {
    const { lyrics, style, title } = JSON.parse(event.body || '{}');
    if (!lyrics) return { statusCode: 400, headers, body: JSON.stringify({ error: 'lyrics obrigatório' }) };
    let finalLyrics = lyrics.trim();
    const isShortIdea = () => {
      const hasStructure = /\[.*?(verso|refr[aã]o|chorus|verse|ponte|bridge|pre|outro|intro)/i.test(finalLyrics);
      return finalLyrics.length < 500 &&!hasStructure;
    };
    if (isShortIdea()) {
      try {
        const expanded = await expandWithOpenAI(finalLyrics, style);
        if (expanded && expanded.length > 300) finalLyrics = expanded;
        else throw new Error('vazio');
      } catch (e) {
        finalLyrics = createFallbackLyrics(finalLyrics, style);
      }
    }
    const sunoResponse = await fetch('https://api.sunoapi.org/api/v1/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.SUNO_API_KEY}` },
      body: JSON.stringify({
        prompt: finalLyrics,
        style: style || 'sertanejo sofrencia emocional',
        title: title || 'Minha Canção',
        customMode: true,
        instrumental: false,
        model: 'V4_5',
        callBackUrl: 'https://api.sunoapi.org/api/callback',
        wait_audio: false
      })
    });
    const data = await sunoResponse.text();
    return { statusCode: sunoResponse.status, headers, body: data };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
async function expandWithOpenAI(ideia, estilo) {
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) throw new Error('sem key');
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${openaiKey}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Você é letrista que nunca repete frases em loop.' },
        { role: 'user', content: `Transforme a IDEIA "${ideia}" estilo ${estilo} em letra completa 25 linhas com [Verso 1] [Pré-Refrão] [Refrão] [Verso 2] [Refrão] [Ponte] [Refrão Final]. Use a ideia só 1 vez no Verso 1. Crie história nova, sem repetir frases.` }
      ],
      temperature: 0.9, max_tokens: 1000
    })
  });
  const json = await res.json();
  return json.choices?.[0]?.message?.content?.trim();
}
function createFallbackLyrics(ideia, estilo) {
  const ideiaLimpa = ideia.replace(/"/g, '').trim();
  return `[Verso 1]
${ideiaLimpa}
A manhã trouxe um silêncio que eu não esperava
O café esfriou na mesa enquanto eu pensava
[Pré-Refrão]
E eu tentei entender o que o coração dizia
Que mesmo na dor existe uma poesia
[Refrão]
Mas eu sigo, mesmo triste eu sigo
Aprendendo a caminhar comigo
O sol pode até se esconder
Mas amanhã vai nascer de novo pra valer
[Verso 2]
Guardei retratos antigos dentro do peito
Promessas que o tempo não levou direito
Cada passo me ensina a recomeçar
Sem pressa de esquecer, sem pressa de voltar
[Ponte]
Deixa o vento levar o que tem que ir
O que for amor de verdade vai ficar aqui
[Refrão Final]
Eu sigo, com a alma em reconstrução
Com essa canção curando o coração`;
}
