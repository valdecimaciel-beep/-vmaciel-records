exports.handler = async (event) => {
  const apiKey = process.env.SUNO_API_KEY || process.env.SUNO_API_TOKEN;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "SEM API KEY" }) };
  }
  const id = event.queryStringParameters?.id;
  if (!id) return { statusCode: 400, body: "missing id" };

  try {
    const res = await fetch(`https://api.sunoapi.org/api/v1/feed/${id}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    const data = await res.text();
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: data };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};