const express = require("express");
const router = express.Router();
const { getLLMResponse } = require("../controllers/llmService");
const { getHistory, addMessage } = require("../services/memoryStore");

router.post("/", async (req, res) => {
  const { message, userId, style } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: "message and userId are required" });
  }

  // Obtenemos historial del usuario
  const history = getHistory(userId);

  // Guardarmos mensaje del usuario
  addMessage(userId, "user", message);

  // Llamamos al modelo usando el historial
  const responseText = await getLLMResponse({
    message,
    userId,
    style,
    history
  });

  // Guardarmos respuesta del asistente
  addMessage(userId, "assistant", responseText);

  return res.json({ response: responseText, history });
});

module.exports = router;