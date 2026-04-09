// /backend/routes/chat.js
const express = require("express");
const router = express.Router();
const { getLLMResponse } = require("../controllers/llmService");

router.post("/", async (req, res) => {
  const { message, userId, style } = req.body;

  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }

  const responseText = await getLLMResponse({ message, userId, style });

  return res.json({ response: responseText });
});

module.exports = router;