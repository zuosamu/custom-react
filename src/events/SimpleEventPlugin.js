import SyntheticMouseEvent from "./SyntheticMouseEvent";
import { accumulateTwoPhaseDispatches } from "./EventPropagtors";

const interactiveEventTypeNames = [["click", "click"]];

const eventTypes = {};

const topLevelEventsToDispatchConfig = {};

interactiveEventTypeNames.forEach((eventTuple) => {
  addEventTypeNameToConfig(eventTuple);
});

function addEventTypeNameToConfig([topEvent, event]) {
  const capitalizeEvent = event[0].toUpperCase() + event.slice(1);
  const onEvent = "on" + capitalizeEvent;
  const type = {
    phasedRegistrationNames: {
      bubbled: onEvent,
      captured: onEvent + "Capture",
    },
    dependencies: [topEvent],
  };
  eventTypes[event] = type;
  topLevelEventsToDispatchConfig[topEvent] = type;
}

const SimpleEventPlugin = {
  eventTypes: eventTypes,
  //   isInterractiveTopLevelEventType(topLevelType) {
  //     const config = topLevelEventsToDispatchConfig[topLevelType];
  //     return config !== undefined && config.isInteractive === true;
  //   },
  extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    const dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    let EventConstructor;
    switch (topLevelType) {
      case "click":
        if (nativeEvent.button === 2) {
          return null;
        }
        EventConstructor = SyntheticMouseEvent;
        break;

      default:
        break;
    }
    const event = EventConstructor.getPooled(
      dispatchConfig,
      targetInst,
      nativeEvent,
      nativeEventTarget
    );
    accumulateTwoPhaseDispatches(event);
    return event;
  },
};

export default SimpleEventPlugin;
