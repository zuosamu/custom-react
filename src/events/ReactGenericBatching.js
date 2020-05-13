let _batchedUpdatesImpl = function (fn, bookkeeping) {
  return fn(bookkeeping);
};

let isBatching = false;

export function batchedUpdates(fn, bookkeeping) {
  isBatching = true;
  try {
    return _batchedUpdatesImpl(fn, bookkeeping);
  } finally {
    isBatching = false;
  }
}
