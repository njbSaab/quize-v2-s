"use strict";

var _require = require("../controllers/quizController"),
    getQuestions = _require.getQuestions; // Подключаем контроллер


var _require2 = require("../models/userState"),
    getUserState = _require2.getUserState,
    updateUserState = _require2.updateUserState;

var quizCommand = function quizCommand(ctx) {
  var userId = ctx.message.from.id;
  var userState = getUserState(userId);
  console.log("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ".concat(userId, " \u0432\u044B\u0437\u0432\u0430\u043B \u043A\u043E\u043C\u0430\u043D\u0434\u0443 /quiz"));
  console.log("userState:", userState);

  if (userState.step === "begined_quiz") {
    console.log("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: ".concat(userState.step));
    console.log("Запрашиваем вопросы..."); // Загружаем вопросы через контроллер

    getQuestions(function (err, questions) {
      if (err) {
        console.error("Ошибка при загрузке вопросов:", err);
        ctx.reply("Произошла ошибка при загрузке вопросов.");
        return;
      }

      if (!questions || questions.length === 0) {
        console.log("Вопросы не найдены.");
        ctx.reply("Вопросов не найдено.");
        return;
      } // Если вопросы успешно получены, логируем и отправляем их


      console.log("Вопросы получены:", questions);
      var firstQuestion = questions[0];
      ctx.reply("\u0412\u043E\u043F\u0440\u043E\u0441: ".concat(firstQuestion.question));
      ctx.reply("1. ".concat(firstQuestion.var1));
      ctx.reply("2. ".concat(firstQuestion.var2));
      ctx.reply("3. ".concat(firstQuestion.var3));
      ctx.reply("4. ".concat(firstQuestion.var4));
      console.log("Первый вопрос отправлен пользователю:", firstQuestion);
    });
  } else {
    ctx.reply("Сначала предоставьте свое имя или начните с команды /start.");
  }
};

module.exports = quizCommand;