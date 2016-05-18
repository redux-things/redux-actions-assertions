import findIndex from 'lodash.findindex';
import flattenDeep from 'lodash.flattendeep';
import { toArray } from '../utils';
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

function notDispatchedError(dispatchedActions, expectedActions, expectedAction) {
  return new Error(
    `Expected action ${JSON.stringify(expectedAction)} was not dispatched.\n` +
    `Expected dispatched actions: ${JSON.stringify(expectedActions)}` +
    `Actual dispatched actions: ${JSON.stringify(dispatchedActions)}`
  );
}

function assertDispatchedActions(dispatched, expected) {
  const availableActions = dispatched.slice();

  for (let indexInExpected = 0; indexInExpected < expected.length; indexInExpected++) {
    const indexInAvailable = findIndex(availableActions, expected[indexInExpected]);

    if (indexInAvailable !== -1) {
      availableActions.splice(indexInAvailable, 1);
    } else {
      throw notDispatchedError(dispatched, expected, expected[indexInExpected]);
    }
  }
}

export {
  getDispatchedActions,
  unrollActions,
  assertDispatchedActions
};
