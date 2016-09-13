import test from 'tape';
import thunk from 'redux-thunk';

import { assertions, registerMiddlewares } from '../../src';
import actions from '../testingData/actions';

registerMiddlewares([thunk]);

test('tape', t => {
  t.plan(1);
  const msg = 'should pass with t.plan';

  assertions.toDispatchActionsWithState(
    { property: 'value' },
    actions.actionCreatorWithGetState(),
    actions.actionWithGetState({ property: 'value' }),
    t.pass.bind(this, msg),
    t.fail.bind(this, msg)
  );
});

test('tape', t => {
  const msg = 'should pass with t.end';

  assertions.toDispatchActionsWithState(
    { property: 'value' },
    actions.actionCreatorWithGetState(),
    actions.actionWithGetState({ property: 'value' }),
    t.pass.bind(this, msg),
    t.fail.bind(this, msg)
  ).then(t.end);
});
