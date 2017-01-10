/* eslint-env jasmine */
import { assertions } from 'redux-actions-assertions-js';

const toDispatchActions = () => {
  return {
    compare(action, expectedActions, done) {
      assertions.toDispatchActions(action, expectedActions, done, done.fail);
      return { pass: true };
    }
  };
};

const toNotDispatchActions = () => {
  return {
    compare(action, expectedActions, done) {
      assertions.toNotDispatchActions(action, expectedActions, done, done.fail);
      return { pass: true };
    }
  };
};

const toDispatchActionsWithState = () => {
  return {
    compare(action, state, expectedActions, done) {
      assertions.toDispatchActionsWithState(state, action, expectedActions, done, done.fail);
      return { pass: true };
    }
  };
};

const toNotDispatchActionsWithState = () => {
  return {
    compare(action, state, expectedActions, done) {
      assertions.toNotDispatchActionsWithState(state, action, expectedActions, done, done.fail);
      return { pass: true };
    }
  };
};

const matchers = {
  toDispatchActions,
  toNotDispatchActions,
  toDispatchActionsWithState,
  toNotDispatchActionsWithState
};

const registerAssertions = () => {
  jasmine.addMatchers(matchers);
};

export {
  registerAssertions,
  matchers
};
