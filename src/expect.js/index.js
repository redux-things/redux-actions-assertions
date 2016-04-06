import expect from 'expect.js';
import assertions from '../assertions';
import ActionWithInitialState from '../ActionWithInitialState';

function withState(state) {
  return expect(new ActionWithInitialState(this.obj, state));
}

function dispatchActions(expectedActions, done) {
  if (this.obj instanceof ActionWithInitialState) {
    const action = this.obj.action;
    const state = this.obj.state;
    assertions.toDispatchActionsWithState(state, action, expectedActions, done);
  } else {
    assertions.toDispatchActions(this.obj, expectedActions, done);
  }
}

function registerAssertions() {
  expect.Assertion.prototype.withState = withState;
  expect.Assertion.prototype.dispatchActions = dispatchActions;
}

export {
  registerAssertions
};
