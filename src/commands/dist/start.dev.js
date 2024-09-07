"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("../models/userState"),
    getUserState = _require.getUserState,
    updateUserState = _require.updateUserState;

var messages = require("../views/message");

module.exports = function (ctx) {
  var userId = ctx.message.from.id;
  var userState = getUserState(userId);
  console.log("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ".concat(userId, " \u0432\u044B\u0437\u0432\u0430\u043B \u043A\u043E\u043C\u0430\u043D\u0434\u0443 /start")); // Проверяем текущее состояние пользователя

  if (userState && userState.name) {
    // Если имя уже сохранено, обновляем шаг и текущий индекс вопросов
    updateUserState(userId, _objectSpread({}, userState, {
      step: "ready_for_quiz",
      currentQuestionIndex: 0
    }));
    ctx.reply("".concat(userState.name, ", \u0443\u0434\u0430\u0447\u043D\u043E\u0439 \u0438\u0433\u0440\u044B! \u041D\u0430\u0436\u043C\u0438\u0442\u0435 /quiz \u0434\u043B\u044F \u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u0438\u043A\u0442\u043E\u0440\u0438\u043D\u044B."));
  } else {
    // Если имени нет, обновляем состояние на "awaiting_name"
    ctx.reply(messages.welcomeMessage);
    ctx.reply("Как вас зовут?");
    updateUserState(userId, {
      step: "awaiting_name"
    });
  }
};