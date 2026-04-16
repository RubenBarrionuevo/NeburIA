<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
// RESTAURAMOS TU CONEXIÓN REAL
import { sendMessage } from "./services/chatService"; 
import type { Message } from "./types/chat";

const input = ref("");
const messagesFlow = ref<HTMLElement | null>(null);
const chatStarted = ref(false); 
const messages = ref<Message[]>([]); // Empezamos vacío como pediste

const scrollToBottom = async () => {
  await nextTick();
  if (messagesFlow.value) {
    messagesFlow.value.scrollTop = messagesFlow.value.scrollHeight;
  }
};

const startChat = () => {
  chatStarted.value = true;
};

const handleSend = async () => {
  const text = input.value.trim();
  if (!text) return;

  if (!chatStarted.value) chatStarted.value = true;

  // 1. Añadimos tu mensaje
  messages.value.push({ role: "user", content: text });
  const userMessage = text;
  input.value = "";
  scrollToBottom();

  try {
    // 2. Llamamos a TU SERVICIO REAL (el que ya tenías)
    const res = await sendMessage({
      message: userMessage,
      userId: "123",
      style: { tone: "friendly" }
    });

    // 3. Añadimos la respuesta de la IA tal cual viene
    if (res && res.response) {
      messages.value.push({ 
        role: "assistant", 
        content: res.response 
      });
      scrollToBottom();
    }
  } catch (err) {
    console.error("Error:", err);
    messages.value.push({
      role: "assistant",
      content: "Lo siento, ha ocurrido un error de conexión con mi núcleo."
    });
    scrollToBottom();
  }
};

onMounted(() => {
  if (messages.value.length > 0) scrollToBottom();
});
</script>

<template>
  <div class="nebura-premium-layout">
    <div class="bg-glow-orange"></div>
    <div class="bg-glow-blue"></div>

    <aside class="integrated-sidebar">
      <div class="brand-zone">
        <div class="avatar-glow">N</div>
        <h1 class="brand-text">Nebur<span>IA</span></h1>
      </div>
      
      <nav class="nav-menu">
        <div class="nav-item active"><span class="icon">✦</span> Chat Central</div>
        <div class="nav-item"><span class="icon">🕒</span> Historial</div>
        <div class="nav-item"><span class="icon">⚙️</span> Ajustes</div>
      </nav>

      <div class="sidebar-footer">
        <div class="status-dot"></div>
        <span>AI Core v2.1</span>
      </div>
    </aside>

    <main class="chat-main">
      <header class="chat-header">
        <div class="header-info">
          <span class="online-indicator"></span>
          <div>
            <h2>Asistente NeburIA</h2>
            <p>Estado: IA Real Conectada</p>
          </div>
        </div>
      </header>

      <div v-if="!chatStarted && messages.length === 0" class="welcome-screen">
        <div class="welcome-card">
          <div class="welcome-icon">✦</div>
          <h1>Bienvenido a NeburIA</h1>
          <p>Tu asistente inteligente premium está listo. ¿En qué puedo ayudarte hoy?</p>
          <button @click="startChat" class="start-btn">Comenzar conversación</button>
        </div>
      </div>

      <div v-else class="messages-flow" ref="messagesFlow">
        <div v-for="(msg, i) in messages" :key="i" :class="['message-row', msg.role]">
          <div v-if="msg.role === 'assistant'" class="bot-avatar">N</div>
          <div class="bubble-context">
            <div class="bubble">
              {{ msg.content }}
            </div>
          </div>
        </div>
      </div>

      <footer class="input-footer">
        <div class="input-wrapper-glow">
          <input 
            v-model="input" 
            @keyup.enter="handleSend" 
            placeholder="Escribe tu consulta aquí..."
          />
          <button @click="handleSend" class="send-action">
            <span>Enviar</span>
            <div class="btn-flare"></div>
          </button>
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
/* (Se mantienen los estilos anteriores y se agregan los de bienvenida) */

.welcome-screen {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 10;
}

.welcome-card {
  max-width: 500px;
  text-align: center;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  padding: 50px 40px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

.welcome-icon {
  font-size: 3rem;
  color: #ff7a18;
  margin-bottom: 20px;
  text-shadow: 0 0 20px rgba(255, 122, 24, 0.5);
}

.welcome-card h1 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: white;
}

