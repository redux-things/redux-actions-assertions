'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerAssertions = undefined;

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _assertions = require('../assertions');

var _assertions2 = _interopRequireDefault(_assertions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toDispatchActions(expectedActions, done) {
  if (this.state) {
    return _assertions2.default.toDispatchActionsWithState(this.state, this.actual, expectedActions, done);
  }
  return _assertions2.default.toDispatchActions(this.actual, expectedActions, done);
}

function withState(state) {
  this.state = state;

  return this;
}

function registerAssertions() {
  _expect2.default.extend({
    toDispatchActions: toDispatchActions,
    withState: withState
  });
}

exports.registerAssertions = registerAssertions;