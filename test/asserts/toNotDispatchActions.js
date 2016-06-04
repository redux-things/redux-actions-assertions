import expect from 'expect';
import { toNotDispatchActions } from '../../src/asserts/toNotDispatchActions';
import * as assertions from '../../src/asserts/toNotDispatchActionsWithState';
import { getInitialStoreState } from '../../src/initialState';

describe('toNotDispatchActions', () => {
  const initialState = getInitialStoreState();
  const actualAction = { actualAction: 'actualAction' };
  const expectedAction = { expectedAction: 'expectedAction' };
  const spyDone = expect.createSpy();
  const spyFail = expect.createSpy();
  const toNotDispatchActionsWithStateResult = { result: 'result' };

  beforeEach(() => {
    expect.spyOn(assertions, 'toNotDispatchActionsWithState')
      .andReturn(toNotDispatchActionsWithStateResult);
  });

  afterEach(() => {
    expect.restoreSpies();
  });

  it('should be function', () => { expect(toNotDispatchActions).toBeA('function'); });

  it('should call toNotDispatchActionsWithState with initialState', () => {
    toNotDispatchActions(actualAction, expectedAction, spyDone, spyFail);

    expect(assertions.toDispatchActionsWithState)
      .toHaveBeenCalledWith(initialState, actualAction, expectedAction, spyDone, spyFail);
  });

  it('should return result of toNotDispatchActionsWithState', () => {
    const result = toNotDispatchActions(actualAction, expectedAction, spyDone, spyFail);

    expect(result).toBe(toNotDispatchActionsWithStateResult);
  });
});
