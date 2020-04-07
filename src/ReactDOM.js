const ReactDOM = {
  render(element, container, callback) {
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      false,
      callback
    );
  }
};

function legacyRenderSubtreeIntoContainer(
  parentComponent,
  children,
  container,
  forceHydrate,
  callback
) {
  let root = container._reactRootContainer;
  if (!root) {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      false
    );
    unbatchedUpdates(() => {
      root.render(children, undefined);
    });
  } else {
  }
  return getPublicRootInstance(root._internalRoot);
}

function getPublicRootInstance(container) {
  const containerFiber = container.current;
  if (!containerFiber.child) {
    return null;
  }
}

function legacyCreateRootFromDOMContainer(container) {
  return new ReactRoot(container, false, false);
}

function ReactRoot(container, isConcurrent, hydrate) {
  const root = createContainer(container, isConcurrent, hydrate);
  this._internalRoot = root;
}

ReactRoot.prototype.render = function(children) {
  const root = this._internalRoot;
  const work = new ReactWork();
  updateContainer(children, root, null, work._onCommit);
  return work;
};
ReactRoot.prototype.unmount = function() {};
ReactRoot.prototype.legacy_renderSubtreeIntoContainer = function() {};
ReactRoot.prototype.createBatch = function() {};

function ReactWork() {
  this._callbacks = null;
  this._didCommit = false;
  this._onCommit = this._onCommit.bind(this);
}

ReactWork.prototype.then = function(onCommit) {
  if (this._didCommit) {
    onCommit();
    return;
  }
  let callbacks = this._callbacks;
  if (callbacks === null) {
    callbacks = this._callbacks = [];
  }
  callbacks.push(onCommit);
};

ReactWork.prototype._onCommit = function() {
  if (this._didCommit) {
    return;
  }
  this._didCommit = true;
  const callbacks = this._callbacks;
  if (callbacks === null) {
    return;
  }
  for (let i = 0; i < callbacks.length; i++) {
    const callback = callbacks[i];
    callback();
  }
};

function createContainer(containerInfo) {
  return createFiberRoot(containerInfo);
}
function createFiberRoot(containerInfo) {
  const root = new FiberRootNode(containerInfo);
  const uninitializedFiber = createHostRootFiber(false);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;
  return root;
}
function createHostRootFiber(isConcurrent) {
  let mode = 0b000;
  return createFiber(HostRoot, null, null, mode);
}

function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}

function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  // this.elementType = null;
  // this.type = null;
  // this.stateNode = null;

  // //Fiber
  // this.return = null;
  // this.child = null;
  // this.sibling = null;
  // this.index = 0;

  // this.ref = null;

  this.pendingProps = pendingProps;
  this.mode = mode;
}

function FiberRootNode(containerInfo) {
  this.current = null;
  this.containerInfo = containerInfo;
}

function updateContainer(element, container, parentComponent, callback) {
  const current = container.current;
  // const currentTime = requestCurrentTime();
  // const expirationTime = computeExpirationForFiber(currentTime, current);
  return updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    // expirationTime,
    1073741823,
    callback
  );
}

function updateContainerAtExpirationTime(
  element,
  container,
  parentComponent,
  expirationTime,
  callback
) {
  const current = container.current;
  return scheduleRootUpdate(current, element, expirationTime, callback);
}

function scheduleRootUpdate(current, element, expirationTime, call) {
  return expirationTime;
}
