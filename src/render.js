function render(element, container, callback) {
  /**
   * 判断container是否是一个dom
   * 如果不是就报错
   */

  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback
  );
}

function legacyRenderSubtreeIntoConotainer(
  parentComponent,
  children,
  container,
  forceHydrate,
  callback
) {
  /**
   * 根据parentComponent来判断是否是跟节点
   */
  let root = container._reactRootContainer;
  if (!root) {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate
    );
  }
  return getPublicRootInstance(root._internalRoot);
}
export function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  const isConcurrent = false;
  return new ReactRoot(container, isConcurrent, shouldHydrate);
}

export function getPublicRootInstance(container) {
  const containerFiber = container.current;
  if (!containerFiber.child) {
    return null;
  }
  switch (containerFiber.child.tag) {
    case 5:
      return getPublicRootInstance(containerFiber.child.stateNode);
    default:
      return containerFiber, child.stateNode;
  }
}
