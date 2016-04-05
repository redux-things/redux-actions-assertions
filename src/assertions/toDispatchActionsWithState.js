import flattenDeep from 'lodash.flattendeep';
import find from 'lodash.find';
import { isFunction, isObject, toArray } from '../utils';
import getMockStore from '../mockStore';

function getDispatchedActions(initialState, action) {
  return new Promise((resolve, reject) => {
    const store = getMockStore()(initialState);
    const dispatchResult = store.dispatch(action);

    if (dispatchResult instanceof Promise) {
      dispatchResult.then(() => {
        resolve(store.getActions());
      }).catch((result) => {
        reject(result);
      });
    } else {
      resolve(store.getActions());
    }
  });
}

function unrollActions(initialState, expectedActions) {
  const promises = [];
  const actions = toArray(expectedActions);

  for (let index = 0; index < actions.length; index++) {
    promises.push(getDispatchedActions(initialState, actions[index]));
  }

  return Promise.all(promises).then((resultActions) => {
    return flattenDeep(resultActions);
  });
}

function toDispatchActionsWithState(initialState, actionUnderTest, expectedActions, done, fail) {
  if (!isFunction(actionUnderTest) && !isObject(actionUnderTest)) {
    throw new Error(
      'The "actualAction" argument must be a function or object'
    );
  }

  if (!isFunction(expectedActions) && !isObject(expectedActions)) {
    throw new Error(
      'The "expectedActions" argument must be ' +
      'an action creator function or an action object or an array of them'
    );
  }

  return getDispatchedActions(initialState, actionUnderTest).then((dispatchedActions) => {
    return unrollActions(initialState, expectedActions).then((expectedUnrolledActions) => {
      for (let index = 0; index < expectedUnrolledActions.length; index++) {
        if (!find(dispatchedActions, expectedUnrolledActions[index])) {
          throw new Error(
            `Expected action ${JSON.stringify(expectedUnrolledActions[index])} was not dispatched.`
          );
        }
      }
      if (isFunction(done)) {
        done();
      }
    }).catch((err) => {
      if (isFunction(fail)) {
        fail(err);
        return;
      } else if (isFunction(done)) {
        done(err);
        return;
      }
      throw new Error(err);
    });
  });
}

export default toDispatchActionsWithState;
