'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerMiddlewares = undefined;

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = [];

function registerMiddlewares(newMiddlewares) {
  middlewares = (0, _utils.toArray)(newMiddlewares);
}

function getMockStore() {
  return (0, _reduxMockStore2.default)(middlewares);
}

exports.registerMiddlewares = registerMiddlewares;
exports.default = getMockStore;