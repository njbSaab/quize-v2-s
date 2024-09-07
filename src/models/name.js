class Name {
  constructor(userId, userName) {
    if (this.constructor === Name) {
      throw new Error("Abstract class 'Name' cannot be instantiated directly.");
    }
    this.userId = userId; // Сохранение ID пользователя
    this.userName = userName; // Сохранение имени пользователя
  }

  // Метод для сохранения имени пользователя
  saveName() {
    console.log(`Saving name: ${this.userName} for user: ${this.userId}`);
    // Здесь будет логика сохранения имени в базу данных
  }

  // Метод для получения имени пользователя
  getName() {
    return this.userName;
  }

  // Абстрактный метод для валидации имени
  validate() {
    throw new Error("Method 'validate()' must be implemented.");
  }
}

module.exports = Name;
