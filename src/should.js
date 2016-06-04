import should from 'should';
import assertions from './assertions';
import ActionWithInitialState from './actionWithInitialState';

function withState(state) {
  this.obj = new ActionWithInitialState(this.obj, state);
}

function dispatchActionsFunction(assert, assertWithState, expectedActions, done) {
  if (this.obj instanceof ActionWithInitialState) {
    const action = this.obj.action;
    const state = this.obj.state;
    assertWithState(state, action, expectedActions, done);
  } else {
    assert(this.obj, expectedActions, done);
  }
}

function dispatchActions(expectedActions, done) {
  dispatchActionsFunction.call(
    this,
    assertions.toDispatchActions,
    assertions.toDispatchActionsWithState,
    expectedActions,
    done
  );
}

function notDispatchActions(expectedActions, done) {
  dispatchActionsFunction.call(
    this,
    assertions.toNotDispatchActions,
    assertions.toNotDispatchActionsWithState,
    expectedActions,
    done
  );
}

function registerAssertions() {
  should.Assertion.add('withState', withState);
  should.Assertion.alias('withState', 'state');
  should.Assertion.add('dispatchActions', dispatchActions);
  should.Assertion.add('notDispatchActions', notDispatchActions);
}

export {
  registerAssertions
};
