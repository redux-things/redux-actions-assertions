import expect from 'expect';
import * as performAssertionObj from '../../src/asserts/utils/performAssertion';
import * as assertNotDispatchedActionsObj from '../../src/asserts/utils/assertNotDispatchedActions';
import { toNotDispatchActionsWithState } from '../../src/asserts/toNotDispatchActionsWithState';
import { getInitialStoreState } from '../../src/initialState';

describe('toNotDispatchActionsWithState', () => {
  const initialState = getInitialStoreState();
  const actualAction = { actualAction: 'actualAction' };
  const expectedAction = { expectedAction: 'expectedAction' };
  const spyDone = expect.createSpy();
  const spyFail = expect.createSpy();

  beforeEach(() => {
    expect.spyOn(performAssertionObj, 'performAssertion');
    expect.spyOn(assertNotDispatchedActionsObj, 'assertNotDispatchedActions');
  });

  afterEach(() => {
    expect.restoreSpies();
  });

  it('should be function', () => { expect(toNotDispatchActionsWithState).toBeA('function'); });

  it('should call performAssertion with assertNotDispatchedActions as first argument', () => {
    toNotDispatchActionsWithState(actualAction, expectedAction, spyDone, spyFail);

    expect(performAssertionObj.performAssertion).toHaveBeenCalledWith(
        assertNotDispatchedActionsObj.assertNotDispatchedActions,
        initialState,
        actualAction,
        expectedAction,
        spyDone,
        spyFail
      );
  });
});
