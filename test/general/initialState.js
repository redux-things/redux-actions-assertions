import expect from 'expect';
import getInitialStoreState, {
  buildInitialStoreState,
  registerInitialStoreState
} from '../../src/initialState';
import { expectedInitialState, reducerWithNesterReducers } from '../testingData/reducers';

describe('initialState', () => {
  describe('getInitialStoreState', () => {
    describe('by default', () => {
      it('should return null', () => {
        expect(getInitialStoreState()).toBe(null);
      });
    });

    describe('when registerInitialStoreState was called', () => {
      const initialStoreState = { initialStoreStateKey: 'initialStoreStateValue' };

      before(() => {
        registerInitialStoreState(initialStoreState);
      });

      after(() => {
        registerInitialStoreState(null);
      });

      it('should return registered value', () => {
        expect(getInitialStoreState()).toEqual(initialStoreState);
      });
    });
  });

  describe('buildInitialStoreState', () => {
    it('should return initial state of all reducers', () => {
      const initialState = buildInitialStoreState(reducerWithNesterReducers);

      expect(initialState).toEqual(expectedInitialState);
    });
  });
});
