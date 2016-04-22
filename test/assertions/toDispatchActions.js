import expect from 'expect';
import { toDispatchActions } from '../../src/asserts/toDispatchActions';
import * as assertions from '../../src/asserts/toDispatchActionsWithState';
import getInitialStoreState from '../../src/initialState';

describe('assertions', () => {
  describe('toDispatchActions', () => {
    const initialState = getInitialStoreState();
    const actualAction = { actualAction: 'actualAction' };
    const expectedAction = { expectedAction: 'expectedAction' };
    const spyDone = expect.createSpy();
    const spyFail = expect.createSpy();
    const toDispatchActionsWithStateResult = { result: 'result' };

    beforeEach(() => {
      expect.spyOn(assertions, 'toDispatchActionsWithState')
        .andReturn(toDispatchActionsWithStateResult);
    });

    afterEach(() => {
      expect.restoreSpies();
    });

    it('should be function', () => { expect(toDispatchActions).toBeA('function'); });

    it('should call toDispatchActionsWithState with initialState', () => {
      toDispatchActions(actualAction, expectedAction, spyDone, spyFail);

      expect(assertions.toDispatchActionsWithState)
        .toHaveBeenCalledWith(initialState, actualAction, expectedAction, spyDone, spyFail);
    });

    it('should return result of toDispatchActionsWithState', () => {
      const result = toDispatchActions(actualAction, expectedAction, spyDone, spyFail);

      expect(result).toBe(toDispatchActionsWithStateResult);
    });
  });
});
