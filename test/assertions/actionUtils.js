import expect from 'expect';
import {
  getDispatchedActions,
  unrollActions,
  assertDispatchedActions
} from '../../src/asserts/actionUtils';

describe('assertions', () => {
  describe('action utils', () => {
    describe('getDispatchedActions', () => {
      it('should be function', () => { expect(getDispatchedActions).toBeA('function');});

      it('should return a Promise', () => {
        const result = getDispatchedActions({}, { type: '' });
        expect(result).toBeA(Promise);
      });
    });

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

      it('should be function', () => { expect(unrollActions).toBeA('function');});

      it('should return flat array with all actions', () => {
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

    describe('assertDispatchedActions', () => {
      it('should be function', () => { expect(assertDispatchedActions).toBeA('function');});

      it('should throw error if expected action was not dispatched', () => {
        const dispatchedActions = [
          { type: '0-0' },
          { type: '0-1' }
        ];
        const expectedActions = [
          { type: '0-0' },
          { type: '10-0' }
        ];

        expect(assertDispatchedActions)
          .withArgs([dispatchedActions, expectedActions])
          .toThrow();
      });
    });
  });
});
