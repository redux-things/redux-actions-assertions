import expect from 'expect';
import {
  registerMiddlewares,
  registerInitialStoreState,
  buildInitialStoreState,
  assertions
} from '../src';

describe('index', () => {
  it('should export registerMiddlewares', () => {
    expect(registerMiddlewares).toBeA('function');
  });

  it('should export registerInitialStoreState', () => {
    expect(registerInitialStoreState).toBeA('function');
  });

  it('should export buildInitialStoreState', () => {
    expect(buildInitialStoreState).toBeA('function');
  });

  it('should export assertions', () => {
    expect(assertions).toBeA('object');
  });

  it('should export toDispatchActions', () => {
    expect(assertions.toDispatchActions).toBeA('function');
  });

  it('should export toDispatchActionsWithState', () => {
    expect(assertions.toDispatchActionsWithState).toBeA('function');
  });

  it('should export toNotDispatchActions', () => {
    expect(assertions.toNotDispatchActions).toBeA('function');
  });

  it('should export toNotDispatchActionsWithState', () => {
    expect(assertions.toNotDispatchActionsWithState).toBeA('function');
  });
});
