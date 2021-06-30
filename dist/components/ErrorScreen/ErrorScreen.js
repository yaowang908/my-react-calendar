"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ErrorScreen;

var _react = _interopRequireDefault(require("react"));

function ErrorScreen() {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "absolute w-full h-full grid place-items-center bg-white"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: ""
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "txt-red-600"
  }, "There is an error when fetching the data, please refresh the page to try again"))));
}