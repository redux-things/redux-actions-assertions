# javascript

## Registration

For plain javascript assertions you don't need to register anything. Just import assertions in your tests:

```js
// using ES6 modules
import assertions from 'redux-actions-assertions/assertions';

// using CommonJS modules
var assertions = require('redux-actions-assertions/assertions');

// in test
assertions.toDispatchActions(/**/)
assertions.toNotDispatchActions(/**/)
assertions.toDispatchActionsWithState(/**/);
assertions.toNotDispatchActionsWithState(/**/);
```

## Usage

### toDispatchActions
> `toDispatchActions(action, expectedActions, callback)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
toDispatchActions(testActionCreator(), [{ type: 'MY_ACTION_START' }], callback);
```

### toNotDispatchActions
> `toNotDispatchActions(action, expectedActions, callback)`

Asserts that when given `action` is dispatched it will not dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
toNotDispatchActions(testActionCreator(), [{ type: 'MY_ACTION_START' }], callback);
```

### toDispatchActionsWithState

> `toDispatchActionsWithState(initialState, action, expectedActions, callback)`

Same as `toDispatchActions` + asserts that store initialised with `state` before `action` is dispatched.

```js
toDispatchActions({property: 'value'}, testActionCreator(), [{ type: 'MY_ACTION_START' }], callback);
```

### toNotDispatchActionsWithState

> `toNotDispatchActionsWithState(initialState, action, expectedActions, callback)`

Same as `toNotDispatchActions` + asserts that store initialised with `state` before `action` is dispatched.

```js
toNotDispatchActions({property: 'value'}, testActionCreator(), [{ type: 'MY_ACTION_START' }], callback);
```