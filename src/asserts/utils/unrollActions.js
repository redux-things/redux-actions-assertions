import flattenDeep from 'lodash.flattendeep';
import { toArray } from '../../utils';
import { getDispatchedActions } from './getDispatchedActions';

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

export { unrollActions };
