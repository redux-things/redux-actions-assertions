# redux-actions-assertions 
Assertions for redux actions testing.

This library adds assertions for [redux actions](http://redux.js.org/docs/advanced/AsyncActions.html) testing.  
It use [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store) to mock redux store.

[![build status](https://img.shields.io/travis/redux-things/redux-actions-assertions/master.svg?style=flat-square)](https://travis-ci.org/redux-things/redux-actions-assertions)
[![npm version](https://img.shields.io/npm/v/redux-actions-assertions.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-assertions)

## Supported Assertion Frameworks/Libraries:
- [chai](https://redux-things.github.io/redux-actions-assertions/chai.html)
- [expect](https://redux-things.github.io/redux-actions-assertions/expect.html)
- [expect.js](https://redux-things.github.io/redux-actions-assertions/expectjs.html)
- [should](https://redux-things.github.io/redux-actions-assertions/should.html)
- [tape](https://redux-things.github.io/redux-actions-assertions/tape.html)
- [pure javascript assertion](https://redux-things.github.io/redux-actions-assertions/javascript.html)

If you have not found assertion framework/library that you are using - please add comment into [this issue](https://github.com/dmitry-zaets/redux-actions-assertions/issues/3).

## What it does:
- [Allows to avoid retesting nested action creators](#allows-to-avoid-retesting-nested-action-creators);
- [Reduces repetitive code of test methods](#reduces-repetitive-code-of-test-methods);
- [Simplifies initial setup](#simplifies-initial-setup);

### Allows to avoid retesting nested action creators
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
