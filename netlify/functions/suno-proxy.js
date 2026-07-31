// netlify/functions/suno-proxy.js - V11 - ANTI-REPETIÇÃO GARANTIDO
exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    const { lyrics, style, title } = JSON.parse(event.body || '{}');
    if (!lyrics) return { statusCode: 400, headers, body: JSON.stringify({ error: 'lyrics vazio' }) };

    let finalLyrics = lyrics.trim();
    const originalIdea = finalLyrics;

    // DETECTOR DE IDEIA CURTA
    const isShort = finalLyrics.length < 500 &&!/\[.*?(verso|refrão|chorus|verse|ponte|bridge)/i.test(finalLyrics);

    if (isShort) {
      console.log('IDEIA CURTA DETECTADA - EXPANDINDO');
      let expanded = null;
      try {
        expanded = await expandOpenAI(originalIdea, style);
      } catch (e) {
        console.log('OPENAI FALHOU:', e.message);
      }

      // SE OPENAI FALHOU OU VEIO REPETIDO, USA FALLBACK QUE NÃO REPETE
      if (!expanded || isRepeating(expanded, originalIdea)) {
        console.log('USANDO FALLBACK SEM REPETIÇÃO');
        finalLyrics = buildNoRepeatFallback(originalIdea);
      } else {
        finalLyrics = expanded;
      }
    }

    // ANTI-LOOP EXTRA PARA O SUNO
    finalLyrics = `IMPORTANT INSTRUCTION FOR SUNO: Do not repeat the same line. Sing each line once. Storytelling lyrics.\n\n${finalLyrics}`;

    // CHAMA SUNO
    const res = await fetch(process.env.SUNO_API_URL || 'https://api.sunoapi.com/api/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUNO_API_KEY}`,
        'api-key': process.env.SUNO_API_KEY
      },
      body: JSON.stringify({
        prompt: finalLyrics,
        style: style || 'sad acoustic ballad',
        title: title || 'Noite Fria',
        customMode: true,
        instrumental: false,
        model: 'V3_5'
      })
    });

    const data = await res.json();
    // DEVOLVE A LETRA EXPANDIDA PRA APARECER NA "LETRA EDITÁVEL" SEM REPETIR
    data.expandedLyrics = finalLyrics;
    data.originalIdea = originalIdea;

    return { statusCode: 200, headers, body: JSON.stringify(data) };

  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};

function isRepeating(text, original) {
  const count = (text.match(new RegExp(original.substring(0, 20).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
  return count > 1;
}

async function expandOpenAI(ideia, estilo) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('Sem OPENAI_API_KEY');
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.85,
      max_tokens: 1200,
      messages: [
        { role: 'system', content: 'Você é um compositor que NUNCA repete frases. Cada linha é única.' },
        { role: 'user', content: `Transforme em letra completa de 25 linhas com história. Ideia: "${ideia}". Estilo: ${estilo}. Use 1 vez só a ideia no verso 1. Estrutura: [Verso 1], [Pré-Refrão], [Refrão], [Verso 2], [Refrão], [Ponte], [Refrão Final]. Sem repetição.` }
      ]
    })
  });
  const j = await r.json();
  return j.choices?.[0]?.message?.content?.trim();
}

function buildNoRepeatFallback(ideia) {
  const i = ideia.replace(/["\n]+/g, ' ').trim();
  return `[Verso 1]
${i}
O relógio na parede conta cada segundo
E a casa fica grande demais pra um só no mundo

[Pré-Refrão]
Faltam suas risadas no corredor vazio
Falta o seu boa noite que era meu abrigo

[Refrão]
A noite é fria mas eu vou aquecer
As memórias que você deixou pra eu viver
Não é o fim, é só saudade pra doer
Até o dia que a gente voltar a se ter

[Verso 2]
Deixei a luz da varanda acesa sem querer
Vai que você resolve aparecer
O travesseiro ainda guarda o seu perfume
E eu finjo que é você quando o vento assume

[Refrão]
A noite é fria mas eu vou aquecer
As memórias que você deixou pra eu viver
Não é o fim, é só saudade pra doer
Até o dia que a gente voltar a se ter

[Ponte]
Se o medo bater, eu canto mais alto
Pra espantar a solidão do meu quarto

[Refrão Final]
A noite é fria, mas o amor não vai embora
Ele dorme aqui comigo até ir embora a aurora`;
}
