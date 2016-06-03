'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerInitialStoreState = exports.buildInitialStoreState = undefined;

var _redux = require('redux');

var state = null;

function registerInitialStoreState(newState) {
  state = newState;
}

function buildInitialStoreState(reducer) {
  var store = (0, _redux.createStore)(reducer);
  return store.getState();
}

function getInitialStoreState() {
  return state;
}

exports.buildInitialStoreState = buildInitialStoreState;
exports.registerInitialStoreState = registerInitialStoreState;
exports.default = getInitialStoreState;