'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toDispatchActions = require('./toDispatchActions');

var _toDispatchActions2 = _interopRequireDefault(_toDispatchActions);

var _toDispatchActionsWithState = require('./toDispatchActionsWithState');

var _toDispatchActionsWithState2 = _interopRequireDefault(_toDispatchActionsWithState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { toDispatchActions: _toDispatchActions2.default, toDispatchActionsWithState: _toDispatchActionsWithState2.default };