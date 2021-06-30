"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MultiDayEvent;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _excluded = ["cellWidth", "barWidthClass", "bar_with", "startBlockIndex", "endBlockIndex", "link", "children"];

function MultiDayEvent(_ref) {
  var cellWidth = _ref.cellWidth,
      barWidthClass = _ref.barWidthClass,
      bar_with = _ref.bar_with,
      startBlockIndex = _ref.startBlockIndex,
      endBlockIndex = _ref.endBlockIndex,
      link = _ref.link,
      children = _ref.children,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var borderColor = "border-white";
  var backgroundColor = "bg-blue-400";
  var textColor = "text-white";

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

  var getLeftMargin = function getLeftMargin() {
    return {
      marginLeft: "".concat(startBlockIndex * cellWidth, "px"),
      width: bar_with ? "".concat(bar_with * cellWidth, "px") : "auto"
    };
  };

  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: "border ".concat(borderColor, " ").concat(backgroundColor, " ").concat(textColor, " h-1 md:h-6 top-2 px-5 cursor-auto pointer-events-none md:cursor-pointer md:pointer-events-auto text-xxs md:text-sm ").concat(barWidthClass ? barWidthClass : "w-full"),
    style: getLeftMargin(),
    onClick: clickHandler
  }, otherProps), /*#__PURE__*/_react.default.createElement("span", {
    className: "hidden md:block"
  }, children));
}