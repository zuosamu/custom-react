import React from "react";
import ReactDOM from "react-dom";

const divComp = React.createElement(
  "div",
  {
    className: "divComp",
    key: "divComp",
  },
  "this is a div component"
);

ReactDOM.render(divComp, document.getElementById("app"));

module.hot && module.hot.accept();
