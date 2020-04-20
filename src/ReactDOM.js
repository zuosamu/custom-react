import { setValueForProperty } from "./DOMPropertyOperations";

const ReactDOM = {
  render(element, container) {
    return legacyRenderSubtreeIntoContainer(element, container);
  },
};

function legacyRenderSubtreeIntoContainer(children, container) {
  const instance = createInstance(children.type);
  setInitialDOMProperties(instance, children.props);
  appendChildToContainer(container, instance);
}

function appendChildToContainer(container, child) {
  container.appendChild(child);
}

function setInitialDOMProperties(domElement, nextProps) {
  for (const propKey in nextProps) {
    if (!nextProps.hasOwnProperty(propKey)) {
      continue;
    }
    const nextProp = nextProps[propKey];
    if (propKey === "children") {
      if (typeof nextProp === "string") {
        setTextContent(domElement, nextProp);
      }
    } else if (propKey != null) {
      setValueForProperty(domElement, propKey, nextProp);
    }
  }
}

function setTextContent(node, text) {
  node.textContent = text;
}

function createInstance(type) {
  const domElement = createElement(type);
  return domElement;
}

function createElement(type) {
  const ownerDocument = document;
  let domElement = ownerDocument.createElement(type);
  return domElement;
}
export default ReactDOM;
