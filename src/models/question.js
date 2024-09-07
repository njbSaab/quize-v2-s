class Question {
  constructor(questionText, options, correctOptionIndex, imageUrl = null) {
    if (this.constructor === Question) {
      throw new Error(
        "Abstract class 'Question' cannot be instantiated directly."
      );
    }
    this.questionText = questionText;
    this.options = options; // Варианты ответа
    this.correctOptionIndex = correctOptionIndex; // Индекс правильного ответа
    this.imageUrl = imageUrl; // URL картинки (если есть)
  }

  // Абстрактный метод для получения текста вопроса
  getText() {
    throw new Error("Method 'getText()' must be implemented.");
  }

  // Абстрактный метод для проверки ответа
  checkAnswer(userAnswer) {
    throw new Error("Method 'checkAnswer()' must be implemented.");
  }

  // Абстрактный метод для отображения вопроса пользователю
  display(ctx) {
    throw new Error("Method 'display()' must be implemented.");
  }
}

module.exports = Question;
