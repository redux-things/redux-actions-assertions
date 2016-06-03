'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function isObject(action) {
  return (typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object';
}

function isFunction(action) {
  return typeof action === 'function';
}

function toArray(value) {
  return !Array.isArray(value) ? [value] : value;
}

exports.isObject = isObject;
exports.isFunction = isFunction;
exports.toArray = toArray;