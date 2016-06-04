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

const anotherAsyncStart = () => { return { type: 'another-test-action-start' }; };
const anotherAsyncFinish = () => { return { type: 'another-test-action-finish' }; };
const anotherAsyncFail = () => { return { type: 'another-test-action-fail' }; };

function anotherAsyncActionCreator() {
  return dispatch => {
    dispatch(anotherAsyncStart());
    return asyncFunction().then(() => {
      dispatch(anotherAsyncFinish());
    }).catch(() => {
      dispatch(anotherAsyncFail());
    });
  };
}

const anotherParentAsyncStart = () => { return { type: 'another-parent-test-action-start' }; };
const anotherParentAsyncFinish = () => { return { type: 'another-parent-test-action-finish' }; };
const anotherParentAsyncFail = () => { return { type: 'another-parent-test-action-fail' }; };

function anotherParentAsyncActionCreator() {
  return dispatch => {
    dispatch(anotherParentAsyncStart());
    return asyncFunction().then(() => {
      dispatch(anotherAsyncActionCreator());
      dispatch(anotherParentAsyncFinish());
    }, () => {
      dispatch(anotherParentAsyncFail());
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


const anotherExpectedActions = [
  anotherAsyncStart(),
  anotherAsyncFinish()
];

const anotherParentExpectedActions = [
  anotherParentAsyncStart(),
  anotherAsyncActionCreator(),
  anotherParentAsyncFail()
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
  expectedParentActions,
  anotherAsyncActionCreator,
  anotherParentAsyncActionCreator,
  anotherExpectedActions,
  anotherParentExpectedActions
};
