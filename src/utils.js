function isObject(action) {
  return typeof action === 'object';
}

function isFunction(action) {
  return typeof action === 'function';
}

function toArray(value) {
  return (!Array.isArray(value) ? [value] : value);
}

export {
  isObject,
  isFunction,
  toArray
};
