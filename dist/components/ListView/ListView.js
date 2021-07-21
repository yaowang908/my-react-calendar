"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ListView;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _nanoid = require("nanoid");

var _recoil = require("recoil");

var _calendar = require("../../Recoil/calendar.atom");

var _ListEntry = _interopRequireDefault(require("../ListEntry/ListEntry"));

var _getEventEntryTime = require("../../libs/getEventEntryTime");

var _excluded = ["eventsData", "multiDayEvents"];

function ListView(_ref) {
  var eventsData = _ref.eventsData,
      multiDayEvents = _ref.multiDayEvents,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  // const normalEvents = useRecoilValue(normalEventsAtom);
  // const multiDayEvents = useRecoilValue(multiDayEventsAtom);
  var targetMonth = (0, _recoil.useRecoilValue)(_calendar.targetMonth);
  var targetYear = (0, _recoil.useRecoilValue)(_calendar.targetYear);
  var use24HourState = (0, _recoil.useRecoilValue)(_calendar.use24HourAtom);

  var _React$useState = _react.default.useState(eventsData),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      normal = _React$useState2[0],
      setNormal = _React$useState2[1];

  var _React$useState3 = _react.default.useState(multiDayEvents),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      multi = _React$useState4[0],
      setMulti = _React$useState4[1];

  _react.default.useEffect(function () {
    setNormal(eventsData);
    setMulti(multiDayEvents);
  }, [eventsData, multiDayEvents]); //  DONE: make it sticky after header
  //DONE: only show evens on the targeted month


  var shouldMultiDayEventShow = function shouldMultiDayEventShow(startDateDetails, endDateDetails, targetMonth, targetYear) {
    if (!(startDateDetails && endDateDetails && targetMonth && targetYear)) return false;
    var _ref2 = [Number(startDateDetails === null || startDateDetails === void 0 ? void 0 : startDateDetails.month), Number(startDateDetails === null || startDateDetails === void 0 ? void 0 : startDateDetails.year)],
        startDateMonth = _ref2[0],
        startDateYear = _ref2[1];
    var _ref3 = [Number(endDateDetails === null || endDateDetails === void 0 ? void 0 : endDateDetails.month), Number(endDateDetails === null || endDateDetails === void 0 ? void 0 : endDateDetails.year)],
        endDateMonth = _ref3[0],
        endDateYear = _ref3[1];
    if (endDateYear < targetYear || startDateYear > targetYear) return false;
    if (endDateMonth < targetMonth || startDateMonth > targetMonth) return false;
    return true;
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "relative w-full border-b border-gray-900 mb-12 z-10 bg-white sticky top-80 shadow-xl"
  }, multi === null || multi === void 0 ? void 0 : multi.map(function (x, index) {
    if (shouldMultiDayEventShow(x === null || x === void 0 ? void 0 : x.start_date_details, x === null || x === void 0 ? void 0 : x.end_date_details, targetMonth, targetYear)) {
      var _x$start_date_details, _x$start_date_details2, _x$start_date_details3, _x$end_date_details, _x$end_date_details2, _x$end_date_details3;

      // console.log("targetDate: ", targetMonth, targetYear);
      // console.log("multi: ", multi)
      // DONE: show time here
      return /*#__PURE__*/_react.default.createElement(_ListEntry.default, {
        key: (0, _nanoid.nanoid)(),
        date: "".concat(x === null || x === void 0 ? void 0 : (_x$start_date_details = x.start_date_details) === null || _x$start_date_details === void 0 ? void 0 : _x$start_date_details.year, "-").concat(x === null || x === void 0 ? void 0 : (_x$start_date_details2 = x.start_date_details) === null || _x$start_date_details2 === void 0 ? void 0 : _x$start_date_details2.month, "-").concat(x === null || x === void 0 ? void 0 : (_x$start_date_details3 = x.start_date_details) === null || _x$start_date_details3 === void 0 ? void 0 : _x$start_date_details3.date, " - ").concat(x === null || x === void 0 ? void 0 : (_x$end_date_details = x.end_date_details) === null || _x$end_date_details === void 0 ? void 0 : _x$end_date_details.year, "-").concat(x === null || x === void 0 ? void 0 : (_x$end_date_details2 = x.end_date_details) === null || _x$end_date_details2 === void 0 ? void 0 : _x$end_date_details2.month, "-").concat(x === null || x === void 0 ? void 0 : (_x$end_date_details3 = x.end_date_details) === null || _x$end_date_details3 === void 0 ? void 0 : _x$end_date_details3.date),
        link: x === null || x === void 0 ? void 0 : x.url,
        title: x === null || x === void 0 ? void 0 : x.title,
        imgSrc: x === null || x === void 0 ? void 0 : x.imgUrl
      });
    }

    return "";
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "relative w-full"
  }, normal === null || normal === void 0 ? void 0 : normal.map(function (x) {
    var _x$end_date_details4, _x$end_date_details5;

    if (Number(x === null || x === void 0 ? void 0 : (_x$end_date_details4 = x.end_date_details) === null || _x$end_date_details4 === void 0 ? void 0 : _x$end_date_details4.year) === Number(targetYear) && Number(x === null || x === void 0 ? void 0 : (_x$end_date_details5 = x.end_date_details) === null || _x$end_date_details5 === void 0 ? void 0 : _x$end_date_details5.month) === Number(targetMonth)) {
      var _x$end_date_details6, _x$end_date_details7, _x$end_date_details8;

      return /*#__PURE__*/_react.default.createElement(_ListEntry.default, {
        key: (0, _nanoid.nanoid)(),
        date: "".concat(x === null || x === void 0 ? void 0 : (_x$end_date_details6 = x.end_date_details) === null || _x$end_date_details6 === void 0 ? void 0 : _x$end_date_details6.year, "-").concat(x === null || x === void 0 ? void 0 : (_x$end_date_details7 = x.end_date_details) === null || _x$end_date_details7 === void 0 ? void 0 : _x$end_date_details7.month, "-").concat(x === null || x === void 0 ? void 0 : (_x$end_date_details8 = x.end_date_details) === null || _x$end_date_details8 === void 0 ? void 0 : _x$end_date_details8.date),
        time: (x === null || x === void 0 ? void 0 : x.allDay) ? undefined : (0, _getEventEntryTime.getEventEntryTime)(x, use24HourState),
        link: x === null || x === void 0 ? void 0 : x.url,
        title: x === null || x === void 0 ? void 0 : x.title,
        imgSrc: x === null || x === void 0 ? void 0 : x.imgUrl
      });
    }

    return "";
  })));
}