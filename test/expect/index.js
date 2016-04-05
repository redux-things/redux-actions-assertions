import expect from 'expect';
import thunk from 'redux-thunk';
import { registerMiddlewares } from '../../src';
import { registerAssertions } from '../../src/expect';
import actions from '../testingData/actions';

registerMiddlewares([thunk]);
registerAssertions();

describe('expect', () => {
  describe('with initial state', () => {
    it('should accept object and setup getState', (done) => {
      expect(actions.actionCreatorWithGetState())
        .withState({ property: 'value' })
        .toDispatchActions(actions.actionWithGetState({ property: 'value' }), done);
    });

    it('should accept function and setup getState', (done) => {
      expect(actions.actionCreatorWithGetState())
        .withState(() => { return { property: 'value' };})
        .toDispatchActions(actions.actionWithGetState({ property: 'value' }), done);
    });
  });

  describe('.withState', () => {
    it('should accept object and setup getState', (done) => {
      expect(actions.actionCreatorWithGetState())
        .withState({ property: 'value' })
        .toDispatchActions(actions.actionWithGetState({ property: 'value' }), done);
    });

    it('should accept function and setup getState', (done) => {
      expect(actions.actionCreatorWithGetState())
        .withState(() => { return { property: 'value' };})
        .toDispatchActions(actions.actionWithGetState({ property: 'value' }), done);
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
});
