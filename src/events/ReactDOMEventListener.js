import getEventTarget from "./getEventTarget";
import { getClosestInstanceFromNode } from "../ReactDOMComponentTree";
import { batchedUpdates } from "./ReactGenericBatching";
import { runExtractedEventsInBatch } from "./eventPluginHub";

function handleTopLevel(bookKeeping) {
  let targetInst = bookKeeping.targetInst;
  let ancestor = targetInst;
  do {
    if (!ancestor) {
      bookKeeping.ancestors.push(ancestor);
      break;
    }
    const root = findRootContainerNode(ancestor);
    bookKeeping.ancestors.push(ancestor);
  } while (ancestor);
  for (let i = 0; i < bookKeeping.ancestors.length; i++) {
    const targetInst = bookKeeping.ancestors[i];
    runExtractedEventsInBatch(
      bookKeeping.topLevelType,
      targetInst,
      bookKeeping.nativeEvent,
      getEventTarget(bookKeeping.nativeEvent)
    );
  }
}

export function dispatchEvent(topLevelType, nativeEvent) {
  const nativeEventTarget = getEventTarget(nativeEvent);
  let targetInst = getClosestInstanceFromNode(nativeEventTarget);
  const bookKeeping = getTopLevelCallbackBookKeeping(
    topLevelType,
    nativeEvent,
    targetInst
  );
  try {
    batchedUpdates(handleTopLevel, bookKeeping);
  } finally {
    //这里退栈
  }
}

function getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst) {
  return {
    topLevelType,
    nativeEvent,
    targetInst,
    ancestors: [],
  };
}
