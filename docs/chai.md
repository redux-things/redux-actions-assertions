# [chai](https://github.com/chaijs/chai)

## Registration

```js
// using ES6 modules
import { registerAssertions } from 'redux-actions-assertions/chai';

// using CommonJS modules
var registerAssertions = require('redux-actions-assertions/chai').registerAssertions;

// registration
registerAssertions();
```

## Usage

### .to.dispatch.actions or assert.isDispatching

> `expect(action).to.dispatch.actions(expectedActions, callback)`

> `action.should.dispatch.actions(expectedActions, callback)`

> `assert.isDispatching(action, expectedActions, callback)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
expect(myActionCreator())
  .to.dispatch.actions({ type: 'MY_ACTION_START' }, callback);

myActionCreator()
  .should.dispatch.actions({ type: 'MY_ACTION_START' }, callback);

assert.isDispatching(
  myActionCreator(),
  { type: 'MY_ACTION_START' },
  callback
);
```

### .not.to.dispatch.actions or .to.not.dispatch.actions or assert.isNotDispatching

> `expect(action).not.to.dispatch.actions(expectedActions, callback)`
> `expect(action).to.not.dispatch.actions(expectedActions, callback)`

> `action.should.not.dispatch.actions(expectedActions, callback)`

> `assert.isNotDispatching(action, expectedActions, callback)`

Asserts that when given `action` is dispatched it will not dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
expect(myActionCreator())
  .not.to.dispatch.actions({ type: 'MY_ACTION_START' }, callback);

myActionCreator()
  .should.not.dispatch.actions({ type: 'MY_ACTION_START' }, callback);

assert.isNotDispatching(
  myActionCreator(),
  { type: 'MY_ACTION_START' },
  callback
);
```

### .with.state or assert.isDispatchingWithState and assert.isNotDispatchingWithState

> `expect(action).with.state(state).to.dispatch.actions(expectedActions, callback)`
> `expect(action).with.state(state).not.to.dispatch.actions(expectedActions, callback)`
> `expect(action).with.state(state).to.not.dispatch.actions(expectedActions, callback)`

> `action.should.with.state(state).dispatch.actions(expectedActions, callback)`
> `action.should.with.state(state).not.dispatch.actions(expectedActions, callback)`

> `assert.isDispatchingWithState(action, expectedActions, state, callback)`
> `assert.isNotDispatchingWithState(action, expectedActions, state, callback)`

Asserts that store initialised with `state` before `action` is dispatched.
```js
expect(myActionCreator())
  .with.state({ property: 'value' })
  .to.dispatch.actions([{ type: 'MY_ACTION_START' }, finishActionCreator()], callback);

myActionCreator()
  .should.with.({ property: 'value' })
  .dispatch.actions([{ type: 'MY_ACTION_START' }, finishActionCreator()], callback);

assert.isDispatchingWithState(
  myActionCreator(),
  [{ type: 'MY_ACTION_START' }, finishActionCreator()],
  { property: 'value' }
  callback
);

assert.isNotDispatchingWithState(
  myActionCreator(),
  [{ type: 'MY_ACTION_START' }, finishActionCreator()],
  { property: 'value' }
  callback
);
```