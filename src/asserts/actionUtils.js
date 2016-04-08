import find from 'lodash.find';
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

function assertDispatchedActions(dispatched, expected) {
  for (let index = 0; index < expected.length; index++) {
    if (!find(dispatched, expected[index])) {
      throw new Error(
        `Expected action ${JSON.stringify(expected[index])} was not dispatched.\n` +
        `Actual dispatched actions: ${JSON.stringify(dispatched)}`
      );
    }
  }
}

export {
  getDispatchedActions,
  unrollActions,
  assertDispatchedActions
};
