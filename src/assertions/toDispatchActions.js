import getInitialStoreState from '../initialState';
import { toDispatchActionsWithState } from './toDispatchActionsWithState';

function toDispatchActions(actionUnderTest, expectedActions, done, fail) {
  return toDispatchActionsWithState(
    getInitialStoreState(),
    actionUnderTest,
    expectedActions,
    done, fail
  );
}

export { toDispatchActions };
