const ReactDOM = {
  render(element,container){
    return legacyRenderSubtreeIntoContainer(element,container);
  }
}

function legacyRenderSubtreeIntoContainer(children,container) {
  appendChildToContainer(container,children)
}

function appendChildToContainer(container,child) {
  container.appendChild(child)
}

export default ReactDOM