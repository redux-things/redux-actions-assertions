'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerAssertions = undefined;

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _assertions = require('../assertions');

var _assertions2 = _interopRequireDefault(_assertions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ActionWithInitialState(action, state) {
  this.action = action;
  this.state = state;
}

function withState(state) {
  this.obj = new ActionWithInitialState(this.obj, state);
}

function dispatchActions(expectedActions, done) {
  if (this.obj instanceof ActionWithInitialState) {
    var action = this.obj.action;
    var state = this.obj.state;
    _assertions2.default.toDispatchActionsWithState(state, action, expectedActions, done);
  } else {
    _assertions2.default.toDispatchActions(this.obj, expectedActions, done);
  }
}

function registerAssertions() {
  _should2.default.Assertion.add('withState', withState);
  _should2.default.Assertion.alias('withState', 'state');
  _should2.default.Assertion.add('dispatchActions', dispatchActions);
}

exports.registerAssertions = registerAssertions;