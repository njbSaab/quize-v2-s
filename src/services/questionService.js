const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { getQuestions } = require("../controllers/quizController"); // Подключаем контроллер для получения вопросов
const { getUserState, updateUserState } = require("../models/userState");

const questionsFilePath = path.join(__dirname, "../questions/questions.js"); // Путь к файлу вопросов
const hashFilePath = path.join(__dirname, "../questions/questions_hash.txt"); // Путь к хеш-файлу

// Функция для вычисления хеша данных
const computeHash = (data) => {
  return crypto.createHash("sha256").update(dфta).digest("hex");
};

// Функция для сохранения вопросов в файл
const saveQuestionsToFile = (questions) => {
  const data = `module.exports = ${JSON.stringify(questions, null, 2)};`;
  fs.writeFileSync(questionsFilePath, data, "utf8");
  console.log("Вопросы сохранены в файл:", questionsFilePath);
};

// Функция для загрузки текущего хеша
const loadCurrentHash = () => {
  if (fs.existsSync(hashFilePath)) {
    return fs.readFileSync(hashFilePath, "utf8");
  }
  return null;
};

// Функция для сохранения хеша
const saveCurrentHash = (hash) => {
  fs.writeFileSync(hashFilePath, hash, "utf8");
};

// Функция для синхронизации вопросов
const syncQuestions = (ctx) => {
  const userId = ctx.message.from.id;
  const userState = getUserState(userId);

  console.log(`Пользователь ${userId} вызвал команду /quiz`);
  console.log("Состояние пользователя:", userState.step);

  if (userState.step === "begined_quiz") {
    // Получаем вопросы из базы данных
    getQuestions((err, questions) => {
      if (err) {
        ctx.reply("Произошла ошибка при загрузке вопросов.");
        console.error("Ошибка при загрузке вопросов:", err);
        return;
      }

      if (questions.length === 0) {
        ctx.reply("Вопросов не найдено.");
        return;
      }

      // Преобразуем вопросы в JSON для сравнения
      const newQuestionsData = JSON.stringify(questions);
      const newHash = computeHash(newQuestionsData); // Вычисляем хеш новых данных
      const currentHash = loadCurrentHash(); // Загружаем текущий хеш

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

module.exports = { syncQuestions };
