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

const toneMap = {
  neutral: "Responde de forma clara y equilibrada.",
  friendly: "Responde de forma cercana y amigable.",
  professional: "Responde de forma profesional y técnica.",
};

const getLLMResponse = async ({ message, userId, style, history = [] }) => {
  try {
    console.log("Mensaje enviado:", message);

    const toneInstruction = toneMap[style?.tone] || toneMap.neutral;

    const systemPrompt = `Eres NeburIA, un asistente inteligente y útil. ${toneInstruction}`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message }
    ];

    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: messages,
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