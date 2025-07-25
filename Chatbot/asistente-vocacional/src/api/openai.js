import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "", 
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
