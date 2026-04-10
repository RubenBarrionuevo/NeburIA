const memory = {};

/**
 * Obtiene historial de un usuario
 */
const getHistory = (userId) => {
  if (!memory[userId]) memory[userId] = [];
  return memory[userId];
};

/**
 * Guarda mensaje en historial
 */
const addMessage = (userId, role, content) => {
  if (!memory[userId]) memory[userId] = [];

  memory[userId].push({ role, content });

  // opcional: limitar tamaño
  if (memory[userId].length > 20) {
    memory[userId].shift();
  }
};

module.exports = { getHistory, addMessage };