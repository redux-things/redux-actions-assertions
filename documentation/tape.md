# [tape](https://github.com/substack/tape)

## Usage

```js
// using ES6 modules
import test from 'tape';
import { assertions } from 'redux-actions-assertions';

// using CommonJS modules
var test = require('tape');
var assertions = require('redux-actions-assertions').assertions;
```

Usage is the same as the [plain JavaScript assertions](https://redux-things.github.io/redux-actions-assertions/javascript.html), you just need to set up the correct `pass` and `fail` callbacks. Also, be sure to call `end` in a `Promise.then`, or `plan` with the number of assertions you're making in the test (see below).

### toDispatchActions
> `toDispatchActions(action, expectedActions, done, fail)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
// Using `t.plan`
test('Thunk: editTag', (t) => {
  t.plan(1)
  toDispatchActions(testActionCreator(), [{ type: 'MY_ACTION_START' }], t.pass, t.fail);
});

// Using `t.end`
test('Thunk: editTag', (t) => {
  toDispatchActions(testActionCreator(), [{ type: 'MY_ACTION_START' }], t.pass, t.fail)
    .then(t.end);
});
```

### toNotDispatchActions
> `toNotDispatchActions(action, expectedActions, done, fail)`

Asserts that when given `action` is dispatched it will not dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
test('Thunk: editTag', (t) => {
  t.plan(1);
  toNotDispatchActions(testActionCreator(), [{ type: 'MY_ACTION_START' }], t.pass, t.fail);
});
```

### toDispatchActionsWithState

> `toDispatchActionsWithState(initialState, action, expectedActions, done, fail)`

Same as `toDispatchActions` + asserts that store initialised with `state` before `action` is dispatched.

```js
test('Thunk: editTag', (t) => {
  t.plan(1);
  toDispatchActions({property: 'value'}, testActionCreator(), [{ type: 'MY_ACTION_START' }], t.pass, t.fail);
});
```

### toNotDispatchActionsWithState

> `toNotDispatchActionsWithState(initialState, action, expectedActions, done, fail)`

Same as `toNotDispatchActions` + asserts that store initialised with `state` before `action` is dispatched.

```js
test('Thunk: editTag', (t) => {
  t.plan(1);
  toNotDispatchActions({property: 'value'}, testActionCreator(), [{ type: 'MY_ACTION_START' }], t.pass, t.fail);
});
```
