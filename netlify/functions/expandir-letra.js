exports.handler = async (event) => {
  try {
    const { frase1, frase2, estilo } = JSON.parse(event.body);

    const prompt = `Você é um compositor profissional. Crie uma letra COMPLETA de música no estilo ${estilo || 'sertanejo romântico'} usando como base essas duas ideias: "${frase1}" e "${frase2}". Crie versos, pré-refrão e refrão. Retorne só a letra.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
      })
    });

    const data = await response.json();
    const letra = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ letra })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
