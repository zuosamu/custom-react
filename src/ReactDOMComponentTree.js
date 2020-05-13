const randomKey = Math.random().toString(36).slice(2);

const internalInstanceKey = "__reactInternalInstance$" + randomKey;
const internalEventHandlersKey = "__reactEventHandlers$" + randomKey;
let cache = null;
export function precacheFiberNode(hostInst) {
  cache = hostInst;
}

export function getClosestInstanceFromNode(node) {
  if (node[internalInstanceKey]) {
    return node[internalInstanceKey];
  }
  while (!node[internalInstanceKey]) {
    if (node.parentNode) {
      node = node.parentNode;
    } else {
      return null;
    }
  }
  let inst = node[internalInstanceKey];
  if (inst.tag === 5 || inst.tag === 6) {
    return inst;
  }
  return null;
}
