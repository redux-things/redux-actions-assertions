import { isFunction, isObject } from '../../utils';
import { getDispatchedActions } from './getDispatchedActions';
import { unrollActions } from './unrollActions';

function performAssertion(assertFunction, initialState, action, expectedActions, done, fail) {
  if (!isFunction(action) && !isObject(action)) {
    throw new Error(
      'The "action" argument must be a function or an object'
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

  return getDispatchedActions(initialState, action).then((dispatchedActions) => {
    return unrollActions(initialState, expectedActions).then((expectedUnrolledActions) => {
      assertFunction(dispatchedActions, expectedUnrolledActions);

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

export { performAssertion };
