const { getUserState, updateUserState } = require("../models/userState");
const messages = require("../views/message");

module.exports = (ctx) => {
  const userId = ctx.message.from.id;
  const userState = getUserState(userId);

  console.log(`Пользователь ${userId} вызвал команду /start`);

  // Проверяем текущее состояние пользователя
  if (userState && userState.name) {
    // Если имя уже сохранено, обновляем шаг и текущий индекс вопросов
    updateUserState(userId, {
      ...userState,
      step: "ready_for_quiz",
      currentQuestionIndex: 0,
    });
    ctx.reply(
      `${userState.name}, удачной игры! Нажмите /quiz для начала викторины.`
    );
  } else {
    // Если имени нет, обновляем состояние на "awaiting_name"
    ctx.reply(messages.welcomeMessage);
    ctx.reply("Как вас зовут?");
    updateUserState(userId, { step: "awaiting_name" });
  }
};
