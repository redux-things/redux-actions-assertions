import { createStore } from 'redux';

let state = null;

function registerInitialStoreState(newState) {
  state = newState;
}

function buildInitialStoreState(reducer) {
  const store = createStore(reducer);
  return store.getState();
}

function getInitialStoreState() {
  return state;
}

export {
  buildInitialStoreState,
  registerInitialStoreState
};

export default getInitialStoreState;
