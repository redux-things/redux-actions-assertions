import expect from 'expect.js';
import assertions from './assertions';
import ActionWithInitialState from './actionWithInitialState';

function withState(state) {
  return expect(new ActionWithInitialState(this.obj, state));
}

function dispatchActions(expectedActions, done) {
  if (this.obj instanceof ActionWithInitialState) {
    const action = this.obj.action;
    const state = this.obj.state;
    if (this.flags.not) {
      assertions.toNotDispatchActionsWithState(state, action, expectedActions, done);
    } else {
      assertions.toDispatchActionsWithState(state, action, expectedActions, done);
    }
  } else {
    if (this.flags.not) {
      assertions.toNotDispatchActions(this.obj, expectedActions, done);
    } else {
      assertions.toDispatchActions(this.obj, expectedActions, done);
    }
  }
}

function registerAssertions() {
  expect.Assertion.prototype.withState = withState;
  expect.Assertion.prototype.dispatchActions = dispatchActions;
}

export {
  registerAssertions
};
