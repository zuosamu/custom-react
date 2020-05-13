import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

const divComp = React.createElement(
  "div",
  {
    className: "divComp",
    key: "divComp",
    onClick:alert
  },
  "this is a div component"
);

ReactDOM.render(divComp, document.getElementById("app"));

module.hot && module.hot.accept();
