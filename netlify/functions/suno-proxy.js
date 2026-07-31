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
    
    const payload = {
      prompt: (body.lyrics || body.prompt || 'pop song').toString().slice(0,2800),
      style: body.style || 'pop',
      title: body.title || 'Minha Musica',
      customMode: true,
      instrumental: !body.lyrics,
      model: 'V4_5',
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
