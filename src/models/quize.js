// src/models/quiz.js
class Quiz {
  constructor(questions, userController, quizState) {
    // Проверка на попытку создания экземпляра абстрактного класса напрямую
    if (this.constructor === Quiz) {
      throw new Error("Abstract class 'Quiz' cannot be instantiated directly.");
    }
    // Сохранение вопросов, контроллера пользователя и состояния викторины
    this.questions = questions;
    this.userController = userController;
    this.quizState = quizState;
  }

  // Абстрактный метод для старта викторины (должен быть реализован в подклассах)
  start(ctx) {
    throw new Error("Method 'start()' must be implemented.");
  }

  // Абстрактный метод для проверки ответа (должен быть реализован в подклассах)
  checkAnswer(ctx, answer) {
    throw new Error("Method 'checkAnswer()' must be implemented.");
  }

  // Получение текущего вопроса пользователя из состояния викторины
  getQuestion(ctx) {
    const userId = ctx.message.from.id; // Получение ID пользователя из сообщения
    const state = this.quizState.getState(userId); // Получение состояния викторины пользователя
    const currentQuestionIndex = state ? state.currentQuestionIndex : 0; // Получение индекса текущего вопроса или 0
    return this.questions[currentQuestionIndex]; // Возвращение текущего вопроса
  }

  // Обновление состояния викторины для пользователя
  updateState(ctx, progress) {
    const userId = ctx.message.from.id; // Получение ID пользователя из сообщения
    this.quizState.saveState(userId, { progress }); // Сохранение нового состояния пользователя
  }
}

module.exports = Quiz;
