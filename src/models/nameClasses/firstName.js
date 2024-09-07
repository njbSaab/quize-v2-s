const Name = require("../name"); // Импортируем абстрактный класс Name

class FirstName extends Name {
  constructor(userId, userName) {
    super(userId, userName);
  }

  // Реализация метода валидации имени
  validate() {
    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(this.userName)) {
      console.log("Invalid name. Only letters are allowed.");
      return false;
    }
    console.log("Name is valid.", this.userName);
    return true;
  }
}

module.exports = FirstName;
