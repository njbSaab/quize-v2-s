const Quiz = require("../quiz"); // Импортируем абстрактный класс Quiz

class MultiChoiceQuiz extends Quiz {
  constructor(questions, userController, quizState) {
    // Вызов конструктора родительского класса (Quiz)
    super(questions, userController, quizState);
  }

  // Метод для начала викторины
  start(ctx) {
    const question = this.getQuestion(ctx); // Получение текущего вопроса для пользователя
    console.log(`Текущий вопрос для пользователя: ${question.text}`);

    // Отправка вопроса пользователю с кнопками вариантов ответа
    ctx.reply(question.text, {
      reply_markup: {
        inline_keyboard: question.options.map((option, index) => [
          { text: option, callback_data: `answer_${index}` }, // Добавление кнопок с ответами
        ]),
      },
    });
  }

  // Метод для проверки ответа пользователя
  checkAnswer(ctx, answerIndex) {
    const question = this.getQuestion(ctx); // Получение текущего вопроса
    const correct = question.correctIndex === parseInt(answerIndex, 10); // Проверка правильности ответа

    // Логируем правильный или неправильный ответ
    if (correct) {
      ctx.reply("Correct!"); // Ответ правильный
      console.log(`Пользователь ${ctx.message.from.id} ответил правильно`);
    } else {
      ctx.reply("Wrong answer!"); // Ответ неверный
      console.log(`Пользователь ${ctx.message.from.id} ответил неправильно`);
    }

    const progress = this.quizState.getState(ctx.message.from.id); // Получение текущего состояния пользователя
    const newProgress = progress ? progress.currentQuestionIndex + 1 : 1; // Обновление прогресса (следующий вопрос)

    // Логируем обновление состояния
    console.log(
      `Обновляем состояние пользователя ${ctx.message.from.id}, новый прогресс: ${newProgress}`
    );
    this.updateState(ctx, newProgress); // Сохранение нового состояния

    // Переход к следующему вопросу или завершение викторины
    if (newProgress < this.questions.length) {
      console.log("Переход к следующему вопросу.");
      this.start(ctx); // Переход к следующему вопросу, если викторина не завершена
    } else {
      ctx.reply("Quiz completed!"); // Если все вопросы завершены, выводим сообщение о завершении викторины
      console.log("Викторина завершена.");
    }
  }
}

module.exports = MultiChoiceQuiz;
