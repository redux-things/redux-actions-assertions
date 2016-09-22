# Installation

Using [npm](https://www.npmjs.org/):

    $ npm install --save-dev redux-actions-assertions

## Redux middlewares registration

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

## Default initial store state registration

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
