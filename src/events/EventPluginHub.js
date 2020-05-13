import { plugins } from "../ReactDOMClientInjection";
import accumulateInto from "./accumulateInto";
import forEachAccumulated from "./forEachAccumulated";
import { executeDispatchesInOrder } from "./EventPluginUtils";

export function getListener(inst, registrationName) {
  let listener;
  const stateNode = inst.stateNode;
  const props = getFiberCurrentPropsFromNode(stateNode);
  listener = props[registrationName];
  return listener;
}

function extractEvents(
  topLevelType,
  targetInst,
  nativeEvent,
  nativeEventTarget
) {
  let events = null;
  for (let i = 0; i < plugins.length; i++) {
    const possiblePlugin = plugins[i];
    if (possiblePlugin) {
      const extractedEvents = possiblePlugin.extractEvents(
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      if (extractedEvents) {
        events = accumulateInto(events, extractedEvents);
      }
    }
  }
  return events;
}

let eventQueue = null;

const executeDispatchesAndRelease = function (event) {
  if (event) {
    executeDispatchesInOrder(event);
  }
};

const executeDispatchesAndReleaseTopLevel = function (e) {
  return executeDispatchesAndRelease(e);
};

export function runEventsInBatch(events) {
  if (events !== null) {
    eventQueue = accumulateInto(eventQueue, events);
  }
  const processingEventQueue = eventQueue;
  eventQueue = null;
  if (!processingEventQueue) {
    return;
  }
  forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
  //   rethrowCaughtError();
}

export function runExtractedEventsInBatch(
  topLevelType,
  targetInst,
  nativeEvent,
  nativeEventTarget
) {
  const events = extractEvents(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget
  );
  runEventsInBatch(events);
}
