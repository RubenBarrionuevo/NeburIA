export async function sendMessage(payload: {
  message: string;
  userId: string;
  style: {
    tone: string;
  };
}) {
  const res = await fetch("http://localhost:3000/chat", {
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