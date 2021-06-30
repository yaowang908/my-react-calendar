"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MobileEvents;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _nanoid = require("nanoid");

var _recoil = require("recoil");

var _MobileEventEntry = _interopRequireDefault(require("./MobileEventEntry"));

var _calendar = require("../../Recoil/calendar.atom");

var _getEventEntryTime = require("../../libs/getEventEntryTime");

var _excluded = ["events", "monthName", "date"];

function MobileEvents(_ref) {
  var events = _ref.events,
      monthName = _ref.monthName,
      _ref$date = _ref.date,
      date = _ref$date === void 0 ? 0 : _ref$date,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _React$useState = _react.default.useState(events),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      eventsState = _React$useState2[0],
      setEventsState = _React$useState2[1];

  var use24HourState = (0, _recoil.useRecoilValue)(_calendar.use24HourAtom);

  _react.default.useEffect(function () {
    // console.log("MobileEvents: ", events)
    setEventsState(events);
  }, [events]);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "block relative md:hidden mt-5 border-t border-b border-gray-700 py-3"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "absolute -top-3 bg-white px-5"
  }, "".concat(monthName, " ").concat(date)), /*#__PURE__*/_react.default.createElement("div", {
    className: " ".concat(eventsState.length === 0 ? "block" : "hidden", " md:hidden py-3 pl-5 text-gray-400")
  }, eventsState.length === 0 ? "No event at the selected day" : ""), eventsState.map(function (x) {
    return /*#__PURE__*/_react.default.createElement(_MobileEventEntry.default, {
      key: (0, _nanoid.nanoid)(),
      time: (0, _getEventEntryTime.getEventEntryTime)(x, use24HourState),
      title: x.title,
      link: x.url
    });
  }));
}