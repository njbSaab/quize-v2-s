// src/commands/start.js
const { getUserState, updateUserState } = require("../models/userState");
const messages = require("../views/message");

module.exports = (ctx) => {
  const userId = ctx.message.from.id;
  const userState = getUserState(userId); // Получаем текущее состояние пользователя

  // Всегда выводим приветственное сообщение
  ctx.reply(messages.welcomeMessage);

  // Проверяем, есть ли уже имя у пользователя
  if (userState.name) {
    if (userState.step === "awaiting_name") {
      // Обновляем состояние на "ready_for_quiz", так как имя уже введено
      updateUserState(userId, { ...userState, step: "ready_for_quiz" });
      ctx.reply(
        `${userState.name}, удачной игры, нажмите /quiz для начала викторины.`
      );
    } else {
      ctx.reply(messages.nameSaved(userState.name));
    }
  } else {
    // Если имени нет, задаем вопрос
    ctx.reply("Как вас зовут?");
    // Обновляем состояние, что бот ожидает имя
    updateUserState(userId, { step: "awaiting_name" });
  }
};
