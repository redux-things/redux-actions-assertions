'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerAssertions = undefined;

var _chai2 = require('chai');

var _chai3 = _interopRequireDefault(_chai2);

var _assertions = require('../assertions');

var _assertions2 = _interopRequireDefault(_assertions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerAssertions() {
  _chai3.default.use(function (_chai, utils) {
    function stateMethod(stateValue) {
      utils.flag(this, 'state', stateValue);
    }

    function dispatchProperty() {
      utils.flag(this, 'dispatch', true);
    }

    function dispatchActionsMethod(expectedActions, done) {
      if (!utils.flag(this, 'dispatch')) {
        throw new Error('"actions" should be used after "dispatch"');
      }

      var state = utils.flag(this, 'state');
      if (state) {
        return _assertions2.default.toDispatchActionsWithState(state, this._obj, expectedActions, done);
      }
      return _assertions2.default.toDispatchActions(this._obj, expectedActions, done);
    }

    function isDispatchingWithState(actualAction, expectedActions, state, done) {
      new _chai.Assertion(actualAction).with.state(state).to.dispatch.actions(expectedActions, done);
    }

    function isDispatching(actualAction, expectedActions, done) {
      new _chai.Assertion(actualAction).to.dispatch.actions(expectedActions, done);
    }

    _chai.Assertion.addChainableMethod('state', stateMethod);
    _chai.Assertion.addProperty('dispatch', dispatchProperty);
    _chai.Assertion.addMethod('actions', dispatchActionsMethod);
    _chai.assert.isDispatching = isDispatching;
    _chai.assert.isDispatchingWithState = isDispatchingWithState;
  });
}

exports.registerAssertions = registerAssertions;