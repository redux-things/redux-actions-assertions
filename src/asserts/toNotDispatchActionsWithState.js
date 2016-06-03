import { isFunction, isObject } from '../utils';
import {
  getDispatchedActions,
  unrollActions,
  assertDispatchedActions,
  assertUnDispatchedActions
} from './actionUtils';

function toDispatchActionsWithState(initialState, actionUnderTest, unExpectedActions, done, fail) {
  if (!isFunction(actionUnderTest) && !isObject(actionUnderTest)) {
    throw new Error(
      'The "actualAction" argument must be a function or an object'
    );
  }

  if (!isFunction(unExpectedActions) &&
      !isObject(unExpectedActions) &&
      !Array.isArray(unExpectedActions)) {
    throw new Error(
      'The "unExpectedActions" argument must be ' +
      'an action creator function, an action object, or an array of them'
    );
  }

  return getDispatchedActions(initialState, actionUnderTest).then((dispatchedActions) => {
    return unrollActions(initialState, unExpectedActions).then((unExpectedUnrolledActions) => {
      assertUnDispatchedActions(dispatchedActions, unExpectedUnrolledActions);

      if (isFunction(done)) {
        done();
      }
    });
  }).catch((err) => {
    if (isFunction(fail)) {
      fail(err);
      return;
    } else if (isFunction(done)) {
      done(err);
      return;
    }
    throw new Error(JSON.stringify(err));
  });
}

export {
  toDispatchActionsWithState
};
