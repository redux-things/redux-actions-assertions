/* eslint-env jasmine */
import { assertions } from 'redux-actions-assertions-js';

function toDispatchActions() {
  return {
    compare(action, expectedActions, done) {
      assertions.toDispatchActions(action, expectedActions, done, done.fail);
      return { pass: true };
    },
    negativeCompare(action, expectedActions, done) {
      assertions.toNotDispatchActions(action, expectedActions, done, done.fail);
      return { pass: true };
    }
  };
}

function toNotDispatchActions() {
  return {
    compare(action, expectedActions, done) {
      assertions.toNotDispatchActions(action, expectedActions, done, done.fail);
      return { pass: true };
    }
  };
}

function toDispatchActionsWithState() {
  return {
    compare(action, state, expectedActions, done) {
      assertions.toDispatchActionsWithState(state, action, expectedActions, done, done.fail);
      return { pass: true };
    },
    negativeCompare(action, state, expectedActions, done) {
      assertions.toNotDispatchActionsWithState(state, action, expectedActions, done, done.fail);
      return { pass: true };
    }
  };
}

function toNotDispatchActionsWithState() {
  return {
    compare(action, state, expectedActions, done) {
      assertions.toNotDispatchActionsWithState(state, action, expectedActions, done, done.fail);
      return { pass: true };
    }
  };
}

const matchers = {
  toDispatchActions,
  toNotDispatchActions,
  toDispatchActionsWithState,
  toNotDispatchActionsWithState
};

function registerAssertions() {
  jasmine.addMatchers(matchers);
}

export {
  registerAssertions
};
