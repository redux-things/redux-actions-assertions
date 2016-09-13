# [tape](https://github.com/substack/tape)

## Usage

```js
// using ES6 modules
import test from 'tape'
import { assertions } from 'redux-actions-assertions'

// using CommonJS modules
var test = require('tape')
var assertions = require('redux-actions-assertions');
```

### toDispatchActions
> `toDispatchActions(action, expectedActions, done, fail)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
test('Thunk: editTag', (t) => {
  toDispatchActions(testActionCreator(), [{ type: 'MY_ACTION_START' }], t.pass, t.fail);
})
```

### toNotDispatchActions
> `toNotDispatchActions(action, expectedActions, done, fail)`

Asserts that when given `action` is dispatched it will not dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
test('Thunk: editTag', (t) => {
  toNotDispatchActions(testActionCreator(), [{ type: 'MY_ACTION_START' }], t.pass, t.fail);
})
```

### toDispatchActionsWithState

> `toDispatchActionsWithState(initialState, action, expectedActions, done, fail)`

Same as `toDispatchActions` + asserts that store initialised with `state` before `action` is dispatched.

```js
test('Thunk: editTag', (t) => {
  toDispatchActions({property: 'value'}, testActionCreator(), [{ type: 'MY_ACTION_START' }], t.pass, t.fail);
})
```

### toNotDispatchActionsWithState

> `toNotDispatchActionsWithState(initialState, action, expectedActions, done, fail)`

Same as `toNotDispatchActions` + asserts that store initialised with `state` before `action` is dispatched.

```js
test('Thunk: editTag', (t) => {
  toNotDispatchActions({property: 'value'}, testActionCreator(), [{ type: 'MY_ACTION_START' }], t.pass, t.fail);
})
```
