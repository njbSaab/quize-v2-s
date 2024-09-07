const { getQuestions } = require("../controllers/quizController"); // Подключаем контроллер
const { getUserState, updateUserState } = require("../models/userState");

const quizCommand = (ctx) => {
  const userId = ctx.message.from.id;
  const userState = getUserState(userId);

  console.log(`Пользователь ${userId} вызвал команду /quiz`);
  console.log("userState:", userState);

  if (userState.step === "begined_quiz") {
    console.log(`Состояние пользователя: ${userState.step}`);
    console.log("Запрашиваем вопросы...");

    // Загружаем вопросы через контроллер
    getQuestions((err, questions) => {
      if (err) {
        console.error("Ошибка при загрузке вопросов:", err);
        ctx.reply("Произошла ошибка при загрузке вопросов.");
        return;
      }

      if (!questions || questions.length === 0) {
        console.log("Вопросы не найдены.");
        ctx.reply("Вопросов не найдено.");
        return;
      }

      // Если вопросы успешно получены, логируем и отправляем их
      console.log("Вопросы получены:", questions);

      const firstQuestion = questions[0];
      ctx.reply(`Вопрос: ${firstQuestion.question}`);
      ctx.reply(`1. ${firstQuestion.var1}`);
      ctx.reply(`2. ${firstQuestion.var2}`);
      ctx.reply(`3. ${firstQuestion.var3}`);
      ctx.reply(`4. ${firstQuestion.var4}`);

      console.log("Первый вопрос отправлен пользователю:", firstQuestion);
    });
  } else {
    ctx.reply("Сначала предоставьте свое имя или начните с команды /start.");
  }
};

module.exports = quizCommand;
