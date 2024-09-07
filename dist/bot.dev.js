"use strict";

var _require = require("telegraf"),
    Telegraf = _require.Telegraf;

var config = require("./config");

var startCommand = require("./src/commands/start");

var quizCommand = require("./src/commands/quiz"); // Инициализация бота


var bot = new Telegraf(config.botToken); // Обрабатываем команду /start

bot.start(function (ctx) {
  return startCommand(ctx);
}); // Обрабатываем команду /quiz

bot.command("quiz", function (ctx) {
  console.log("Команда /quiz вызвана");
  quizCommand(ctx); // Передаем контекст в модуль quizCommand
}); // Обрабатываем текстовые сообщения (например, имя пользователя)

bot.on("text", function (ctx) {
  var userId = ctx.message.from.id;

  var _require2 = require("./src/models/userState"),
      getUserState = _require2.getUserState;

  var handleName = require("./src/commands/handleName");

  var userState = getUserState(userId);

  if (userState.step === "awaiting_name") {
    handleName(ctx);
  }
}); // Запуск бота

bot.launch().then(function () {
  console.log("Bot is running");
});