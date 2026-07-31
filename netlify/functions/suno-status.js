exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  try {
    const key = process.env.SUNO_API_KEY;
    const id = event.queryStringParameters?.id || event.queryStringParameters?.taskId;
    const urls = [
      `https://api.sunoapi.org/api/v1/query?taskId=${id}`,
      `https://api.sunoapi.org/api/v1/generate/record-info?taskId=${id}`,
      `https://api.sunoapi.org/api/v1/generate/${id}`
    ];
    for (let url of urls) {
      const r = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
      const t = await r.text();
      console.log('TRY', url, r.status, t.slice(0,1000));
      if (r.ok && !t.includes('Not Found')) return { statusCode: 200, headers, body: t };
    }
    return { statusCode: 200, headers, body: JSON.stringify({error: 'task not found'}) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({error: e.message}) };
  }
};
