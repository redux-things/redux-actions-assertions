import should from 'should';
import assertions from '../assertions';

function ActionWithInitialState(action, state) {
  this.action = action;
  this.state = state;
}

function withState(state) {
  this.obj = new ActionWithInitialState(this.obj, state);
}

function dispatchActions(expectedActions, done) {
  if (this.obj instanceof ActionWithInitialState) {
    const action = this.obj.action;
    const state = this.obj.state;
    assertions.toDispatchActionsWithState(state, action, expectedActions, done);
  }
  assertions.toDispatchActions(this.obj, expectedActions, done);
}

function registerAssertions() {
  should.Assertion.add('withState', withState);
  should.Assertion.alias('withState', 'state');
  should.Assertion.add('dispatchActions', dispatchActions);
}

export {
  registerAssertions
};
