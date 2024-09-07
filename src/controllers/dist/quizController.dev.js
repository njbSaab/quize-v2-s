"use strict";

var connection = require("../services/db"); // Подключаем модуль для работы с БД
// Функция для получения вопросов


var getQuestions = function getQuestions(callback) {
  console.log("Запрашиваем вопросы из базы данных..."); // Выполняем запрос к базе данных

  connection.query("SELECT * FROM questions", function (err, results) {
    if (err) {
      console.error("Ошибка выполнения запроса:", err);
      return callback(err, null); // Возвращаем ошибку в обратный вызов
    }

    if (results.length === 0) {
      console.log("В базе данных нет вопросов.");
    } else {
      console.log("\u041D\u0430\u0439\u0434\u0435\u043D\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432: ".concat(results.length));
    }

    console.log("Результаты запроса:", results); // Логирование данных из БД
    // Возвращаем результаты в обратный вызов

    callback(null, results);
  });
}; // // Тестовый вызов для проверки работы
// getQuestions((err, questions) => {
//   if (err) {
//     console.error("Ошибка при получении вопросов:", err);
//     return;
//   }
//   // Выводим результаты для проверки
//   console.log("Полученные вопросы:", questions);
// });


module.exports = {
  getQuestions: getQuestions
};