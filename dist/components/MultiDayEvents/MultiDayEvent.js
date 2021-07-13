"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MultiDayEvent;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _excluded = ["cellWidth", "barWidthClass", "bar_with", "startBlockIndex", "endBlockIndex", "link", "children", "image", "title"];
var local_default_image = null;

function MultiDayEvent(_ref) {
  var cellWidth = _ref.cellWidth,
      barWidthClass = _ref.barWidthClass,
      bar_with = _ref.bar_with,
      startBlockIndex = _ref.startBlockIndex,
      endBlockIndex = _ref.endBlockIndex,
      link = _ref.link,
      children = _ref.children,
      image = _ref.image,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var borderColor = "border-white";
  var backgroundColor = "bg-blue-400";
  var textColor = "text-white";

  var eventImage = _react.default.useRef(null);

  var multidayEventsContainer = _react.default.useRef(null);

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

  var clickHandler = function clickHandler(event) {
    // console.log('Clicked multiDayEvent -> cellWidth: ', cellWidth);
    event.preventDefault();

    if (cellWidth < 104) {
      //  disable link in mobile view
      return;
    }

    if (link) {
      window.open(link, "_self");
    } else {
      console.log("Link does not exist");
    }
  };

  var mouseEnterHandler = function mouseEnterHandler(event) {
    // console.log('Enter', link, event);
    if (localImgSrc && eventImage && multidayEventsContainer) {
      var cursorX = event.clientX;
      var cursorY = event.clientY;
      var screenWidth = window.innerWidth;
      var screenHeight = window.innerHeight;
      var container = multidayEventsContainer.current.getBoundingClientRect();
      var containerLeft = container.left;
      var containerRight = container.right; // console.log('Cursor', cursorX, cursorY);
      // console.log('Screen', screenWidth, screenHeight);
      // console.log('Container', containerLeft, containerRight);

      var isRightHalf = screenWidth / 2 < cursorX ? true : false;
      var isTopHalf = screenHeight / 2 < cursorY ? false : true;
      eventImage.current.classList.remove("hidden");
      eventImage.current.style.top = '0px';
      eventImage.current.style.left = 'auto';
      eventImage.current.style.right = "auto";

      if (isRightHalf) {
        eventImage.current.classList.add("block", "mr-16");
        eventImage.current.style.right = containerRight - cursorX + 'px';
      } else {
        eventImage.current.classList.add("block", "ml-16");
        eventImage.current.style.left = cursorX - containerLeft + 'px';
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
    eventImage.current.classList.remove("block", "mt-16", "-mt-32", "-ml-32", "mr-32", "mr-16", "ml-16", "-ml-64", "ml-64");
    eventImage.current.classList.add("hidden");
  };

  var getLeftMargin = function getLeftMargin() {
    return {
      marginLeft: "".concat(startBlockIndex * cellWidth, "px"),
      width: bar_with ? "".concat(bar_with * cellWidth, "px") : "auto"
    };
  };

  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: "border ".concat(borderColor, " ").concat(backgroundColor, " ").concat(textColor, " h-1 md:h-6 top-2 px-5 truncate cursor-auto pointer-events-none md:cursor-pointer md:pointer-events-auto text-xxs md:text-sm ").concat(barWidthClass ? barWidthClass : "w-full"),
    style: getLeftMargin(),
    onClick: clickHandler,
    ref: multidayEventsContainer,
    onMouseEnter: mouseEnterHandler,
    onMouseLeave: mouseLeaveHandler
  }, otherProps), /*#__PURE__*/_react.default.createElement("div", {
    className: "hidden w-96 cursor-pointer h-auto absolute z-50",
    ref: eventImage,
    onClick: function onClick() {
      if (link) window.open(link);
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "w-full h-auto",
    src: localImgSrc,
    alt: title
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "hidden md:block"
  }, children));
}