import { getInitialStoreState } from '../initialState';
import { toDispatchActionsWithState } from './toDispatchActionsWithState';

function toDispatchActions(action, expectedActions, done, fail) {
  return toDispatchActionsWithState(
    getInitialStoreState(),
    action,
    expectedActions,
    done, fail
  );
}

export { toDispatchActions };
