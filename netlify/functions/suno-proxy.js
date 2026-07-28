const SUNO_API_URL = "https://api.sunoapi.org/api/v1/generate";

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const apiKey = process.env.SUNO_API_KEY || process.env.SUNO_API_TOKEN;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "SEM API KEY: Adicione SUNO_API_KEY nas Environment Variables da Netlify" })
    };
  }
  try {
    const body = JSON.parse(event.body || '{}');
    const prompt = body.prompt || body.sunoPrompt || "Trap Brazilian phonk";
    const lyrics = body.lyrics || "";
    const title = body.title || "Vmaciel Track";

    const res = await fetch(SUNO_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: `${prompt} ${lyrics}`.slice(0, 1000),
        title: title,
        make_instrumental: !lyrics,
        wait_audio: false
      })
    });
    const data = await res.text();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: data
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};