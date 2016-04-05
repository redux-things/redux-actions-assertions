import { should, expect, assert } from 'chai';
import thunk from 'redux-thunk';
import { registerMiddlewares } from '../../src';
import { registerAssertions } from '../../src/chai';
import actions from '../testingData/actions';

should();
registerMiddlewares([thunk]);
registerAssertions();

describe('chai', () => {
  describe('expect', () => {
    describe('.with.state', () => {
      it('should accept object', (done) => {
        expect(actions.actionCreatorWithGetState())
          .with.state({ property: 'value' })
          .to.dispatch.actions(actions.actionWithGetState({ property: 'value' }), done);
      });

      it('should accept function', (done) => {
        expect(actions.actionCreatorWithGetState())
          .with.state(() => { return { property: 'value' };})
          .to.dispatch.actions(actions.actionWithGetState({ property: 'value' }), done);
      });
    });

    describe('.dispatch.actions', () => {
      it('should accept single action', (done) => {
        expect(actions.start())
          .to.dispatch.actions(actions.start(), done);
      });

      it('should accept array with one action', (done) => {
        expect(actions.start())
          .to.dispatch.actions([actions.start()], done);
      });

      it('should accept array with multiple actions', (done) => {
        expect(actions.asyncActionCreator())
          .to.dispatch.actions(actions.expectedActions, done);
      });

      it('should accept array with nested async action creators', (done) => {
        expect(actions.parentAsyncActionCreator())
          .to.dispatch.actions(actions.expectedParentActions, done);
      });
    });
  });

  describe('should', () => {
    describe('.with.state', () => {
      it('should accept object', (done) => {
        actions.actionCreatorWithGetState().should
          .with.state({ property: 'value' })
          .dispatch.actions(actions.actionWithGetState({ property: 'value' }), done);
      });

      it('should accept function', (done) => {
        actions.actionCreatorWithGetState().should
          .with.state(() => { return { property: 'value' };})
          .dispatch.actions(actions.actionWithGetState({ property: 'value' }), done);
      });
    });

    describe('.dispath.actions', () => {
      it('should accept single action', (done) => {
        actions.start().should
          .dispatch.actions(actions.start(), done);
      });

      it('should accept array with one action', (done) => {
        actions.start().should
          .dispatch.actions([actions.start()], done);
      });

      it('should accept array with multiple actions', (done) => {
        actions.asyncActionCreator().should
          .dispatch.actions(actions.expectedActions, done);
      });

      it('should accept array with nested async action creators', (done) => {
        actions.parentAsyncActionCreator().should
          .dispatch.actions(actions.expectedParentActions, done);
      });
    });
  });

  describe('assert', () => {
    describe('isDispatchingWithState', () => {
      it('should accept object as third argument', (done) => {
        assert.isDispatchingWithState(
          actions.actionCreatorWithGetState(),
          actions.actionWithGetState({ property: 'value' }),
          { property: 'value' },
          done
        );
      });

      it('should accept function as third argument', (done) => {
        assert.isDispatchingWithState(
          actions.actionCreatorWithGetState(),
          actions.actionWithGetState({ property: 'value' }),
          () => { return { property: 'value' };},
          done
        );
      });
    });

    describe('isDispatching', () => {
      it('should accept single action', (done) => {
        assert.isDispatching(
          actions.start(),
          actions.start(),
          done
        );
      });

      it('should accept array with one action', (done) => {
        assert.isDispatching(
          actions.start(),
          [actions.start()],
          done
        );
      });

      it('should accept array with multiple actions', (done) => {
        assert.isDispatching(
          actions.asyncActionCreator(),
          actions.expectedActions,
          done
        );
      });

      it('should accept array with nested async action creators', (done) => {
        assert.isDispatching(
          actions.parentAsyncActionCreator(),
          actions.expectedParentActions,
          done
        );
      });
    });
  });
});
