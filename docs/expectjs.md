## [expect.js](https://github.com/Automattic/expect.js)

### Registration

```js
// using ES6 modules
import { registerAssertions } from 'redux-actions-assertions/expectjs';

// using CommonJS modules
var registerAssertions = require('redux-actions-assertions/expectjs').registerAssertions;

// registration
registerAssertions();
```

## Usage

### .dispatchActions

> `expect(action).to.dispatchActions(expectedActions, callback)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
expect(myActionCreator())
  .to.dispatchActions({ type: 'MY_ACTION_START' }, callback);
```

### .not.dispatchActions

> `expect(action).not.to.dispatchActions(expectedActions, callback)`
> `expect(action).to.not.dispatchActions(expectedActions, callback)`

Asserts that when given `action` is dispatched it will not dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
expect(myActionCreator())
  .not.to.dispatchActions({ type: 'MY_ACTION_START' }, callback);

expect(myActionCreator())
  .to.not.dispatchActions({ type: 'MY_ACTION_START' }, callback);
```

### .withState

> `expect(action).withState(state).to.dispatchActions(expectedActions, callback)`

Asserts that store initialised with `state` before `action` is dispatched.

```js
expect(myActionCreator())
  .withState({ property: 'value' })
  .to.dispatchActions([{ type: 'MY_ACTION_START' }, finishActionCreator()], callback);
```
