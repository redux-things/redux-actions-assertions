# redux-actions-assertions 
Assertions for redux actions testing.

This library adds assertions for [redux actions](http://redux.js.org/docs/advanced/AsyncActions.html) testing.  
It use [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store) to mock redux store.

[![build status](https://img.shields.io/travis/dmitry-zaets/redux-actions-assertions/master.svg?style=flat-square)](https://travis-ci.org/redux-things/redux-actions-assertions)
[![npm version](https://img.shields.io/npm/v/redux-actions-assertions.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-assertions)

## Supported Assertion Frameworks/Libraries:
- [chai](http://dmitry.js.org/redux-actions-assertions/chai.html)
- [expect](http://dmitry.js.org/redux-actions-assertions/expect.html)
- [expect.js](http://dmitry.js.org/redux-actions-assertions/expectjs.html)
- [should](http://dmitry.js.org/redux-actions-assertions/should.html)
- [pure javascript assertion](http://dmitry.js.org/redux-actions-assertions/javascript.html)

If you have not found assertion framework/library that you are using - please add comment into [this issue](https://github.com/dmitry-zaets/redux-actions-assertions/issues/3).

## What it does:
- [Allows to avoid retesting nested action creators](http://dmitry.js.org/redux-actions-assertions/what_it_does.html#allows-to-avoid-retesting-nested-action-creators);
- [Reduces repetitive code of test methods](http://dmitry.js.org/redux-actions-assertions/what_it_does.html#reduces-repetitive-code-of-test-methods);
- [Simplifies initial setup](http://dmitry.js.org/redux-actions-assertions/what_it_does.html#simplifies-initial-setup);