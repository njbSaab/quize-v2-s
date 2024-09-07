// src/utils/formatDate.js
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // Преобразуем Unix timestamp в объект Date
  const day = String(date.getDate()).padStart(2, "0"); // Добавляем ведущий ноль для дня
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Добавляем ведущий ноль для месяца
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0"); // Часы
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Минуты

  return `${hours}:${minutes}_${day}-${month}-${year}`; // Форматируем дату
};

module.exports = formatDate;
