function getEventTarget(nativeEvent) {
  let target = nativeEvent.target || nativeEvent.srcElement || window;
  return target.nodeType === 3 ? target.parentNode : target;
}

export default getEventTarget;
