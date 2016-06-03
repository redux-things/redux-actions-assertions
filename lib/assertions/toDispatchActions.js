'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _initialState = require('../initialState');

var _initialState2 = _interopRequireDefault(_initialState);

var _toDispatchActionsWithState = require('./toDispatchActionsWithState');

var _toDispatchActionsWithState2 = _interopRequireDefault(_toDispatchActionsWithState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toDispatchActions(actionUnderTest, expectedActions, done, fail) {
  return (0, _toDispatchActionsWithState2.default)((0, _initialState2.default)(), actionUnderTest, expectedActions, done, fail);
}

exports.default = toDispatchActions;