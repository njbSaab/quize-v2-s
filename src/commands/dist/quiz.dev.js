"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("../controllers/quizController"),
    getQuestions = _require.getQuestions;

var _require2 = require("../models/userState"),
    getUserState = _require2.getUserState,
    updateUserState = _require2.updateUserState;

var isQuizProcessing = false;

var quizCommand = function quizCommand(ctx) {
  var userId = ctx.message.from.id;
  var userState = getUserState(userId);

  if (!userState || userState.step !== "ready_for_quiz") {
    ctx.reply("Сначала предоставьте свое имя или начните с команды /start.");
    return;
  }

  if (isQuizProcessing) {
    ctx.reply("Подождите, предыдущий запрос еще обрабатывается.");
    return;
  }

  isQuizProcessing = true; // Получаем текущий индекс вопроса

  var currentQuestionIndex = userState.currentQuestionIndex || 0;
  getQuestions(function (err, questions) {
    if (err || !questions || questions.length === 0) {
      ctx.reply("Произошла ошибка при загрузке вопросов.");
      isQuizProcessing = false;
      return;
    }

    if (currentQuestionIndex >= questions.length) {
      ctx.reply("Викторина завершена.");
      updateUserState(userId, _objectSpread({}, userState, {
        step: "completed_quiz"
      }));
      isQuizProcessing = false;
      return;
    }

    var question = questions[currentQuestionIndex]; // Отправляем текущий вопрос пользователю

    ctx.reply("\u0412\u043E\u043F\u0440\u043E\u0441: ".concat(question.question));
    ctx.reply("1. ".concat(question.var1));
    ctx.reply("2. ".concat(question.var2));
    ctx.reply("3. ".concat(question.var3));
    ctx.reply("4. ".concat(question.var4)); // Обновляем состояние пользователя, увеличивая индекс

    updateUserState(userId, _objectSpread({}, userState, {
      currentQuestionIndex: currentQuestionIndex + 1
    }));
    isQuizProcessing = false;
  });
};

module.exports = quizCommand;