.welcome-card p {
  color: rgba(226, 232, 240, 0.6);
  line-height: 1.6;
  margin-bottom: 30px;
}

.start-btn {
  background: linear-gradient(90deg, #ff7a18, #ff3d00);
  color: white;
  border: none;
  padding: 15px 35px;
  border-radius: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(255, 61, 0, 0.2);
}

.start-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(255, 61, 0, 0.4);
}

/* --- ESTILOS ORIGINALES --- */
.nebura-premium-layout {
  position: fixed; inset: 0; display: flex;
  background-color: #040b18; color: #e2e8f0;
  font-family: 'Inter', system-ui, sans-serif;
  z-index: 9999; overflow: hidden;
}

.bg-glow-orange {
  position: absolute; width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(255, 122, 24, 0.15) 0%, transparent 70%);
  filter: blur(80px); bottom: -100px; right: -100px; z-index: 1;
}

.bg-glow-blue {
  position: absolute; width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(10, 36, 68, 0.3) 0%, transparent 70%);
  filter: blur(100px); top: -150px; left: 200px; z-index: 1;
}

.integrated-sidebar {
  width: 280px; height: 100%;
  background: linear-gradient(to right, #061125 0%, rgba(6, 17, 37, 0.8) 80%, rgba(6, 17, 37, 0) 100%);
  backdrop-filter: blur(15px); display: flex; flex-direction: column;
  padding: 40px 25px; z-index: 10; flex-shrink: 0;
}

.brand-zone { display: flex; align-items: center; gap: 15px; margin-bottom: 60px; }
.avatar-glow {
  width: 40px; height: 40px; background: linear-gradient(135deg, #ff7a18, #ff3d00);
  border-radius: 12px; display: grid; place-items: center; color: white;
  font-weight: 900; box-shadow: 0 0 20px rgba(255, 61, 0, 0.5); position: relative;
}

.brand-text { font-size: 1.5rem; font-weight: 800; color: white; margin: 0; }
.brand-text span { color: #ff7a18; }

.nav-menu { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.nav-item {
  padding: 14px 18px; border-radius: 12px; cursor: pointer;
  color: rgba(226, 232, 240, 0.6); transition: all 0.3s ease;
  display: flex; align-items: center; gap: 12px;
}
.nav-item.active {
  background: rgba(255, 122, 24, 0.08); color: white;
  border: 1px solid rgba(255, 122, 24, 0.2);
}

.chat-main { flex: 1; display: flex; flex-direction: column; position: relative; z-index: 5; }
.chat-header {
  padding: 25px 40px; border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(4, 11, 24, 0.5); backdrop-filter: blur(10px);
}

.messages-flow {
  flex: 1; overflow-y: auto; padding: 40px 12%;
  display: flex; flex-direction: column; gap: 30px;
}

.message-row { display: flex; width: 100%; gap: 15px; }
.message-row.user { justify-content: flex-end; }

.bubble {
  padding: 18px 25px; border-radius: 20px; line-height: 1.6; max-width: 100%;
}

.assistant .bubble {
  background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(226, 232, 240, 0.9); border-top-left-radius: 4px;
}

.user .bubble {
  background: linear-gradient(135deg, #ff7a18 0%, #ff3d00 100%);
  color: white; border-top-right-radius: 4px;
  box-shadow: 0 10px 30px -5px rgba(255, 61, 0, 0.5);
}

.input-footer { padding: 30px 12% 50px; background: linear-gradient(to top, #040b18 70%, transparent 100%); }
.input-wrapper-glow {
  display: flex; background: rgba(6, 17, 37, 0.8); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 122, 24, 0.2); border-radius: 20px; padding: 10px; gap: 15px;
}

input { flex: 1; background: transparent; border: none; outline: none; color: white; padding: 0 15px; }

.send-action {
  background: linear-gradient(90deg, #ff7a18, #ff3d00); color: white;
  border: none; padding: 14px 28px; border-radius: 14px; font-weight: 700; cursor: pointer;
}

.status-dot { width: 8px; height: 8px; background: #00ff88; border-radius: 50%; box-shadow: 0 0 10px #00ff88; }
.online-indicator { width: 12px; height: 12px; background: #00ff88; border-radius: 50%; }

/* Scrollbar */
.messages-flow::-webkit-scrollbar { width: 4px; }
.messages-flow::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.06); border-radius: 10px; }
</style>