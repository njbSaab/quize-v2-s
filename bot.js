const { Telegraf } = require("telegraf");
const config = require("./config");
const startCommand = require("./src/commands/start");
const quizCommand = require("./src/commands/quiz");

// Инициализация бота
const bot = new Telegraf(config.botToken);

// Обрабатываем команду /start
bot.start((ctx) => startCommand(ctx));

// Обрабатываем команду /quiz
bot.command("quiz", (ctx) => {
  console.log("Команда /quiz вызвана");
  quizCommand(ctx); // Передаем контекст в модуль quizCommand
});

// Обрабатываем текстовые сообщения (например, имя пользователя)
bot.on("text", (ctx) => {
  const userId = ctx.message.from.id;
  const { getUserState } = require("./src/models/userState");
  const handleName = require("./src/commands/handleName");

  const userState = getUserState(userId);
  if (userState.step === "awaiting_name") {
    handleName(ctx);
  }
});

// Запуск бота
bot.launch().then(() => {
  console.log("Bot is running");
});
