import { isFunction, isObject } from '../utils';
import { getDispatchedActions, unrollActions, assertDispatchedActions } from './actionUtils';

function toDispatchActionsWithState(initialState, actionUnderTest, expectedActions, done, fail) {
  if (!isFunction(actionUnderTest) && !isObject(actionUnderTest)) {
    throw new Error(
      'The "actualAction" argument must be a function or an object'
    );
  }

  if (!isFunction(expectedActions) &&
      !isObject(expectedActions) &&
      !Array.isArray(expectedActions)) {
    throw new Error(
      'The "expectedActions" argument must be ' +
      'an action creator function, an action object, or an array of them'
    );
  }

  return getDispatchedActions(initialState, actionUnderTest).then((dispatchedActions) => {
    return unrollActions(initialState, expectedActions).then((expectedUnrolledActions) => {
      assertDispatchedActions(dispatchedActions, expectedUnrolledActions);

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
