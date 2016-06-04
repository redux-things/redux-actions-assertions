import expect from 'expect';
import { assertDispatchedActions } from '../../../src/asserts/utils/assertDispatchedActions';

describe('assertion utils', () => {
  describe('assertDispatchedActions', () => {
    it('should be function', () => {
      expect(assertDispatchedActions).toBeA('function');
    });

    describe('when expected action was not dispatched', () => {
      it('should throw an error', () => {
        const dispatchedActions = [
          { type: '0-0' },
          { type: '0-1' }
        ];
        const expectedActions = [
          { type: '0-0' },
          { type: '10-0' }
        ];

        expect(() => { assertDispatchedActions(dispatchedActions, expectedActions); })
          .toThrow();
      });
    });

    it('should accept expected duplicate actions', () => {
      const dispatchedActions = [
        { type: '0-0' },
        { type: '0-1' },
        { type: '0-0' },
        { type: '0-2' }
      ];
      const expectedActions = [
        { type: '0-0' },
        { type: '0-0' },
        { type: '0-1' },
        { type: '0-2' }
      ];

      expect(() => { assertDispatchedActions(dispatchedActions, expectedActions); })
        .toNotThrow();
    });

    describe('when expected duplicate actions were not dispatched', () => {
      it('should throw an error', () => {
        const dispatchedActions = [
          { type: '0-0' },
          { type: '0-1' },
          { type: '0-2' },
          { type: '0-3' }
        ];
        const expectedActions = [
          { type: '0-0' },
          { type: '0-0' },
          { type: '0-1' },
          { type: '0-2' }
        ];

        expect(() => { assertDispatchedActions(dispatchedActions, expectedActions); })
          .toThrow();
      });
    });
  });
});
