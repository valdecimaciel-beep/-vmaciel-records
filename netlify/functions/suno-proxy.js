// netlify/functions/suno-proxy.js - V12 FINAL TRAVADO - 100 linhas
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { ideia, estilo, titulo, letraEditavel } = body;

    if (!ideia && !letraEditavel) {
      return res.status(400).json({ error: 'SUA IDEIA vazia' });
    }

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    const SUNO_API_KEY = process.env.SUNO_API_KEY;
    const SUNO_API_URL = process.env.SUNO_API_URL || 'https://api.sunoapi.com';

    let letraCompleta = '';

    if (letraEditavel && letraEditavel.trim().length > 100) {
      letraCompleta = letraEditavel.trim();
    } else {
      let lyricsGenerated = false;
      try {
        const lyricRes = await fetch(`${SUNO_API_URL}/api/generate_lyrics`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUNO_API_KEY}` },
          body: JSON.stringify({ prompt: ideia })
        });
        if (lyricRes.ok) {
          const lyricData = await lyricRes.json();
          letraCompleta = lyricData.text || lyricData.lyrics || lyricData.data?.text || '';
          if (letraCompleta.length > 100) lyricsGenerated = true;
        }
      } catch (e) {
        console.log('Fallback OpenAI:', e.message);
      }

      if (!lyricsGenerated) {
        if (!OPENAI_KEY) throw new Error('OPENAI_API_KEY não configurada');
        const systemPrompt = `Você é um compositor profissional. Receba 2-3 frases e expanda em letra COMPLETA sem repetir. Estruture: [Verse 1] 4 linhas, [Pre-Chorus] 2 linhas, [Chorus] use ideia + 2 linhas, [Verse 2] 4 linhas novas, [Chorus] variação, [Bridge] 3 linhas clímax, [Chorus Final]. NUNCA repita mesma linha mais de 2x. Mínimo 20 linhas. Só a letra.`;

        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: `Minha ideia: ${ideia} | Estilo: ${estilo || 'pop melancólico'}` }
            ],
            temperature: 0.9,
            max_tokens: 800
          })
        });
        const openaiData = await openaiRes.json();
        letraCompleta = openaiData.choices?.[0]?.message?.content?.trim() || '';
      }
    }

    if (letraCompleta.length < 80) throw new Error('Letra muito curta');

    const sunoPayload = {
      prompt: letraCompleta,
      tags: estilo || 'sad pop acoustic slow',
      title: titulo || 'Noite Fria',
      make_instrumental: false,
      wait_audio: false
    };

    const sunoRes = await fetch(`${SUNO_API_URL}/api/custom_generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUNO_API_KEY}` },
      body: JSON.stringify(sunoPayload)
    });

    let sunoData;
    if (!sunoRes.ok) {
      const fallbackRes = await fetch(`${SUNO_API_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUNO_API_KEY}` },
        body: JSON.stringify({ prompt: letraCompleta, tags: estilo, title: titulo, customMode: true, instrumental: false })
      });
      sunoData = await fallbackRes.json();
    } else {
      sunoData = await sunoRes.json();
    }

    return res.status(200).json({
      success: true,
      letraCompleta: letraCompleta,
      letraEditavel: letraCompleta,
      sunoResponse: sunoData,
      ...sunoData,
      debug: { ideiaLength: ideia?.length || 0, letraLength: letraCompleta.length }
    });

  } catch (error) {
    console.error('Erro V12:', error);
    return res.status(500).json({ error: error.message });
  }
}
