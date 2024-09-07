const Question = require("../question"); // Импортируем абстрактный класс Question

class MultiChoiceQuestion extends Question {
  constructor(questionText, options, answers, imageUrl = null) {
    super(questionText, options, null, imageUrl);
    this.answers = answers; // Это массив вида [ans1, ans2, ans3, ans4]
  }

  // Реализация метода получения текста вопроса
  getText() {
    return this.questionText;
  }

  // Реализация метода для проверки ответа пользователя
  checkAnswer(userAnswerIndex) {
    return this.answers[userAnswerIndex] === 1; // Проверяем, правильный ли ответ
  }

  // Отображение вопроса пользователю с учетом наличия картинки
  display(ctx) {
    if (this.imageUrl) {
      ctx.reply(`Вопрос: ${this.questionText}`);
      ctx.replyWithPhoto(this.imageUrl);
    } else {
      ctx.reply(`Вопрос: ${this.questionText}`);
    }

    // Отображаем варианты ответа
    this.options.forEach((option, index) => {
      ctx.reply(`${index + 1}. ${option}`);
    });
  }
}

module.exports = MultiChoiceQuestion;
