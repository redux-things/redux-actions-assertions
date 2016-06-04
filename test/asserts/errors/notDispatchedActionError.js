import expect from 'expect';
import { notDispatchedActionError } from '../../../src/asserts/errors/notDispatchedActionError';

describe('assertion errors', () => {
  describe('notDispatchedActionError', () => {
    it('should be function', () => {
      expect(notDispatchedActionError).toBeA('function');
    });
  });
});
