function asyncFunction() {
  return Promise.resolve();
}

const start = () => { return { type: 'test-action-start' }; };
const anotherStart = () => { return { type: 'test-action-another-start' }; };
const finish = () => { return { type: 'test-action-finish' }; };
const fail = () => { return { type: 'test-action-fail' }; };

const actionWithGetState = (data) => { return { type: 'test-action-with-get-state', data }; };

function actionCreatorWithGetState() {
  return (dispatch, getState) => {
    dispatch(actionWithGetState(getState()));
  };
}

function asyncActionCreator() {
  return dispatch => {
    dispatch(start());
    dispatch(anotherStart());
    return asyncFunction().then(() => {
      dispatch(finish());
    }).catch(() => {
      dispatch(fail());
    });
  };
}

const parentStart = () => { return { type: 'parent-test-action-start' }; };
const parentFinish = () => { return { type: 'parent-test-action-finish' }; };
const parentFail = () => { return { type: 'parent-test-action-fail' }; };

function parentAsyncActionCreator() {
  return dispatch => {
    dispatch(parentStart());
    return asyncFunction().then(() => {
      dispatch(asyncActionCreator());
      dispatch(parentFinish());
    }, () => {
      dispatch(parentFail());
    });
  };
}

const expectedActions = [
  start(),
  anotherStart(),
  finish()
];

const expectedParentActions = [
  parentStart(),
  asyncActionCreator(),
  parentFinish()
];

export default {
  start,
  anotherStart,
  finish,
  fail,
  actionWithGetState,
  actionCreatorWithGetState,
  asyncActionCreator,
  parentStart,
  parentFinish,
  parentFail,
  parentAsyncActionCreator,
  expectedActions,
  expectedParentActions
};
