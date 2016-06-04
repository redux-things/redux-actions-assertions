import getMockStore from '../../mockStore';

function getDispatchedActions(initialState, action) {
  return new Promise((resolve, reject) => {
    const store = getMockStore()(initialState);
    const dispatchResult = store.dispatch(action);

    if (dispatchResult instanceof Promise) {
      dispatchResult.then(() => {
        resolve(store.getActions());
      }).catch((result) => {
        reject(result);
      });
    } else {
      resolve(store.getActions());
    }
  });
}

export { getDispatchedActions };
