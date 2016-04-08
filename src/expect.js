import expect from 'expect';
import assertions from './assertions';

function withState(state) {
  this.state = state;
  return this;
}

function toDispatchActions(expectedActions, done) {
  if (this.state) {
    return assertions.toDispatchActionsWithState(this.state, this.actual, expectedActions, done);
  }
  return assertions.toDispatchActions(this.actual, expectedActions, done);
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
