import expect from 'expect';
import { unrollActions } from '../../../src/asserts/utils/unrollActions';

describe('assertion utils', () => {
  describe('unrollActions', () => {
    function asyncActionCreator() {
      return dispatch => {
        dispatch({ type: '0-0' });
        dispatch({ type: '0-1' });
        return Promise.resolve().then(() => {
          dispatch({ type: '1-0' });
          dispatch({ type: '1-1' });
          return Promise.resolve().then(() => {
            dispatch({ type: '2-0' });
            dispatch({ type: '2-1' });
          });
        });
      };
    }

    it('should be function', () => { expect(unrollActions).toBeA('function'); });

    it('should return flat array with all the actions', () => {
      unrollActions({}, asyncActionCreator()).then((result) => {
        const expectedActions = [
          { type: '0-0' },
          { type: '0-1' },
          { type: '1-0' },
          { type: '1-1' },
          { type: '2-0' },
          { type: '2-1' }
        ];
        expect(result).toBe(expectedActions);
      });
    });
  });
});
