import chai from 'chai';
import assertions from '../assertions';

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
        assertions.toDispatchActionsWithState(state, this._obj, expectedActions, done);
      } else {
        assertions.toDispatchActions(this._obj, expectedActions, done);
      }
    }

    function isDispatchingWithState(actualAction, expectedActions, state, done) {
      new _chai.Assertion(actualAction)
        .with.state(state)
        .to.dispatch.actions(expectedActions, done);
    }

    function isDispatching(actualAction, expectedActions, done) {
      new _chai.Assertion(actualAction)
        .to.dispatch.actions(expectedActions, done);
    }

    _chai.Assertion.addChainableMethod('state', stateMethod);
    _chai.Assertion.addProperty('dispatch', dispatchProperty);
    _chai.Assertion.addMethod('actions', dispatchActionsMethod);
    _chai.assert.isDispatching = isDispatching;
    _chai.assert.isDispatchingWithState = isDispatchingWithState;
  });
}

export {
  registerAssertions
};
