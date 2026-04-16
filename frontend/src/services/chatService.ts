export async function sendMessage(payload: {
  message: string;
  userId: string;
  style: {
    tone: string;
  };
}) {
  // Establezco aqui la URL a donde se hace la consulta via API
  const res = await fetch("https://shiny-happiness-4qwvp99rg4q2qwgg-3000.app.github.dev/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Error en la API");
  }

  return res.json();
}