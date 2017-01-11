# [jasmine](https://github.com/jasmine/jasmine)

## Registration

```js
// using ES6 modules
import { registerAssertions } from 'redux-actions-assertions/jasmine';

// using CommonJS modules
var registerAssertions = require('redux-actions-assertions/jasmine').registerAssertions;

// registration
beforeEach(registerAssertions);
```

## Usage

### .toDispatchActions

> `expect(action).toDispatchActions(expectedActions, done)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
expect(myActionCreator())
  .toDispatchActions({ type: 'MY_ACTION_START' }, done);
```

### .not.toDispatchActions

> `expect(action).not.toDispatchActions(expectedActions, done)`

Asserts that when given `action` is dispatched it will not dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
expect(myActionCreator())
  .not.toDispatchActions({ type: 'MY_ACTION_START' }, done);
```

### .toDispatchActionsWithState

> `expect(action).toDispatchActionsWithState(state, expectedActions, done)`

Asserts that store initialised with `state` before `action` is dispatched.

```js
const state = {property: 'value'};
const expectedActions = [{ type: 'MY_ACTION_START' }, finishActionCreator()];
expect(myActionCreator())
  .toDispatchActionsWithState(state, expectedActions, done);
```
You can also use it with `.not`:

```js
expect(myActionCreator())
  .not.toDispatchActionsWithState(state, expectedActions, done);
```
