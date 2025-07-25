import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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", 
});

const openai = new OpenAIApi(configuration);

// Prompt personalizado:
const basePrompt = `
Eres un orientador vocacional profesional. 
Tu trabajo es guiar a estudiantes según sus intereses y habilidades hacia una carrera universitaria adecuada.
Responde de forma empática, clara y motivadora.
`;

export const sugerirCarrera = async (conversacionUsuario) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4", // o usa "gpt-3.5-turbo"
      messages: [
        { role: "system", content: basePrompt },
        ...conversacionUsuario,
      ],
      temperature: 0.7,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error al conectar con OpenAI:", error);
    return "Lo siento, hubo un error al procesar tu solicitud.";
  }
};
