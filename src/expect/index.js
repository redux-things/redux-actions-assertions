import expect from 'expect';
import assertions from '../assertions';

function toDispatchActions(expectedActions, done) {
  if (this.state) {
    return assertions.toDispatchActionsWithState(this.state, this.actual, expectedActions, done);
  }
  return assertions.toDispatchActions(this.actual, expectedActions, done);
}

function withState(state) {
  this.state = state;

  return this;
}

function registerAssertions() {
  expect.extend({
    toDispatchActions,
    withState
  });
}

export {
  registerAssertions
};
