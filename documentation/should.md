# [should](https://github.com/shouldjs/should.js)

## Registration

```js
// using ES6 modules
import { registerAssertions } from 'redux-actions-assertions/should';

// using CommonJS modules
var registerAssertions = require('redux-actions-assertions/should').registerAssertions;

// registration
registerAssertions();
```

## Usage

### .dispatchActions

> `should(action).dispatchActions(expectedActions, callback)`
> `action.should.dispatchActions(expectedActions, callback)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
should(myActionCreator())
  .dispatchActions({ type: 'MY_ACTION_START' }, callback);

myActionCreator().should
  .dispatchActions({ type: 'MY_ACTION_START' }, callback);
```


### .notDispatchActions

> `should(action).notDispatchActions(expectedActions, callback)`
> `action.should.notDispatchActions(expectedActions, callback)`

Asserts that when given `action` is dispatched it will not dispatch `expectedActions`. `action` can be plain object (action) or function (action creator). `expectedActions` can be can be plain object (action) or function (action creator) or array of objects/functions.

```js
should(myActionCreator())
  .notDispatchActions({ type: 'MY_ACTION_START' }, callback);

myActionCreator().should
  .notDispatchActions({ type: 'MY_ACTION_START' }, callback);
```

### .withState or with.state

> `should(action).withState(state).dispatchActions(expectedActions, callback)`
> `should(action).with.state(state).dispatchActions(expectedActions, callback)`

> `action.should.withState(state).dispatchActions(expectedActions, callback)`
> `action.should.with.state(state).dispatchActions(expectedActions, callback)`

Asserts that store initialised with `state` before `action` is dispatched.

```js
should(myActionCreator())
  .withState({ property: 'value' })
  .dispatchActions({ type: 'MY_ACTION_START' }, callback);

should(myActionCreator())
  .with.state({ property: 'value' })
  .dispatchActions({ type: 'MY_ACTION_START' }, callback);

myActionCreator().should
  .withState({ property: 'value' })
  .dispatchActions({ type: 'MY_ACTION_START' }, callback);

myActionCreator().should
  .with.state({ property: 'value' })
  .dispatchActions({ type: 'MY_ACTION_START' }, callback);
```