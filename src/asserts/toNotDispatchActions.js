import { getInitialStoreState } from '../initialState';
import { toNotDispatchActionsWithState } from './toNotDispatchActionsWithState';

function toNotDispatchActions(action, expectedActions, done, fail) {
  return toNotDispatchActionsWithState(
    getInitialStoreState(),
    action,
    expectedActions,
    done, fail
  );
}

export { toNotDispatchActions };
