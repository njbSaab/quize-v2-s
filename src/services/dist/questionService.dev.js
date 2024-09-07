"use strict";

var fs = require("fs");

var path = require("path");

var crypto = require("crypto");

var _require = require("../controllers/quizController"),
    getQuestions = _require.getQuestions; // Подключаем контроллер для получения вопросов


var _require2 = require("../models/userState"),
    getUserState = _require2.getUserState,
    updateUserState = _require2.updateUserState;

var questionsFilePath = path.join(__dirname, "../questions/questions.js"); // Путь к файлу вопросов

var hashFilePath = path.join(__dirname, "../questions/questions_hash.txt"); // Путь к хеш-файлу
// Функция для вычисления хеша данных

var computeHash = function computeHash(data) {
  return crypto.createHash("sha256").update(dфta).digest("hex");
}; // Функция для сохранения вопросов в файл


var saveQuestionsToFile = function saveQuestionsToFile(questions) {
  var data = "module.exports = ".concat(JSON.stringify(questions, null, 2), ";");
  fs.writeFileSync(questionsFilePath, data, "utf8");
  console.log("Вопросы сохранены в файл:", questionsFilePath);
}; // Функция для загрузки текущего хеша


var loadCurrentHash = function loadCurrentHash() {
  if (fs.existsSync(hashFilePath)) {
    return fs.readFileSync(hashFilePath, "utf8");
  }

  return null;
}; // Функция для сохранения хеша


var saveCurrentHash = function saveCurrentHash(hash) {
  fs.writeFileSync(hashFilePath, hash, "utf8");
}; // Функция для синхронизации вопросов


var syncQuestions = function syncQuestions(ctx) {
  var userId = ctx.message.from.id;
  var userState = getUserState(userId);
  console.log("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ".concat(userId, " \u0432\u044B\u0437\u0432\u0430\u043B \u043A\u043E\u043C\u0430\u043D\u0434\u0443 /quiz"));
  console.log("Состояние пользователя:", userState.step);

  if (userState.step === "begined_quiz") {
    // Получаем вопросы из базы данных
    getQuestions(function (err, questions) {
      if (err) {
        ctx.reply("Произошла ошибка при загрузке вопросов.");
        console.error("Ошибка при загрузке вопросов:", err);
        return;
      }

      if (questions.length === 0) {
        ctx.reply("Вопросов не найдено.");
        return;
      } // Преобразуем вопросы в JSON для сравнения


      var newQuestionsData = JSON.stringify(questions);
      var newHash = computeHash(newQuestionsData); // Вычисляем хеш новых данных

      var currentHash = loadCurrentHash(); // Загружаем текущий хеш
      // Если хеши не совпадают, обновляем вопросы и хеш

      if (newHash !== currentHash) {
        saveQuestionsToFile(questions); // Сохраняем новые вопросы в файл

        saveCurrentHash(newHash); // Сохраняем новый хеш

        console.log("Вопросы были изменены и сохранены.");
      } else {
        console.log("Вопросы не изменились, используется кэш.");
      }

      ctx.reply("Вопросы успешно синхронизированы и сохранены.");
    });
  } else {
    ctx.reply("Сначала предоставьте свое имя или начните с команды /start.");
  }
};

module.exports = {
  syncQuestions: syncQuestions
};