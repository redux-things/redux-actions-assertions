import { combineReducers } from 'redux';

const state1 = {
  testKey1: 'testValue1'
};

const state2 = {
  testKey2: 'testValue2'
};

const expectedInitialState = {
  reducerWithInitialState1: {
    testKey1: 'testValue1'
  },
  reducerWithInitialState2: {
    testKey2: 'testValue2'
  }
};

function reducerWithInitialState1(state = state1) {
  return state;
}


function reducerWithInitialState2(state = state2) {
  return state;
}

const reducerWithNesterReducers = combineReducers({
  reducerWithInitialState1,
  reducerWithInitialState2
});

export { expectedInitialState, reducerWithNesterReducers };
