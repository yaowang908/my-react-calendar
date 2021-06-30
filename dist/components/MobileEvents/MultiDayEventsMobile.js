"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MultiDayEventsMobile;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _nanoid = require("nanoid");

var _recoil = require("recoil");

var _MobileEventEntry = _interopRequireDefault(require("./MobileEventEntry"));

var _calendar = require("../../Recoil/calendar.atom");

var _getEventsForTheDate = require("../../libs/getEventsForTheDate");

var _excluded = ["selectedDay"];

function MultiDayEventsMobile(_ref) {
  var selectedDay = _ref.selectedDay,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var multiDayEventsState = (0, _recoil.useRecoilValue)(_calendar.multiDayEventsAtom);

  var _React$useState = _react.default.useState([]),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      multiDayEventsForSelectedDay = _React$useState2[0],
      setMultiDayEventsForSelectedDay = _React$useState2[1]; // if selectedDay in the period of the multiDayEvents
  // show the block


  _react.default.useEffect(function () {
    // console.log("mobileView", multiDayEventsState);
    // console.log(
    //     "selectedDay",
    //     `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.date}`
    // );
    var isSelectedDayInThePeriod = function isSelectedDayInThePeriod(selectedDay, multiDayEvent) {
      var _multiDayEvent$start_, _multiDayEvent$start_2, _multiDayEvent$start_3, _multiDayEvent$end_da, _multiDayEvent$end_da2, _multiDayEvent$end_da3;

      var targetTimeStamp = new Date("".concat(selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.year, "-").concat((0, _getEventsForTheDate.stringTo2Digits)(selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.month), "-").concat((0, _getEventsForTheDate.stringTo2Digits)(selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.date))).getTime();
      var startBoundary = new Date(new Date("".concat(multiDayEvent === null || multiDayEvent === void 0 ? void 0 : (_multiDayEvent$start_ = multiDayEvent.start_date_details) === null || _multiDayEvent$start_ === void 0 ? void 0 : _multiDayEvent$start_.year, "-").concat(multiDayEvent === null || multiDayEvent === void 0 ? void 0 : (_multiDayEvent$start_2 = multiDayEvent.start_date_details) === null || _multiDayEvent$start_2 === void 0 ? void 0 : _multiDayEvent$start_2.month, "-").concat(multiDayEvent === null || multiDayEvent === void 0 ? void 0 : (_multiDayEvent$start_3 = multiDayEvent.start_date_details) === null || _multiDayEvent$start_3 === void 0 ? void 0 : _multiDayEvent$start_3.date)).setHours(0, 0, 0, 0)).getTime();
      var endBoundary = new Date(new Date("".concat(multiDayEvent === null || multiDayEvent === void 0 ? void 0 : (_multiDayEvent$end_da = multiDayEvent.end_date_details) === null || _multiDayEvent$end_da === void 0 ? void 0 : _multiDayEvent$end_da.year, "-").concat(multiDayEvent === null || multiDayEvent === void 0 ? void 0 : (_multiDayEvent$end_da2 = multiDayEvent.end_date_details) === null || _multiDayEvent$end_da2 === void 0 ? void 0 : _multiDayEvent$end_da2.month, "-").concat(multiDayEvent === null || multiDayEvent === void 0 ? void 0 : (_multiDayEvent$end_da3 = multiDayEvent.end_date_details) === null || _multiDayEvent$end_da3 === void 0 ? void 0 : _multiDayEvent$end_da3.date)).setHours(24, 0, 0, 0)).getTime(); // console.log("check????", `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.date}`);

      if (isNaN(targetTimeStamp) || isNaN(startBoundary) || isNaN(endBoundary)) {
        console.error("invalid input for isSelectedDayInThePeriod", targetTimeStamp, startBoundary, endBoundary);
        return false;
      }

      if (targetTimeStamp >= startBoundary && targetTimeStamp <= endBoundary) {
        // console.log("check????", targetTimeStamp, startBoundary);
        // console.log("check????", targetTimeStamp, endBoundary);
        return true;
      }

      return false;
    };

    var temp = [];
    multiDayEventsState.map(function (x) {
      // console.log('MultiDayEvent: ', x);
      if (isSelectedDayInThePeriod(selectedDay, x)) {
        temp.push(x);
      }

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
    }); // console.log('multidayevents for selected day: ', temp)

    setMultiDayEventsForSelectedDay(temp);
  }, [multiDayEventsState, selectedDay]);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "mb-12"
  }, multiDayEventsForSelectedDay === null || multiDayEventsForSelectedDay === void 0 ? void 0 : multiDayEventsForSelectedDay.map(function (x) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: (0, _nanoid.nanoid)(),
      className: "block relative md:hidden mt-5 border-t border-b border-gray-700 py-3"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "absolute -top-3 bg-white px-5"
    }, "".concat(x.start_date_details.year, "-").concat(x.start_date_details.month, "-").concat(x.start_date_details.date, " - ").concat(x.end_date_details.year, "-").concat(x.end_date_details.month, "-").concat(x.end_date_details.date)), /*#__PURE__*/_react.default.createElement(_MobileEventEntry.default, {
      title: x.title,
      link: x.url
    }));
  }));
}