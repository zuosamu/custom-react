const emptyObject = {};

function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // this.updater = updater || ReactNoopUodateQueue
  this.updater = updater;
}

Component.prototype.isReactComponent = {};
Component.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater;
}
const PureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
PureComponentPrototype.constructor = PureComponent;
Object.assign(PureComponentPrototype, Component.prototype);
PureComponentPrototype.isPureReactComponent = true;

export { Component, PureComponent };
