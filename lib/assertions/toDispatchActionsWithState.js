'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.flattendeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.find');

var _lodash4 = _interopRequireDefault(_lodash3);

var _utils = require('../utils');

var _mockStore = require('../mockStore');

var _mockStore2 = _interopRequireDefault(_mockStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDispatchedActions(initialState, action) {
  return new Promise(function (resolve, reject) {
    var store = (0, _mockStore2.default)()(initialState);
    var dispatchResult = store.dispatch(action);

    if (dispatchResult instanceof Promise) {
      dispatchResult.then(function () {
        resolve(store.getActions());
      }).catch(function (result) {
        reject(result);
      });
    } else {
      resolve(store.getActions());
    }
  });
}

function unrollActions(initialState, expectedActions) {
  var promises = [];
  var actions = (0, _utils.toArray)(expectedActions);

  for (var index = 0; index < actions.length; index++) {
    promises.push(getDispatchedActions(initialState, actions[index]));
  }

  return Promise.all(promises).then(function (resultActions) {
    return (0, _lodash2.default)(resultActions);
  });
}

function toDispatchActionsWithState(initialState, actionUnderTest, expectedActions, done, fail) {
  if (!(0, _utils.isFunction)(actionUnderTest) && !(0, _utils.isObject)(actionUnderTest)) {
    throw new Error('The "actualAction" argument must be a function or object');
  }

  if (!(0, _utils.isFunction)(expectedActions) && !(0, _utils.isObject)(expectedActions)) {
    throw new Error('The "expectedActions" argument must be ' + 'an action creator function or an action object or an array of them');
  }

  return getDispatchedActions(initialState, actionUnderTest).then(function (dispatchedActions) {
    return unrollActions(initialState, expectedActions).then(function (expectedUnrolledActions) {
      for (var index = 0; index < expectedUnrolledActions.length; index++) {
        if (!(0, _lodash4.default)(dispatchedActions, expectedUnrolledActions[index])) {
          throw new Error('Expected action ' + JSON.stringify(expectedUnrolledActions[index]) + ' was not dispatched.' + ('\nActual dispatched actions: ' + JSON.stringify(dispatchedActions)));
        }
      }
      if ((0, _utils.isFunction)(done)) {
        done();
      }
    }).catch(function (err) {
      if ((0, _utils.isFunction)(fail)) {
        fail(err);
        return;
      } else if ((0, _utils.isFunction)(done)) {
        done(err);
        return;
      }
      throw new Error(err);
    });
  });
}

exports.default = toDispatchActionsWithState;