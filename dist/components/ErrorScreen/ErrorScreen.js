import React from "react";
export default function ErrorScreen() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "absolute w-full h-full grid place-items-center bg-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement("h1", {
    className: "txt-red-600"
  }, "There is an error when fetching the data, please refresh the page to try again"))));
}