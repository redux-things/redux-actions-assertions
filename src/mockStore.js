import configureMockStore from 'redux-mock-store';
import { toArray } from './utils';

let middlewares = [];

function registerMiddlewares(newMiddlewares) {
  middlewares = toArray(newMiddlewares);
}

function getMockStore() {
  return configureMockStore(middlewares);
}

export {
  registerMiddlewares
};

export default getMockStore;
