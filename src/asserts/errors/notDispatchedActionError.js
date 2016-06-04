function notDispatchedActionError(dispatchedActions, expectedActions, action) {
  return new Error(
    `Action ${JSON.stringify(action)} was not dispatched when it was expected.\n` +
    `Actions expected to be dispatched: ${JSON.stringify(expectedActions)}\n` +
    `Actual dispatched actions: ${JSON.stringify(dispatchedActions)}`
  );
}

export { notDispatchedActionError };
