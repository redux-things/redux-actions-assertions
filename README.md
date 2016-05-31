# redux-actions-assertions 
Assertions for redux actions testing.

This library adds assertions for [redux actions](http://redux.js.org/docs/advanced/AsyncActions.html) testing.  
It use [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store) to mock redux store.

[![build status](https://img.shields.io/travis/dmitry-zaets/redux-actions-assertions/master.svg?style=flat-square)](https://travis-ci.org/dmitry-zaets/redux-actions-assertions)
[![npm version](https://img.shields.io/npm/v/redux-actions-assertions.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-assertions)

## What it does:
- [Simplifies initial setup](#simplifies-initial-setup);
- [Reduces repetitive code of test methods](#reduces-repetitive-code-of-test-methods);
- [Allows to avoid re-testing nested action creators](#allows-to-avoid-re-testing-nested-action-creators);

## Supported Assertion Frameworks/Libraries:
- [chai](#chai)
- [expect](#expect)
- [expect.js](#expectjs)
- [should](#should)

If you have not found assertion framework/library that you are using - you can use [pure javascript assertion](#javascript) or create an issue.

### Simplifies initial setup
It provides singe-time global configuration for middlewares and initial store state.

Without:
```javascript
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({ /*initial store object*});
```
With:
```javascript
registerMiddlewares([ thunk ]);
// to set custom initial state 
registerInitialStoreState(/*object of function*/);
// to generate initial state of your application
registerInitialStoreState(buildInitialStoreState(/*your root reducer*/));
```

### Reduces repetitive code of test methods
It reduces boilerplate of test methods and makes testing fluent.

Without:
```javascript
const store = mockStore(/* initial state */);
const expectedActions = [
  { type: types.FETCH_TODOS_REQUEST },
  /* All expected triggered action objects */
];
store.dispatch(fetchData()).then(() => {
  const actions = store.getActions();
  expect(actions).toEqual(expectedActions);
}).then(done).catch(done);
```

With:
```javascript
const expectedActions = [
  /*All expected triggered action objects or action creator functions*/
];
expect(fetchData()).toDispatchActions(expectedActions, done);
```

With using customised store state:
```javascript
expect(fetchData()).withState({/*custom state*/}).toDispatchActions(expectedActions, done);
```

### Allows to avoid re-testing nested action creators
It allows to test only actions that need to be tested.

**Example:**  
We have two actions (A, B). Each one makes async http requests.  
Action A makes a request and if the result is successful it triggers Action B.  
Action B is also used as an independent action.  
Action B can be tested separately.  
Therefore, we don't need to test it again in Action A.  

Actions:
```javascript
function actionA() {
  return dispatch => {
    dispatch(actionAStart());
    return api.getA().then(response => {
        dispatch(actionAFinish(response));
        dispatch(actionB());
      }).catch(err => {
        dispatch(actionAFailure(err));
      });
    };
}

function actionB() {
  return dispatch => {
    dispatch(actionBStart());
    return api.getB().then(response => {
        dispatch(actionBFinish(response));
      }).catch(err => {
        dispatch(actionBFailure(err));
      });
    };
}
```

Without:
```javascript
const expectedActions = [
  { type: action_a_start },
  { type: action_a_success },   
  { type: action_b_start }, // retesting of action B
  { type: action_b_success } // retesting of action B];
const store = mockStore({ todos: [] });
store.dispatch(actionA()).then(() => {
  expect(store.getActions()).toEqual(expectedActions);
}).then(done).catch(done);
```

With:
```javascript
expect(actionA()).withState({ todos: [] }).toDispatch([
  { type: action_a_start },
  { type: action_a_success },
  actionB() // just executing tested action
], done);
```

## Installation

Using [npm](https://www.npmjs.org/):

    $ npm install --save-dev redux-actions-assertions

### Redux middlewares registration

```js
// using ES6 modules
import { registerMiddlewares } from 'redux-actions-assertions';

// using CommonJS modules
var registerMiddlewares = require('redux-actions-assertions').registerMiddlewares;

// registration
registerMiddlewares([
  /* Here you need to list your middlewares */
]);
```

### Default initial store state registration

**By using state object or function:**
```js
// using ES6 modules
import { registerInitialStoreState } from 'redux-actions-assertions';

// using CommonJS modules
var registerInitialStoreState = require('redux-actions-assertions').registerInitialStoreState;

// registration
registerInitialStoreState(/* default initial state object or function */);
```
**By using your root reducer:**
```js
// using ES6 modules
import { buildInitialStoreState, registerInitialStoreState } from 'redux-actions-assertions';

// using CommonJS modules
var reduxActionsAssertions = require('redux-actions-assertions');
var registerInitialStoreState = reduxActionsAssertions.registerInitialStoreState;

// registration
registerInitialStoreState(buildInitialStoreState(/* root reducer function */));
```

## javascript

### Registration

For plain javasript assertions you dont need to register anything. Just import assertions in your tests:

```js
// using ES6 modules
import assertions from 'redux-actions-assertions/assertions';

// using CommonJS modules
var assertions = require('redux-actions-assertions/assertions');

// in test
assertions.toDispatchActions(/**/)
assertions.toDispatchActionsWithState(/**/);
```

### Usage

#### toDispatchActions
> `toDispatchActions(action, expectedActions, callback)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be a plain object (action) or a function (action creator). `expectedActions` can be can be a plain object (action), a function (action creator), or an array of objects/functions.

```js
toDispatchActions(testActionCreator(), [{ type: 'MY_ACTION_START' }], callback);
```

#### toDispatchActionsWithState

> `toDispatchActionsWithState(initialState, action, expectedActions, callback)`

Same as `toDispatchActions` + asserts that store initialised with `state` before `action` is dispatched.

```js
toDispatchActions({property: 'value'}, testActionCreator(), [{ type: 'MY_ACTION_START' }], callback);
```

## [chai](https://github.com/chaijs/chai)

### Registration

```js
// using ES6 modules
import { registerAssertions } from 'redux-actions-assertions/chai';

// using CommonJS modules
var registerAssertions = require('redux-actions-assertions/chai').registerAssertions;

// registration
registerAssertions();
```

#### .to.dispatch.actions or assert.isDispatching

> `expect(action).to.dispatch.actions(expectedActions, callback)`

> `action.should.dispatch.actions(expectedActions, callback)`

> `assert.isDispatching(action, expectedActions, callback)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be a plain object (action) or a function (action creator). `expectedActions` can be can be a plain object (action), a function (action creator), or an array of objects/functions.

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

#### .with.state or assert.isDispatchingWithState

> `expect(action).with.state(state).to.dispatch.actions(expectedActions, callback)`

> `action.should.with.state(state).dispatch.actions(expectedActions, callback)`

> `assert.isDispatchingWithState(action, expectedActions, state, callback)`

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
```

## [expect](https://github.com/mjackson/expect)

### Registration

```js
// using ES6 modules
import { registerAssertions } from 'redux-actions-assertions/expect';

// using CommonJS modules
var registerAssertions = require('redux-actions-assertions/expect').registerAssertions;

// registration
registerAssertions();
```
### Usage

#### .toDispatchActions

> `expect(action).toDispatchActions(expectedActions, callback)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be a plain object (action) or a function (action creator). `expectedActions` can be can be a plain object (action), a function (action creator), or an array of objects/functions.

```js
expect(myActionCreator())
  .toDispatchActions({ type: 'MY_ACTION_START' }, callback);
```

#### .withState

> `expect(action).withState(state).toDispatchActions(expectedActions, callback)`

Asserts that store initialised with `state` before `action` is dispatched.

```js
expect(myActionCreator())
  .withState({property: 'value'})
  .toDispatchActions([{ type: 'MY_ACTION_START' }, finishActionCreator()], callback);
```

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

### Usage

#### .dispatchActions

> `expect(action).to.dispatchActions(expectedActions, callback)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be a plain object (action) or a function (action creator). `expectedActions` can be can be a plain object (action), a function (action creator), or an array of objects/functions.

```js
expect(myActionCreator())
  .to.dispatchActions({ type: 'MY_ACTION_START' }, callback);
```

#### .withState

> `expect(action).withState(state).to.dispatchActions(expectedActions, callback)`

Asserts that store initialised with `state` before `action` is dispatched.

```js
expect(myActionCreator())
  .withState({ property: 'value' })
  .to.dispatchActions([{ type: 'MY_ACTION_START' }, finishActionCreator()], callback);
```

## [should](https://github.com/shouldjs/should.js)

### Registration

```js
// using ES6 modules
import { registerAssertions } from 'redux-actions-assertions/should';

// using CommonJS modules
var registerAssertions = require('redux-actions-assertions/should').registerAssertions;

// registration
registerAssertions();
```

### Usage

#### .dispatchActions

> `should(action).dispatchActions(expectedActions, callback)`
> `action.should.dispatchActions(expectedActions, callback)`

Asserts that when given `action` is dispatched it will dispatch `expectedActions`. `action` can be a plain object (action) or a function (action creator). `expectedActions` can be can be a plain object (action), a function (action creator), or an array of objects/functions.

```js
should(myActionCreator())
  .dispatchActions({ type: 'MY_ACTION_START' }, callback);

myActionCreator().should
  .dispatchActions({ type: 'MY_ACTION_START' }, callback);
```

#### .withState or with.state

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
