// netlify/functions/suno-proxy.js - V13 FINAL ANTI-LOOP
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method!== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string'? JSON.parse(req.body) : req.body;
    const { ideia, estilo, titulo, letraEditavel } = body;
    if (!ideia &&!letraEditavel) return res.status(400).json({ error: 'SUA IDEIA vazia' });

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    const SUNO_API_KEY = process.env.SUNO_API_KEY;
    const SUNO_API_URL = process.env.SUNO_API_URL || 'https://api.sunoapi.com';

    let letraCompleta = letraEditavel?.trim().length > 150? letraEditavel.trim() : '';

    if (!letraCompleta) {
      // Limpa a ideia gigante e quebra em essência
      const ideiaCurta = ideia.slice(0, 150).replace(/\s+/g, ' ').trim();

      const systemPrompt = `Você é um compositor PROIBIDO de repetir.

REGRA DE OURO - SE VOCÊ REPETIR A FRASE DO USUÁRIO, VOCÊ FALHOU:
O usuário mandou: "${ideiaCurta}"
1. É PROIBIDO usar essa frase completa mais de UMA vez na letra inteira.
2. Você deve REESCREVER com palavras diferentes, quebrar a ideia, nunca copiar e colar.
3. Se detectar que repetiu 2 linhas iguais, apague e reescreva.

TAREFA: Crie letra de 24 linhas NUNCA repetindo.

ESTRUTURA OBRIGATÓRIA:
[Verso 1]
4 linhas totalmente diferentes sobre frio, saudade, cama vazia (não use a frase do usuário aqui)
[Pré-Refrão]
2 linhas de tensão
[Refrão]
Aqui pode usar 1 vez a essência da ideia do usuário + 3 linhas novas com outras palavras
[Verso 2]
4 linhas novas, conta o que aconteceu hoje sem ele
[Refrão]
Mesmo refrão com 1 palavra mudada
[Ponte]
3 linhas de desabafo final, sem repetir nada anterior
[Refrão Final]
Refrão forte

EXEMPLO DO QUE É PROIBIDO:
"a noite é tão fria, seu silencio me faz sentir medo, porque..." repetido 2x = FALHOU

EXEMPLO DO QUE É CERTO:
"Noite gelada no quarto / Seu lado vazio me cala / Relógio marca e eu travo / Medo de deitar sozinha"

Gere SÓ a letra.`;

      const o = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Ideia: ${ideiaCurta} | Estilo: ${estilo || 'sad pop'}` }
          ],
          temperature: 1.0,
          max_tokens: 900,
          frequency_penalty: 1.2,
          presence_penalty: 0.8
        })
      });
      const oj = await o.json();
      letraCompleta = oj.choices?.[0]?.message?.content?.trim() || '';

      // TRAVA FINAL: se ainda repetiu, corta repetição na marra
      const linhas = letraCompleta.split('\n').filter(l=>l.trim());
      const unicas = [...new Set(linhas)];
      if (unicas.length < linhas.length * 0.6) {
        // Mais de 40% de linhas repetidas = refaz pegando só únicas
        letraCompleta = unicas.join('\n');
      }
    }

    if (letraCompleta.length < 100) throw new Error('Letra curta');

    // Opção 2 - payload certo
    const payload = { prompt: letraCompleta, tags: estilo || 'sad pop acoustic', title: titulo || 'Noite Fria', make_instrumental: false, wait_audio: false };
    let sRes = await fetch(`${SUNO_API_URL}/api/custom_generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUNO_API_KEY}` },
      body: JSON.stringify(payload)
    });
    let sData;
    if (!sRes.ok) {
      const fb = await fetch(`${SUNO_API_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUNO_API_KEY}` },
        body: JSON.stringify({ prompt: letraCompleta, tags: estilo, title: titulo, customMode: true, instrumental: false })
      });
      sData = await fb.json();
    } else { sData = await sRes.json(); }

    return res.status(200).json({ success: true, letraCompleta, letraEditavel: letraCompleta,...sData });

  } catch (err) {
    console.error('V13 erro:', err);
    return res.status(500).json({ error: err.message });
  }
}
