import findIndex from 'lodash.findindex';
import { dispatchedActionError } from '../errors/dispatchedActionError';

function assertNotDispatchedActions(dispatched, expected) {
  for (let indexInExpected = 0; indexInExpected < expected.length; indexInExpected++) {
    if (findIndex(dispatched, expected[indexInExpected]) !== -1) {
      throw dispatchedActionError(dispatched, expected, expected[indexInExpected]);
    }
  }
}

export { assertNotDispatchedActions };
