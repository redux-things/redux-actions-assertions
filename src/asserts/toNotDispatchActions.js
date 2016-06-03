
import getInitialStoreState from '../initialState';
import { toDispatchActionsWithState } from './toDispatchActionsWithState';

function toDispatchActions(actionUnderTest, unExpectedActions, done, fail) {
  return toDispatchActionsWithState(
    getInitialStoreState(),
    actionUnderTest,
    unExpectedActions,
    done, fail
  );
}

export { toDispatchActions };
