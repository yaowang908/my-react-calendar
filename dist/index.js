"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Calendar;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _recoil = require("recoil");

var _App = _interopRequireDefault(require("./App"));

var _getEventsForTheDate = require("./libs/getEventsForTheDate");

var _excluded = ["events"];

// import { OneDayEvent } from "@root/stories/Calendar.stories.js"
function Calendar(_ref) {
  var events = _ref.events,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_recoil.RecoilRoot, null, /*#__PURE__*/_react.default.createElement(_App.default, (0, _extends2.default)({
    events: events
  }, otherProps)));
}

;
var today = new Date();
var year = today.getFullYear().toString();
var month = (0, _getEventsForTheDate.stringTo2Digits)(today.getMonth() + 1);
var day = (0, _getEventsForTheDate.stringTo2Digits)(today.getDate());
var placeholder = [{
  start: "".concat(year, "-").concat(month, "-").concat(day, " 14:30:00"),
  end: "".concat(year, "-").concat(month, "-").concat(day, " 16:30:00"),
  timezone: "America/New_York",
  title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
  url: "https://www.google.com",
  imgUrl: "https://source.unsplash.com/random/1200x630"
}];

_reactDom.default.render( /*#__PURE__*/_react.default.createElement(Calendar, {
  events: placeholder,
  use24Hour: false,
  enableTimezone: 'auto'
}), document.getElementById("calendar_root"));