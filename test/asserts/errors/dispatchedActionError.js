import expect from 'expect';
import { dispatchedActionError } from '../../../src/asserts/errors/dispatchedActionError';

describe('assertion errors', () => {
  describe('dispatchedActionError', () => {
    it('should be function', () => {
      expect(dispatchedActionError).toBeA('function');
    });
  });
});
