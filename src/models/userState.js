const fs = require("fs");
const path = require("path");

const userStateFilePath = path.join(__dirname, "userState.json");

// Функция для загрузки состояния пользователей
const loadUserState = () => {
  if (fs.existsSync(userStateFilePath)) {
    const data = fs.readFileSync(userStateFilePath, "utf8");
    return JSON.parse(data);
  }
  return {};
};

// Функция для сохранения состояния пользователей
const saveUserState = (userState) => {
  fs.writeFileSync(userStateFilePath, JSON.stringify(userState, null, 2));
};

// Функция для получения состояния пользователя
const getUserState = (userId) => {
  const userState = loadUserState();
  return userState[userId] || {};
};

// Функция для обновления состояния пользователя
const updateUserState = (userId, newState) => {
  const userState = loadUserState();
  userState[userId] = { ...userState[userId], ...newState };
  saveUserState(userState);
};

// Экспорт функций
module.exports = {
  getUserState,
  updateUserState,
};
