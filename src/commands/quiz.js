const { getQuestions } = require("../controllers/quizController");
const { getUserState, updateUserState } = require("../models/userState");

let isQuizProcessing = false;

const quizCommand = (ctx) => {
  const userId = ctx.message.from.id;
  const userState = getUserState(userId);

  if (!userState || userState.step !== "ready_for_quiz") {
    ctx.reply("Сначала предоставьте свое имя или начните с команды /start.");
    return;
  }

  if (isQuizProcessing) {
    ctx.reply("Подождите, предыдущий запрос еще обрабатывается.");
    return;
  }

  isQuizProcessing = true;

  // Получаем текущий индекс вопроса
  const currentQuestionIndex = userState.currentQuestionIndex || 0;

  getQuestions((err, questions) => {
    if (err || !questions || questions.length === 0) {
      ctx.reply("Произошла ошибка при загрузке вопросов.");
      isQuizProcessing = false;
      return;
    }

    if (currentQuestionIndex >= questions.length) {
      ctx.reply("Викторина завершена.");
      updateUserState(userId, { ...userState, step: "completed_quiz" });
      isQuizProcessing = false;
      return;
    }

    const question = questions[currentQuestionIndex];

    // Отправляем текущий вопрос пользователю
    ctx.reply(`Вопрос: ${question.question}`);
    ctx.reply(`1. ${question.var1}`);
    ctx.reply(`2. ${question.var2}`);
    ctx.reply(`3. ${question.var3}`);
    ctx.reply(`4. ${question.var4}`);

    // Обновляем состояние пользователя, увеличивая индекс
    updateUserState(userId, {
      ...userState,
      currentQuestionIndex: currentQuestionIndex + 1,
    });

    isQuizProcessing = false;
  });
};

module.exports = quizCommand;
