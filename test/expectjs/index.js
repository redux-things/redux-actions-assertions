import expect from 'expect.js';
import thunk from 'redux-thunk';
import { registerMiddlewares } from '../../src';
import { registerAssertions } from '../../src/expectjs';
import actions from '../testingData/actions';

registerMiddlewares([thunk]);
registerAssertions();

describe('expect.js', () => {
  describe('.withState', () => {
    it('should accept object', (done) => {
      expect(actions.actionCreatorWithGetState())
        .withState({ property: 'value' })
        .to.dispatchActions(actions.actionWithGetState({ property: 'value' }), done);
    });

    it('should accept function', (done) => {
      expect(actions.actionCreatorWithGetState())
        .withState(() => { return { property: 'value' }; })
        .to.dispatchActions(actions.actionWithGetState({ property: 'value' }), done);
    });
  });

  describe('.dispatchActions', () => {
    it('should accept single action', (done) => {
      expect(actions.start()).to.dispatchActions(actions.start(), done);
    });

    it('should accept array with one action', (done) => {
      expect(actions.start()).to.dispatchActions([actions.start()], done);
    });

    it('should accept array with multiple actions', (done) => {
      expect(actions.asyncActionCreator())
        .to.dispatchActions(actions.expectedActions, done);
    });

    it('should accept array with nested async action creators', (done) => {
      expect(actions.parentAsyncActionCreator())
        .to.dispatchActions(actions.expectedParentActions, done);
    });
  });

  describe('not.dispatchActions', () => {
    it('should accept single action', (done) => {
      expect(actions.start()).to.not.dispatchActions(actions.anotherStart(), done);
    });

    it('should accept array with one action', (done) => {
      expect(actions.start()).to.not.dispatchActions([actions.anotherStart()], done);
    });

    it('should accept array with multiple actions', (done) => {
      expect(actions.asyncActionCreator())
        .to.not.dispatchActions(actions.anotherExpectedActions, done);
    });

    it('should accept array with nested async action creators', (done) => {
      expect(actions.parentAsyncActionCreator())
        .to.not.dispatchActions(actions.anotherParentExpectedActions, done);
    });
  });
});
