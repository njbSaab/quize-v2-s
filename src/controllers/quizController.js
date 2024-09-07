const connection = require("../services/db"); // Подключаем модуль для работы с БД

// Функция для получения вопросов
const getQuestions = (callback) => {
  console.log("Запрашиваем вопросы из базы данных...");

  // Выполняем запрос к базе данных
  connection.query("SELECT * FROM questions", (err, results) => {
    if (err) {
      console.error("Ошибка выполнения запроса:", err);
      return callback(err, null); // Возвращаем ошибку в обратный вызов
    }

    if (results.length === 0) {
      console.log("В базе данных нет вопросов.");
    } else {
      console.log(`Найдено вопросов: ${results.length}`);
    }

    console.log("Результаты запроса:", results); // Логирование данных из БД

    // Возвращаем результаты в обратный вызов
    callback(null, results);
  });
};

// // Тестовый вызов для проверки работы
// getQuestions((err, questions) => {
//   if (err) {
//     console.error("Ошибка при получении вопросов:", err);
//     return;
//   }

//   // Выводим результаты для проверки
//   console.log("Полученные вопросы:", questions);
// });

module.exports = { getQuestions };
