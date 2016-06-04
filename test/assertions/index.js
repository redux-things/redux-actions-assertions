import expect from 'expect';
import assertions from '../../src/assertions';

describe('assertions', () => {
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
