"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Day;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _recoil = require("recoil");

var _reactRenderHtml = _interopRequireDefault(require("react-render-html"));

var _nanoid = require("nanoid");

var _calendar = require("@root/Recoil/calendar.atom");

var _EventEntry = _interopRequireDefault(require("@root/components/EventEntry/EventEntry"));

var _getEventEntryTime = require("@root/libs/getEventEntryTime");

var _excluded = ["date", "month", "year", "width", "isToday", "isPast", "isSelected", "eventsProp", "eventsGroupMarginTop"];

function Day(_ref) {
  var _ref$date = _ref.date,
      date = _ref$date === void 0 ? 1 : _ref$date,
      _ref$month = _ref.month,
      month = _ref$month === void 0 ? 1 : _ref$month,
      year = _ref.year,
      width = _ref.width,
      _ref$isToday = _ref.isToday,
      isToday = _ref$isToday === void 0 ? false : _ref$isToday,
      _ref$isPast = _ref.isPast,
      isPast = _ref$isPast === void 0 ? true : _ref$isPast,
      _ref$isSelected = _ref.isSelected,
      isSelected = _ref$isSelected === void 0 ? false : _ref$isSelected,
      eventsProp = _ref.eventsProp,
      eventsGroupMarginTop = _ref.eventsGroupMarginTop,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _React$useState = _react.default.useState(width || 20),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      cellWidth = _React$useState2[0],
      setCellWidth = _React$useState2[1];

  var _React$useState3 = _react.default.useState(date),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      dateState = _React$useState4[0],
      setDateState = _React$useState4[1];

  var _React$useState5 = _react.default.useState(month),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      monthState = _React$useState6[0],
      setMonthState = _React$useState6[1];

  var _React$useState7 = _react.default.useState("border-gray-300"),
      _React$useState8 = (0, _slicedToArray2.default)(_React$useState7, 2),
      borderColor = _React$useState8[0],
      setBorderColor = _React$useState8[1];

  var _React$useState9 = _react.default.useState(""),
      _React$useState10 = (0, _slicedToArray2.default)(_React$useState9, 2),
      backgroundColor = _React$useState10[0],
      setBackgroundColor = _React$useState10[1];

  var setSelectedDay = (0, _recoil.useSetRecoilState)(_calendar.selectedDay);

  var _React$useState11 = _react.default.useState(eventsProp),
      _React$useState12 = (0, _slicedToArray2.default)(_React$useState11, 2),
      events = _React$useState12[0],
      setEvents = _React$useState12[1]; // const setMultiDayEventsState = useSetRecoilState(multiDayEventsAtom);


  var use24HourState = (0, _recoil.useRecoilValue)(_calendar.use24HourAtom);
  var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var borderColorObj = {
    gray: "border-gray-300",
    red: "border-red-400",
    blue: "border-blue-600"
  };

  _react.default.useEffect(function () {
    setCellWidth(width);
  }, [width]);

  _react.default.useEffect(function () {
    setDateState(date);
  }, [date]);

  _react.default.useEffect(function () {
    setMonthState(month);
  }, [month]);

  _react.default.useEffect(function () {
    // console.log(eventsProp)
    setEvents(eventsProp);
  }, [eventsProp]);

  var getTextColor = function getTextColor() {
    if (isToday) return "text-blue-700";
    if (!isToday && isPast) return "text-gray-400";
    return "text-gray-800";
  };

  _react.default.useEffect(function () {
    //set border and background color if selected
    // console.log('isSelected', isSelected)
    if (isSelected) {
      setBorderColor(borderColorObj.blue);
      setBackgroundColor("bg-blue-300 md:bg-transparent");
    } else {
      setBorderColor(borderColorObj.gray);
      setBackgroundColor("");
    }
  }, [borderColorObj.blue, borderColorObj.gray, borderColorObj.red, isSelected]);

  var clickHandler = function clickHandler(event) {
    // event.stopPropagation();
    // event.preventDefault();
    var _thisNode = event.target.dataset;
    if (!_thisNode || !_thisNode.date) return; //when click on child element, stop handler
    // console.log(event.target.dataset);

    setSelectedDay({
      date: _thisNode.date,
      month: _thisNode.month,
      year: _thisNode.year
    });
  }; // const getEventEntryTime = (event) => {
  //     //moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss", true);
  //     const momentParser = (timeString) => {
  //         return moment(timeString, "HH:mm", true).format("hh:mm A"); //HH stands for 24hour format
  //     }
  //     const _start = use24HourState
  //                     ? `${event?.start_date_details?.hour}:${event?.start_date_details?.minute}`
  //                     : momentParser(`${event?.start_date_details?.hour}:${event?.start_date_details?.minute}`);
  //     const _end = use24HourState
  //                     ? `${event?.end_date_details?.hour}:${event?.end_date_details?.minute}`
  //                     : momentParser(`${event?.end_date_details?.hour}:${event?.end_date_details?.minute}`);
  //     // console.log(_start)
  //     return `${_start} - ${_end}`
  // }


  return /*#__PURE__*/_react.default.createElement("div", {
    className: "border ".concat(borderColor, " ").concat(backgroundColor, " pl-1 pt-1 md:pl-3 md:pt-3 ").concat(getTextColor()),
    "data-month": monthState,
    "data-date": dateState,
    "data-year": year,
    "data-testid": "calendar-day",
    style: {
      minHeight: "".concat(cellWidth, "px")
    },
    onClick: clickHandler
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-sm md:text-2xl font-bold block",
    "data-month": monthState,
    "data-date": dateState,
    "data-year": year,
    onClick: clickHandler
  }, dateState), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-sm hidden md:block"
  }, dateState === 1 ? monthArray[monthState - 1] : ""), /*#__PURE__*/_react.default.createElement("div", {
    className: "block md:hidden"
  }, (events === null || events === void 0 ? void 0 : events.length) === 0 ? "" : /*#__PURE__*/_react.default.createElement("div", {
    className: "rounded-full w-2 h-2 bg-blue-700"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: eventsGroupMarginTop
  }, events === null || events === void 0 ? void 0 : events.map(function (x) {
    return /*#__PURE__*/_react.default.createElement(_EventEntry.default, {
      title: (0, _reactRenderHtml.default)(x.title),
      link: x.url,
      key: (0, _nanoid.nanoid)(),
      image: x === null || x === void 0 ? void 0 : x.imgUrl,
      time: (0, _getEventEntryTime.getEventEntryTime)(x, use24HourState)
    });
  })));
}