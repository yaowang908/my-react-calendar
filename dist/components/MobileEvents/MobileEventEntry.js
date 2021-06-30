"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MobileEventEntry;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactRenderHtml = _interopRequireDefault(require("react-render-html"));

var _excluded = ["time", "title", "link"];

function MobileEventEntry(_ref) {
  var time = _ref.time,
      title = _ref.title,
      link = _ref.link,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  // Done: need to render the title with HTML
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full px-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-xs text-gray-500 mt-4"
  }, time ? (0, _reactRenderHtml.default)(time) : ''), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-base font-bold"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: link
  }, (0, _reactRenderHtml.default)(title))));
}