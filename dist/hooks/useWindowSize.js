"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

function useWindowSize() {
  var _useState = (0, _react.useState)([0, 0]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      size = _useState2[0],
      setSize = _useState2[1];

  (0, _react.useLayoutEffect)(function () {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return function () {
      return window.removeEventListener("resize", updateSize);
    };
  }, []);
  return size;
}

var _default = useWindowSize;
exports.default = _default;