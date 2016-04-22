import should from 'should';
import thunk from 'redux-thunk';
import { registerMiddlewares } from '../../src';
import { registerAssertions } from '../../src/should';
import actions from '../testingData/actions';

registerMiddlewares([thunk]);
registerAssertions();

describe('should', () => {
  describe('.withState', () => {
    it('should accept object', (done) => {
      should(actions.actionCreatorWithGetState())
        .withState({ property: 'value' })
        .dispatchActions(actions.actionWithGetState({ property: 'value' }), done);
    });

    it('should accept function', (done) => {
      should(actions.actionCreatorWithGetState())
        .withState(() => { return { property: 'value' }; })
        .dispatchActions(actions.actionWithGetState({ property: 'value' }), done);
    });

    it('should work with .should', (done) => {
      actions.actionCreatorWithGetState().should
        .withState(() => { return { property: 'value' }; })
        .dispatchActions(actions.actionWithGetState({ property: 'value' }), done);
    });

    it('should have alias .state', (done) => {
      should(actions.actionCreatorWithGetState())
        .with.state(() => { return { property: 'value' }; })
        .dispatchActions(actions.actionWithGetState({ property: 'value' }), done);
    });
  });

  describe('.dispatchActions', () => {
    it('should accept single action', (done) => {
      should(actions.start()).dispatchActions(actions.start(), done);
    });

    it('should accept array with one action', (done) => {
      should(actions.start()).dispatchActions([actions.start()], done);
    });

    it('should accept array with multiple actions', (done) => {
      should(actions.asyncActionCreator())
        .dispatchActions(actions.expectedActions, done);
    });

    it('should accept array with nested async action creators', (done) => {
      should(actions.parentAsyncActionCreator())
        .dispatchActions(actions.expectedParentActions, done);
    });

    it('should work with .should', (done) => {
      actions.parentAsyncActionCreator().should
        .dispatchActions(actions.expectedParentActions, done);
    });
  });
});
