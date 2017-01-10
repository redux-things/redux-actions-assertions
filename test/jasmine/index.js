/* eslint-env jasmine */
import thunk from 'redux-thunk';
import { registerMiddlewares } from '../../src';
import { registerAssertions } from '../../src/jasmine';
import actions from '../testingData/actions';

registerMiddlewares([thunk]);

describe('jasmine', () => {
  beforeEach(() => { registerAssertions(); });
  describe('toDispatchActionsWithState', () => {
    it('should accept object', (done) => {
      const state = { property: 'value' };
      expect(actions.actionCreatorWithGetState())
        .toDispatchActionsWithState(state, actions.actionWithGetState({ property: 'value' }), done);
    });
  });

  describe('.toDispatchActions', () => {
    it('should accept single action', (done) => {
      expect(actions.start()).toDispatchActions(actions.start(), done);
    });

    it('should accept array with one action', (done) => {
      expect(actions.start()).toDispatchActions([actions.start()], done);
    });

    it('should accept array with multiple actions', (done) => {
      expect(actions.asyncActionCreator())
        .toDispatchActions(actions.expectedActions, done);
    });

    it('should accept array with nested async action creators', (done) => {
      expect(actions.parentAsyncActionCreator())
        .toDispatchActions(actions.expectedParentActions, done);
    });
  });

  describe('.toNotDispatchActions', () => {
    it('should accept single action', (done) => {
      expect(actions.start()).toNotDispatchActions(actions.anotherStart(), done);
    });

    it('should accept array with one action', (done) => {
      expect(actions.start()).toNotDispatchActions([actions.anotherStart()], done);
    });

    it('should accept array with multiple actions', (done) => {
      expect(actions.asyncActionCreator())
        .toNotDispatchActions(actions.anotherExpectedActions, done);
    });

    it('should accept array with nested async action creators', (done) => {
      expect(actions.parentAsyncActionCreator())
        .toNotDispatchActions(actions.anotherParentExpectedActions, done);
    });
  });
});
