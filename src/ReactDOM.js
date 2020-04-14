const ReactDOM = {
  /**
   *
   * callback暂时不讨论所以直接屏蔽了
   */
  render(element, container /* , callback */) {
    // 暂时用不到的参数就直接注释
    return legacyRenderSubtreeIntoContainer(
      // null,
      element,
      container
      // false,
      // callback
    );
  },
};

function legacyRenderSubtreeIntoContainer(
  // parentComponent,
  children,
  container
  /* forceHydrate,
  callback */
) {
  let root = container._reactRootContainer;
  if (!root) {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container
      // false
    );
    root.render(children, undefined);
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
  return new ReactRoot(container /* , false, false */);
}

function ReactRoot(container /* , isConcurrent, hydrate */) {
  const root = createContainer(container /* , isConcurrent, hydrate */);
  this._internalRoot = root;
}

ReactRoot.prototype.render = function (children) {
  const root = this._internalRoot;
  const work = new ReactWork();
  updateContainer(children, root /* , null, work._onCommit */);
  return work;
};
ReactRoot.prototype.unmount = function () {};
ReactRoot.prototype.legacy_renderSubtreeIntoContainer = function () {};
ReactRoot.prototype.createBatch = function () {};

function ReactWork() {
  this._callbacks = null;
  this._didCommit = false;
  this._onCommit = this._onCommit.bind(this);
}

ReactWork.prototype.then = function (onCommit) {
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

ReactWork.prototype._onCommit = function () {
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
  let HostRoot = 3;
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

function updateContainer(element, container /* , parentComponent, callback */) {
  const current = container.current;
  // const currentTime = requestCurrentTime();
  // const expirationTime = computeExpirationForFiber(currentTime, current);
  return updateContainerAtExpirationTime(
    element,
    container,
    // parentComponent,
    /**
     *  第一次渲染是定值expirationTime,
     */
    1073741823
    // callback
  );
}

function updateContainerAtExpirationTime(
  element,
  container,
  // parentComponent,
  expirationTime
  // callback
) {
  const current = container.current;
  return scheduleRootUpdate(current, element, expirationTime /* , callback */);
}

function scheduleRootUpdate(current, element, expirationTime, call) {
  schduleWork(current, expirationTime);
  return expirationTime;
}

function schduleWork(fiber, expirationTime) {
  const root = scheduleWorkToRoot(fiber, expirationTime);
  requestWork(root, expirationTime);
}

function scheduleWorkToRoot(fiber, expirationTime) {
  fiber.expirationTime = expirationTime;
  let root = fiber.stateNode;
  return root;
}

let nextFlushedRoot = null;
let nextFlushedExpirationTime = 1073741823;

function requestWork(root, expirationTime) {
  nextFlushedRoot = root;
  performSyncWork();
}

let Sync = 1073741823;

function performSyncWork() {
  performWork(Sync, false);
}

function performWork(minExpirationTime, isYieldy) {
  performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false);
}

function performWorkOnRoot(root, expirationTime, isYieldy) {
  renderRoot(root);
  completeRoot(root, root.finishedWork, expirationTime);
}

let nextUnitOfWork = null;

function renderRoot(root) {
  nextUnitOfWork = createWorkInProgress(root.current, null, 1073741823);
  workLoop();
  const rootWorkInProgress = root.current.alternate;
  onComplete(root, rootWorkInProgress, 1073741823);
}

function onComplete(root, finishedWork, expirationTime) {
  root.pendingCommitExpirationTime = expirationTime;
  root.finishedWork = finishedWork;
}

function createWorkInProgress(current, pendingProps, expirationTime) {
  let workInProgress = current.alternate;
  if (workInProgress == null) {
    workInProgress = createFiber(
      current.tag,
      pendingProps,
      current.key,
      current.mode
    );
    workInProgress.elementType = current.elementType;
    workInProgress.type = current.type || "div";
    workInProgress.stateNode = current.stateNode;
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  }
  return workInProgress;
}

function workLoop() {
  nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
}

function performUnitOfWork(workInProgress) {
  let next = completeUnitOfWork(workInProgress);
  return next;
}

function completeUnitOfWork(workInProgress) {
  nextUnitOfWork = completeWork(null, workInProgress, 1073741823);
}

let rootContainerInstance = document.getElementById("app");

function completeWork(current, workInProgress, nextRenderExpirationTime) {
  let type = workInProgress.type;
  let newProps = null;
  let instance = createInstance(
    type,
    (newProps = { className: "divComp", children: "this is a div component" }),
    rootContainerInstance,
    {},
    workInProgress
  );
  // appendAllChildren(instance, workInProgress, false, false);
  finalizeInitialChildren(instance, type, newProps, rootContainerInstance, {});
  workInProgress.stateNode = instance;
  console.log(workInProgress);
}

function finalizeInitialChildren(
  domElement,
  type,
  props,
  rootContainerInstance,
  hostContext
) {
  setInitialProperties(domElement, type, props, rootContainerInstance);
  // return shouldAutoFocusHostComponent(type, newProps);
}

function shuldAutoFocusHostComponent(type) {}

function setInitialProperties(domElement, tag, rowProps, rootContainerElement) {
  setInitialDOMProperties(
    tag,
    domElement,
    rootContainerElement,
    rowProps,
    false
  );
}

function setInitialDOMProperties(
  tag,
  domElement,
  rootContainerElement,
  nextProps,
  isCustomComponentTag
) {
  for (const propKey in nextProps) {
    if (!nextProps.hasOwnProperty(propKey)) {
      continue;
    }
    const nextProp = nextProps[propKey];
    if (propKey === "children") {
      if (typeof nextProp === "string") {
        setTextContent(domElement, nextProp);
      }
    }
    if (propKey != null) {
      // setValueForProperty(domElement, propKey, nextProp, isCustomComponentTag);
    }
  }
}

function setTextContent(node, text) {
  if (text) {
  }
  node.textContent = text;
}

function createInstance(
  type,
  props,
  rootContainerInstance,
  hostContext,
  insternalInstanceHandle
) {
  const domElement = createElement(type, props, rootContainerInstance, "aaa");
  return domElement;
}

function createElement(type, props, rootContainerElement, parentNamespace) {
  const ownerDocument = document;
  let domElement = ownerDocument.createElement(type);
  return domElement;
}

function completeRoot(root, finishedWork, expirationTime) {
  commitRoot(root, finishedWork);
}

let nextEffect = null;
function commitRoot(root, finishedWork) {
  nextEffect = finishedWork;
  commitAllHostEffects();
}

function commitAllHostEffects() {
  commitPlacement(nextEffect);
}

function commitPlacement(finishedWork) {
  let node = finishedWork;
  let parent = node.alternate.stateNode.containerInfo;
  appendChildToContainer(parent, node.stateNode);
}

function appendChildToContainer(container, child) {
  let parentNode = container;
  parentNode.appendChild(child);
}

export default ReactDOM;
