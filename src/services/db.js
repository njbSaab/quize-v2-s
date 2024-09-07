const mysql = require("mysql2");
const path = require("path");

// Загружаем переменные окружения из файла .env
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") }); // Путь к файлу .env относительно текущего файла

// Настройка соединения с базой данных
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Выводим переменные окружения для проверки
// console.log("DATABASE_HOST:", process.env.DATABASE_HOST);
// console.log("DATABASE_PORT:", process.env.DATABASE_PORT);
// console.log("DATABASE_USER:", process.env.DATABASE_USER);
// console.log("DATABASE_PASSWORD:", process.env.DATABASE_PASSWORD);
// console.log("DATABASE_NAME:", process.env.DATABASE_NAME);

// Подключение к базе данных
connection.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err);
    return;
  }
  console.log("Соединение с базой данных установлено");
});

// Пример запроса к базе данных
//   // Выполняем запрос к таблице questions
//   connection.query("SELECT * FROM questions", (err, results) => {
//     if (err) {
//       console.error("Ошибка выполнения запроса:", err);
//       return;
//     }

//     // Логируем полученные результаты
//     console.log("Результаты запроса:", results);

//     // Закрываем соединение с базой данных
//     connection.end();
//   });
// });

module.exports = connection;
