
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
    if (!apiKey) return { statusCode: 500, headers, body: JSON.stringify({error:'Sem API KEY'}) };
    const taskId = (event.queryStringParameters && event.queryStringParameters.taskId) || '';
    if(!taskId) return { statusCode:400, headers, body: JSON.stringify({error:'Sem taskId'}) };
    
    const res = await fetch('https://api.sunoapi.com/api/v1/generate/record-info?taskId='+encodeURIComponent(taskId), {
      headers: { 'Authorization': 'Bearer ' + apiKey }
    });
    const text = await res.text();
    return { statusCode: res.status, headers, body: text };
  } catch(e){
    return { statusCode:500, headers, body: JSON.stringify({error:e.message}) };
  }
};
