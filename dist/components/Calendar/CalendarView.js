"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CalendarView;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _nanoid = require("nanoid");

var _recoil = require("recoil");

var _Week = _interopRequireDefault(require("@root/components/Week/Week"));

var _getWeeks = _interopRequireDefault(require("@root/libs/getWeeks"));

var _calendar = require("@root/Recoil/calendar.atom");

var _useWindowSize3 = _interopRequireDefault(require("@root/hooks/useWindowSize"));

var _placeholder = require("@root/libs/placeholder");

function CalendarView(_ref) {
  var _ref$eventsData = _ref.eventsData,
      eventsData = _ref$eventsData === void 0 ? null : _ref$eventsData,
      otherProps = _ref.otherProps;

  var _React$useState = _react.default.useState(20),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      cellWidth = _React$useState2[0],
      setCellWidth = _React$useState2[1];

  var calendarStart = (0, _recoil.useRecoilValue)(_calendar.calendarStart);
  var targetMonth = (0, _recoil.useRecoilValue)(_calendar.targetMonth);
  var targetYear = (0, _recoil.useRecoilValue)(_calendar.targetYear);

  var _useWindowSize = (0, _useWindowSize3.default)(),
      _useWindowSize2 = (0, _slicedToArray2.default)(_useWindowSize, 2),
      windowWidth = _useWindowSize2[0],
      windowHeight = _useWindowSize2[1];

  var weeks = (0, _getWeeks.default)(calendarStart, targetMonth, targetYear);

  var _React$useState3 = _react.default.useState(weeks),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      weeksState = _React$useState4[0],
      setWeeksState = _React$useState4[1];

  _react.default.useEffect(function () {
    setWeeksState((0, _getWeeks.default)(calendarStart, targetMonth, targetYear)); // console.log('Array', targetMonth, targetYear)
  }, [calendarStart, targetMonth, targetYear]);

  var calendarRef = _react.default.useCallback(function (node) {
    if (!node) return;

    var _node$getBoundingClie = node.getBoundingClientRect(),
        width = _node$getBoundingClie.width;

    setCellWidth(width / 7);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [windowWidth, windowHeight]);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "relative w-full border border-gray-300",
    "data-testid": "calendar-app",
    ref: calendarRef
  }, weeksState.map(function (x) {
    return /*#__PURE__*/_react.default.createElement(_Week.default, {
      datesArray: x,
      cellWidth: cellWidth,
      events: eventsData ? eventsData : _placeholder.eventsPlaceholder,
      key: (0, _nanoid.nanoid)()
    });
  }));
}