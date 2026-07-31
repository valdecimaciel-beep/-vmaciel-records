exports.handler = async (event) => {
  // Libera pra seu site chamar
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const ideia = body.ideia || body.prompt || body.frase1 || "";
    const titulo = body.titulo || "";
    const estilo = body.estilo || "Sertanejo Sofrência";

    if (!ideia) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Sem ideia" }) };
    }

    const promptSistema = `Você é o melhor compositor de ${estilo} do Brasil.
    Pegue essa ideia simples: "${ideia}" ${titulo? `para a música "${titulo}"` : ""}
    E transforme em uma LETRA COMPLETA e EMOCIONANTE.

    REGRAS:
    - Crie: Verso 1, Verso 2, Pré-refrão, Refrão (bem sofrido e chiclete), Ponte
    - Use linguagem simples, do povo, que toca na sofrência
    - Mantenha a ideia original
    - Não explique nada, retorne SÓ A LETRA pronta`;

    const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: promptSistema },
          { role: "user", content: ideia }
        ],
        temperature: 0.85,
        max_tokens: 800
      })
    });

    const dados = await resposta.json();

    if (!dados.choices) {
      throw new Error(JSON.stringify(dados));
    }

    const letraCompleta = dados.choices[0].message.content;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sucesso: true,
        letra: letraCompleta,
        ideiaOriginal: ideia
      })
    };

  } catch (erro) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: erro.message })
    };
  }
};
