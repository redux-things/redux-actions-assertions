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

function toNotDispatchActions(expectedActions, done) {
  if (this.state) {
    return assertions.toNotDispatchActionsWithState(this.state, this.actual, expectedActions, done);
  }
  return assertions.toNotDispatchActions(this.actual, expectedActions, done);
}

function registerAssertions() {
  expect.extend({
    toDispatchActions,
    toNotDispatchActions,
    withState
  });
}

export {
  registerAssertions
};
