<template>
  <div class="app">
    <div class="chat">

      <header class="header">
        <h1>NeburIA</h1>
        <p>AI Assistant</p>
      </header>

      <div class="messages">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          :class="['bubble', msg.role]"
        >
          {{ msg.content }}
        </div>
      </div>

      <div class="input">
        <input
          v-model="input"
          @keyup.enter="handleSend"
          placeholder="Escribe un mensaje..."
        />
        <button @click="handleSend">Enviar</button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { sendMessage } from "./services/chatService";
import type { Message } from "./types/chat";

const input = ref<string>("");
const messages = ref<Message[]>([]);

const handleSend = async () => {
  if (!input.value) return;

  const userMessage = input.value;

  messages.value.push({
    role: "user",
    content: userMessage
  });

  input.value = "";

  try {
    const res = await sendMessage({
      message: userMessage,
      userId: "123",
      style: { tone: "friendly" }
    });

    messages.value.push({
      role: "assistant",
      content: res.response
    });

  } catch (err) {
    messages.value.push({
      role: "assistant",
      content: "Error conectando con el servidor"
    });
  }
};
</script>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #071a33, #040b18);
  font-family: system-ui;
}

.chat {
  width: 420px;
  height: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;

  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 25px 60px rgba(0,0,0,0.5);
}

.header {
  padding: 18px;
  color: white;
  background: linear-gradient(90deg, #ff7a18, #ff3d00);
}

.messages {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bubble {
  padding: 10px 12px;
  border-radius: 12px;
  max-width: 80%;
  font-size: 14px;
}

.user {
  align-self: flex-end;
  background: #ff7a18;
  color: white;
}

.assistant {
  align-self: flex-start;
  background: rgba(255,255,255,0.10);
  color: white;
}

.input {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: rgba(0,0,0,0.25);
}

input {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: none;
  outline: none;
  background: rgba(255,255,255,0.08);
  color: white;
}

button {
  background: #ff7a18;
  border: none;
  padding: 10px 14px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
}
</style>