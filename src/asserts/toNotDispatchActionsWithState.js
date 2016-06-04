import { performAssertion } from './utils/performAssertion';
import { assertNotDispatchedActions } from './utils/assertNotDispatchedActions';

function toNotDispatchActionsWithState(initialState, action, expectedActions, done, fail) {
  performAssertion(assertNotDispatchedActions, initialState, action, expectedActions, done, fail);
}

export { toNotDispatchActionsWithState };
