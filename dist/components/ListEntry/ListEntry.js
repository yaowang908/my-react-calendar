"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ListEntry;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactRenderHtml = _interopRequireDefault(require("react-render-html"));

var _excluded = ["date", "time", "title", "link", "imgSrc"];
var local_default_image = null;

function ListEntry(_ref) {
  var date = _ref.date,
      time = _ref.time,
      title = _ref.title,
      link = _ref.link,
      imgSrc = _ref.imgSrc,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _React$useState = _react.default.useState(imgSrc),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      localImgSrc = _React$useState2[0],
      setLocalImgSrc = _React$useState2[1];

  _react.default.useEffect(function () {
    if (local_default_image) {
      if (!imgSrc) {
        setLocalImgSrc(local_default_image);
      }
    }
  }, [imgSrc]);

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "hidden md:grid py-4 px-4 md:px-12 border-b border-gray-300 w-10/12 mx-auto grid grid-cols-12 gap-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-span-8 flex flex-col flex-wrap justify-between"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-sm"
  }, date, " ", (0, _reactRenderHtml.default)("<br/>"), time ? "".concat(time) : ""), /*#__PURE__*/_react.default.createElement("div", {
    className: "font-bold text-base md:text-xl max-w-lg"
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "",
    href: link,
    alt: "event title"
  }, (0, _reactRenderHtml.default)(title)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-span-4 w-auto md:w-48"
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "w-full",
    href: link,
    alt: "event title"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "w-full",
    src: localImgSrc,
    alt: title
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "md:hidden py-4 px-4 md:px-12 border-b border-gray-300 w-10/12 mx-auto grid grid-cols-12 gap-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-span-9 flex flex-col flex-wrap justify-between"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-sm"
  }, date, " ", (0, _reactRenderHtml.default)("<br/>"), time ? "".concat(time) : "")), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-span-3 w-auto md:w-48"
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "w-full",
    href: link,
    alt: "event title"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "w-full",
    src: localImgSrc,
    alt: title
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-span-12 font-bold text-base md:text-xl max-w-lg"
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "",
    href: link,
    alt: "event title"
  }, (0, _reactRenderHtml.default)(title)))));
}