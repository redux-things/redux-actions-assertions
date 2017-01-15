# [jest](https://github.com/facebook/jest)

## Registration

```js
// add these two lines in your setupTestFrameworkScriptFile:
// http://facebook.github.io/jest/docs/configuration.html#setuptestframeworkscriptfile-string
import { registerAssertions } from 'redux-actions-assertions/jest';

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

### .toNotDispatchActions

> `expect(action).toNotDispatchActions(expectedActions, done)`

Asserts that when given `action` is dispatched it will not dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
expect(myActionCreator())
  .toNotDispatchActions({ type: 'MY_ACTION_START' }, done);
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
You can also use its variant `.toNotDispatchActionsWithState`:

```js
expect(myActionCreator())
  .toNotDispatchActionsWithState(state, expectedActions, done);
```
