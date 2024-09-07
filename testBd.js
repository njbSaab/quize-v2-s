// testBD.js
const mysql = require("mysql2/promise"); // Используем промисы для асинхронных операций
require("dotenv").config(); // Подгрузка конфигурации из .env файла

async function testDatabase() {
  try {
    // Настройка подключения к базе данных
    const connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    console.log("Подключение к базе данных установлено");

    const [questionsResults] = await connection.query(
      "SELECT * FROM questions"
    );
    console.log("Вопросы из базы данных:");
    console.log(questionsResults);

    const [usersResults] = await connection.query("SELECT * FROM user_states");
    console.log("Пользователи из базы данных:");
    console.log(usersResults);

    await connection.end();
    console.log("Соединение с базой данных закрыто");
  } catch (err) {
    console.error("Произошла ошибка:", err);
  }
}

testDatabase();
