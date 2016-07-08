import chai from 'chai';
import { assertions } from 'redux-actions-assertions-js';

function registerAssertions() {
  chai.use((_chai, utils) => {
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

      const state = utils.flag(this, 'state');
      if (state) {
        if (utils.flag(this, 'negate')) {
          return assertions.toNotDispatchActionsWithState(state, this._obj, expectedActions, done);
        }
        return assertions.toDispatchActionsWithState(state, this._obj, expectedActions, done);
      }
      if (utils.flag(this, 'negate')) {
        return assertions.toNotDispatchActions(this._obj, expectedActions, done);
      }
      return assertions.toDispatchActions(this._obj, expectedActions, done);
    }

    function isDispatching(actualAction, expectedActions, done) {
      new _chai.Assertion(actualAction)
        .to.dispatch.actions(expectedActions, done);
    }

    function isDispatchingWithState(actualAction, expectedActions, state, done) {
      new _chai.Assertion(actualAction)
        .with.state(state)
        .to.dispatch.actions(expectedActions, done);
    }

    function isNotDispatching(actualAction, expectedActions, done) {
      new _chai.Assertion(actualAction)
        .to.not.dispatch.actions(expectedActions, done);
    }

    function isNotDispatchingWithState(actualAction, expectedActions, state, done) {
      new _chai.Assertion(actualAction)
        .with.state(state)
        .to.not.dispatch.actions(expectedActions, done);
    }

    _chai.Assertion.addChainableMethod('state', stateMethod);
    _chai.Assertion.addProperty('dispatch', dispatchProperty);
    _chai.Assertion.addMethod('actions', dispatchActionsMethod);
    _chai.assert.isDispatching = isDispatching;
    _chai.assert.isDispatchingWithState = isDispatchingWithState;
    _chai.assert.isNotDispatching = isNotDispatching;
    _chai.assert.isNotDispatchingWithState = isNotDispatchingWithState;
  });
}

export {
  registerAssertions
};
