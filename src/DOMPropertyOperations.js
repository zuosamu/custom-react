import { getPropertyInfo } from "./DOMProperty";

export function setValueForProperty(node, name, value) {
  const propertyInfo = getPropertyInfo(name);
  const { attributeName } = propertyInfo;
  if (value == null) {
    node.removeAttribute(attributeName);
  } else {
    node.setAttribute(attributeName, value);
  }
}
