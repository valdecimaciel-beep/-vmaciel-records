exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    const apiKey = process.env.SUNO_API_KEY;
    const taskId = event.queryStringParameters?.id || event.queryStringParameters?.taskId;
    if (!taskId) return { statusCode: 400, headers, body: JSON.stringify({error: 'sem taskId'}) };

    // endpoint CORRETO da sunoapi.org
    const res = await fetch(`https://api.sunoapi.org/api/v1/query?taskId=${taskId}`, {
      headers: { 'Authorization': 'Bearer ' + apiKey }
    });
    
    const text = await res.text();
    console.log('Status query', taskId, res.status, text.slice(0,2000));

    return { statusCode: 200, headers, body: text };

  } catch (e) {
    console.error(e);
    return { statusCode: 500, headers, body: JSON.stringify({error: e.message}) };
  }
};
