// src/commands/handleName.js
const {
  updateUserState,
  getUserState,
  formatDate,
} = require("../models/userState");

module.exports = (ctx) => {
  const userId = ctx.message.from.id;
  const userName = ctx.message.text; // Имя пользователя
  console.log(`Пользователь ${userId} ввел имя: ${userName}`);

  const userState = getUserState(userId); // Получаем текущее состояние пользователя

  // Форматируем дату из timestamp (ctx.message.date)
  const formattedDate = formatDate(ctx.message.date);

  // Обновляем состояние пользователя
  updateUserState(userId, {
    name: userName,
    mail: null, // Email будет пустым, пока не будет введен
    date: formattedDate,
    data: {
      is_bot: ctx.message.from.is_bot,
      first_name: ctx.message.from.first_name,
      last_name: ctx.message.from.last_name,
      username: ctx.message.from.username,
      language_code: ctx.message.from.language_code,
    },
    step: "ready_for_quiz", // Обновляем состояние на "готов к викторине"
  });

  console.log(`Состояние пользователя ${userId} обновлено и сохранено.`);
  // Подтверждаем пользователю, что имя сохранено и он готов к викторине
  ctx.reply(`Your name, ${userName}, has been saved!`);
  ctx.reply("Ready to start the quiz? Type /quiz to begin.");
};
