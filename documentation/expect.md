# [expect](https://github.com/mjackson/expect)

## Registration

```js
// using ES6 modules
import { registerAssertions } from 'redux-actions-assertions/expect';

// using CommonJS modules
var registerAssertions = require('redux-actions-assertions/expect').registerAssertions;

// registration
registerAssertions();
```

## Usage

### .toDispatchActions

> `expect(action).toDispatchActions(expectedActions, callback)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
expect(myActionCreator())
  .toDispatchActions({ type: 'MY_ACTION_START' }, callback);
```

### .toNotDispatchActions

> `expect(action).toNotDispatchActions(expectedActions, callback)`

Asserts that when given `action` is dispatched it will not dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
expect(myActionCreator())
  .toNotDispatchActions({ type: 'MY_ACTION_START' }, callback);
```

### .withState

> `expect(action).withState(state).toDispatchActions(expectedActions, callback)`

Asserts that store initialised with `state` before `action` is dispatched.

```js
expect(myActionCreator())
  .withState({property: 'value'})
  .toDispatchActions([{ type: 'MY_ACTION_START' }, finishActionCreator()], callback);
```