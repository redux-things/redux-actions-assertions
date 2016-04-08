import expect from 'expect';
import thunk from 'redux-thunk';
import getMockStore, { registerMiddlewares } from '../../src/mockStore';
import actions from '../testingData/actions';

registerMiddlewares([thunk]);

describe('default redux-mock-store way', () => {
  it('should dispatch actions', (done) => {
    const store = getMockStore()({});
    store.dispatch(actions.asyncActionCreator()).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toEqual(actions.expectedActions);
      done();
    });
  });
});
