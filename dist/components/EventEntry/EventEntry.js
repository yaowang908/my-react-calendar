"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EventEntry;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _excluded = ["time", "title", "link", "image"];
var local_default_image = null;

function EventEntry(_ref) {
  var time = _ref.time,
      title = _ref.title,
      link = _ref.link,
      _ref$image = _ref.image,
      image = _ref$image === void 0 ? "" : _ref$image,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var eventImage = _react.default.useRef(null);

  var _React$useState = _react.default.useState(image),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      localImgSrc = _React$useState2[0],
      setLocalImgSrc = _React$useState2[1];

  _react.default.useEffect(function () {
    if (local_default_image) {
      if (!image) {
        setLocalImgSrc(local_default_image);
      }
    } else {
      setLocalImgSrc(image);
    }
  }, [image]);

  var mouseEnterHandler = function mouseEnterHandler(event) {
    // console.log('Enter', link, event);
    if (localImgSrc) {
      var cursorX = event.clientX;
      var cursorY = event.clientY;
      var screenWidth = window.innerWidth;
      var screenHeight = window.innerHeight; // console.log('Cursor', cursorX, cursorY);
      // console.log('Screen', screenWidth, screenHeight);

      var isRightHalf = screenWidth / 2 < cursorX ? true : false;
      var isTopHalf = screenHeight / 2 < cursorY ? false : true;
      eventImage.current.classList.remove("hidden");

      if (isRightHalf) {
        eventImage.current.classList.add("block", "-ml-64");
      } else {
        eventImage.current.classList.add("block");
      }

      if (isTopHalf) {
        eventImage.current.classList.add("mt-16");
      } else {
        eventImage.current.classList.add("-mt-32");
      }
    }
  };

  var mouseLeaveHandler = function mouseLeaveHandler() {
    // console.log('Leave');
    eventImage.current.classList.remove("block", "mt-16", "-mt-32", "-ml-32");
    eventImage.current.classList.add("hidden");
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "hidden md:block w-full text-xxs lg:text-xs mt-1 border-b border-gray-100 pb-1",
    onMouseEnter: mouseEnterHandler,
    onMouseLeave: mouseLeaveHandler
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "hidden w-96 cursor-pointer h-auto absolute z-50",
    ref: eventImage,
    onClick: function onClick() {
      if (link) window.open(link);
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "w-full h-auto",
    src: localImgSrc,
    alt: title
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "mb-1"
  }, time.toUpperCase()), /*#__PURE__*/_react.default.createElement("div", null, link ? /*#__PURE__*/_react.default.createElement("a", {
    href: link
  }, title) : /*#__PURE__*/_react.default.createElement("p", null, title)));
}