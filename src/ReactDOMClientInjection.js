import SimpleEventPlugin from "./events/SimpleEventPlugin";

const DOMEventPluginOrder = [
  "ResponderEventPlugin",
  "SimpleEventPlugin",
  "EnterLeaveEventPlugin",
  "ChangeEventPlugin",
  "SelectEventPlugin",
  "BeforeInputEventPlugin",
];

let eventPluginOrder = null;

const namesToPlugins = {};

export const registrationNameModules = {};

export const plugins = [];

export const registrationNameDependencies = {};

injectEventPluginOrder(DOMEventPluginOrder);
// setComponenyTree(
//   getFiberCurrentPropsFromNode,
//   getInstanceFromNode,
//   getNodeFromInstance
// );

injectEventPluginsByName({
  SimpleEventPlugin: SimpleEventPlugin,
});

function injectEventPluginOrder(injectedEventPluginOrder) {
  eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
  recomputePluginOrdering();
}

function injectEventPluginsByName(injectedNamesToPlugins) {
  let isOrderingDirty = false;
  for (const pluginName in injectedNamesToPlugins) {
    if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
      continue;
    }
    const pluginModule = injectedNamesToPlugins[pluginName];
    if (
      !injectedNamesToPlugins.hasOwnProperty(pluginName) ||
      namesToPlugins[pluginName] !== pluginModule
    ) {
      namesToPlugins[pluginName] = pluginModule;
      isOrderingDirty = true;
    }
  }
  if (isOrderingDirty) {
    recomputePluginOrdering();
  }
}

function recomputePluginOrdering() {
  if (!eventPluginOrder) {
    return;
  }
  for (const pluginName in namesToPlugins) {
    const pluginModule = namesToPlugins[pluginName];
    const pluginIndex = eventPluginOrder.indexOf(pluginName);
    if (plugins[pluginIndex]) {
      continue;
    }
    plugins[pluginIndex] = pluginModule;
    const publishedEvents = pluginModule.eventTypes;
    for (const eventName in publishedEvents) {
      publishEventForPlugin(
        publishedEvents[eventName],
        pluginModule,
        eventName
      );
    }
  }
}

function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
  // eventNameDispatchConfigs[eventName] = dispatchConfig;
  const phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (const phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        const phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(
          phasedRegistrationName,
          pluginModule,
          eventName
        );
      }
    }
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(
      dispatchConfig.registrationName,
      pluginModule,
      eventName
    );
  }
}

function publishRegistrationName(registrationName, pluginModule, eventName) {
  registrationNameModules[registrationName] = pluginModule;
  registrationNameDependencies[registrationName] =
    pluginModule.eventTypes[eventName].dependencies;
}
