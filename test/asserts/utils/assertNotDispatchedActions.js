import expect from 'expect';
import { assertNotDispatchedActions } from '../../../src/asserts/utils/assertNotDispatchedActions';

describe('assertion utils', () => {
  describe('assertNotDispatchedActions', () => {
    it('should be function', () => {
      expect(assertNotDispatchedActions).toBeA('function');
    });

    describe('when expected action was dispatched', () => {
      it('should throw an error', () => {
        const dispatchedActions = [
          { type: '0-0' },
          { type: '0-1' }
        ];
        const expectedActions = [
          { type: '0-0' },
          { type: '10-0' }
        ];

        expect(() => { assertNotDispatchedActions(dispatchedActions, expectedActions); })
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
        { type: '0-3' },
        { type: '0-3' }
      ];

      expect(() => { assertNotDispatchedActions(dispatchedActions, expectedActions); })
        .toNotThrow();
    });

    describe('when expected duplicate actions were dispatched', () => {
      it('should throw an error', () => {
        const dispatchedActions = [
          { type: '0-0' },
          { type: '0-1' },
          { type: '0-2' },
          { type: '0-3' }
        ];
        const expectedActions = [
          { type: '0-3' },
          { type: '0-3' }
        ];

        expect(() => { assertNotDispatchedActions(dispatchedActions, expectedActions); })
          .toThrow();
      });
    });
  });
});
