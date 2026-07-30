exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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
    
    const urls = [
      `https://api.sunoapi.com/api/v1/generate/record-info?taskId=${encodeURIComponent(taskId)}`,
      `https://api.sunoapi.org/api/v1/generate/record-info?taskId=${encodeURIComponent(taskId)}`
    ];

    let lastText = '';
    let lastStatus = 500;
    for (const url of urls) {
      const res = await fetch(url, {
        headers: { 
          'api-key': apiKey,
          'Authorization': 'Bearer ' + apiKey 
        }
      });
      const text = await res.text();
      console.log(url, res.status, text.slice(0,500));
      lastText = text;
      lastStatus = res.status;
      if (res.status === 200) {
        return { statusCode: 200, headers, body: text };
      }
    }
    return { statusCode: lastStatus, headers, body: lastText };
  } catch(e){
    return { statusCode:500, headers, body: JSON.stringify({error:e.message}) };
  }
};
