"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require("fs");

var path = require("path");

var userStateFilePath = path.join(__dirname, "userState.json"); // Функция для загрузки состояния пользователей

var loadUserState = function loadUserState() {
  if (fs.existsSync(userStateFilePath)) {
    var data = fs.readFileSync(userStateFilePath, "utf8");
    return JSON.parse(data);
  }

  return {};
}; // Функция для сохранения состояния пользователей


var saveUserState = function saveUserState(userState) {
  fs.writeFileSync(userStateFilePath, JSON.stringify(userState, null, 2));
}; // Функция для получения состояния пользователя


var getUserState = function getUserState(userId) {
  var userState = loadUserState();
  return userState[userId] || {};
}; // Функция для обновления состояния пользователя


var updateUserState = function updateUserState(userId, newState) {
  var userState = loadUserState();
  userState[userId] = _objectSpread({}, userState[userId], {}, newState);
  saveUserState(userState);
}; // Экспорт функций


module.exports = {
  getUserState: getUserState,
  updateUserState: updateUserState
};