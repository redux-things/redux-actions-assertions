'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildInitialStoreState = exports.registerInitialStoreState = exports.registerMiddlewares = undefined;

var _mockStore = require('./mockStore');

var _initialState = require('./initialState');

exports.registerMiddlewares = _mockStore.registerMiddlewares;
exports.registerInitialStoreState = _initialState.registerInitialStoreState;
exports.buildInitialStoreState = _initialState.buildInitialStoreState;