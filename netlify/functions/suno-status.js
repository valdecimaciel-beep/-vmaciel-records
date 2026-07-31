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

    const res = await fetch(`https://api.sunoapi.org/api/v1/generate/${taskId}`, {
      headers: { 'Authorization': 'Bearer ' + apiKey }
    });
    
    const data = await res.json();
    console.log('Status check', taskId, JSON.stringify(data).slice(0,1000));

    return { statusCode: 200, headers, body: JSON.stringify(data) };

  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({error: e.message}) };
  }
};
