import invokeGuardedCallbackImpl from "./invokeGuardedCallbackImpl";

export function executeDispatchesInOrder(event) {
  const dispatchListeners = event._dispatchListeners;
  const dispatchInstances = event._dispatchInstances;
  executeDispatch(event, dispatchListeners, dispatchInstances);
}

function executeDispatch(event, listener, inst) {
  const type = event.type || "unknown-event";
  invokeGuardedCallbackImpl(type, listener, undefined, event);
}
