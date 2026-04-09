// /backend/llmService.js
const { OpenAI } = require("openai");
require("dotenv").config();

const HF_TOKEN = process.env.HF_TOKEN;

// Cliente unificado Hugging Face (OpenAI-compatible)
const client = new OpenAI({
  apiKey: HF_TOKEN,
  baseURL: "https://router.huggingface.co/v1",
});

// Modelo de ejemplo disponible en Inference Providers
const MODEL = "moonshotai/Kimi-K2-Instruct-0905";

const getLLMResponse = async ({ message, userId, style }) => {
  try {
    console.log("Mensaje enviado:", message);

    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      // Opcional: puedes controlar parámetros como temperatura
      temperature: 0.7,
      max_tokens: 200,
    });

    const responseText = completion.choices[0].message.content;
    console.log("Respuesta generada:", responseText);

    return responseText;
  } catch (error) {
    console.error("Error llamando a Hugging Face Inference Provider:", error);
    return "Error generando respuesta";
  }
};

module.exports = { getLLMResponse };