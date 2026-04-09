const { getLLMResponse } = require('./llmService');

const processChat = async (req, res) => {
  const { message, userId, style } = req.body;

  try {
    const response = await getLLMResponse({ message, userId, style });
    res.json({ response });
  } catch (error) {
    console.error("Error al procesar chat:", error);
    res.status(500).json({ response: "Error interno del servidor" });
  }
};

module.exports = { processChat };