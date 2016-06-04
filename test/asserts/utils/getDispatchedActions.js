import expect from 'expect';
import { getDispatchedActions } from '../../../src/asserts/utils/getDispatchedActions';

describe('assertion utils', () => {
  describe('getDispatchedActions', () => {
    it('should be function', () => { expect(getDispatchedActions).toBeA('function'); });

    it('should return a Promise', () => {
      const result = getDispatchedActions({}, { type: '' });
      expect(result).toBeA(Promise);
    });
  });
});
