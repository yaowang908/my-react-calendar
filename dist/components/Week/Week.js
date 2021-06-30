"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Week;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _nanoid = require("nanoid");

var _recoil = require("recoil");

var _reactRenderHtml = _interopRequireDefault(require("react-render-html"));

var _calendar = require("../../Recoil/calendar.atom");

var _Day = _interopRequireDefault(require("../Day/Day"));

var _getEventsForTheDate = require("../../libs/getEventsForTheDate");

var _MultiDayEvent = _interopRequireDefault(require("../MultiDayEvents/MultiDayEvent"));

var _excluded = ["datesArray", "cellWidth", "events"];

function Week(_ref) {
  var datesArray = _ref.datesArray,
      cellWidth = _ref.cellWidth,
      events = _ref.events,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var selectedDay = (0, _recoil.useRecoilValue)(_calendar.selectedDay);
  var multiDayEventsState = (0, _recoil.useRecoilValue)(_calendar.multiDayEventsAtom);

  var _React$useState = _react.default.useState([]),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      localMultiDayEvents = _React$useState2[0],
      setLocalMultiDayEvents = _React$useState2[1];

  var today = new Date();
  var todayMonth = today.getMonth() + 1;
  var todayDate = today.getDate();
  var todayYear = today.getFullYear(); // console.log('Week events: ', events)

  var isDayPast = function isDayPast(month, date, year) {
    if (Number(month) < Number(todayMonth) || Number(year) < Number(todayYear) || Number(month) === Number(todayMonth) && Number(date) < Number(todayDate)) {
      return true;
    }

    return false;
  };

  var isToday = function isToday(month, date, year) {
    if (Number(month) === Number(todayMonth) && Number(date) === Number(todayDate) && Number(year) === Number(todayYear)) {
      return true;
    }

    return false;
  };

  var isSelected = function isSelected(month, date, year, selectedDay) {
    if (!selectedDay || !selectedDay.date) return false;

    if (Number(selectedDay.date) === Number(date) && Number(selectedDay.month) === Number(month) && Number(selectedDay.year) === Number(year)) {
      return true;
    }

    return false;
  };

  var shouldEventShowInThisWeek = function shouldEventShowInThisWeek(eventFirstDay, eventLastDay, weekFirstDay, weekLastDay) {
    var _Date, _Date2, _Date3, _Date4;

    // all four arguments are in this format '2021-05-01'
    var eventFirst = (_Date = new Date(eventFirstDay)) === null || _Date === void 0 ? void 0 : _Date.getTime(),
        eventLast = (_Date2 = new Date(eventLastDay)) === null || _Date2 === void 0 ? void 0 : _Date2.getTime(),
        weekFirst = (_Date3 = new Date(weekFirstDay)) === null || _Date3 === void 0 ? void 0 : _Date3.getTime(),
        weekLast = (_Date4 = new Date(weekLastDay)) === null || _Date4 === void 0 ? void 0 : _Date4.getTime(); // console.log(eventFirstDay, weekLastDay)
    // console.log(eventLast < weekFirst);

    if (eventLast < weekFirst || eventFirst > weekLast) {
      return false;
    }

    return true;
  };

  var getDateTimeStamp = function getDateTimeStamp(dateObj) {
    // return a time stamp
    // make two digits, when new Date() 2021-2-1 is different than 2021-02-01
    return new Date("".concat(dateObj.year, "-").concat((0, _getEventsForTheDate.stringTo2Digits)(dateObj.month), "-").concat((0, _getEventsForTheDate.stringTo2Digits)(dateObj.date))).getTime();
  };

  var barPositionInThisWeek = function barPositionInThisWeek(datesArray, eventFirstDay, eventLastDay) {
    var _Date5, _Date6;

    // full week or a part of the week, index from 0 to 6
    var eventFirst = (_Date5 = new Date(eventFirstDay)) === null || _Date5 === void 0 ? void 0 : _Date5.getTime();
    var eventLast = (_Date6 = new Date(eventLastDay)) === null || _Date6 === void 0 ? void 0 : _Date6.getTime();
    var beginning_index = 0,
        ending_index = 6;

    if (eventFirst > getDateTimeStamp(datesArray[0])) {
      // datesArray.map((x, i) => {
      //     if (getDateTimeStamp(x) === eventFirst) {
      //         beginning_index = i;
      //     }
      //     return <></>;
      // });
      for (var i = 0; i < datesArray.length; i++) {
        if (getDateTimeStamp(datesArray[i]) >= eventFirst) {
          beginning_index = i;
          break;
        }
      }
    }

    if (eventLast < getDateTimeStamp(datesArray[6])) {
      // datesArray.map((x, i) => {
      //     if (getDateTimeStamp(x) === eventLast) {
      //         ending_index = i;
      //     }
      //     return <></>;
      // });
      for (var _i = datesArray.length - 1; _i >= 0; _i--) {
        if (getDateTimeStamp(datesArray[_i]) <= eventLast) {
          ending_index = _i;
          break;
        }
      } // console.log("eventLast < getDateTimeStamp(datesArray[6])");

    } // return a array [beginning_index, ending_index]


    return [beginning_index, ending_index];
  };

  var barsToShowMultiDayEvents = function barsToShowMultiDayEvents(multiDayEventsArray, weekFirstDay, weekLastDay) {
    // loop through multiDayEventsArray
    // compare each event to determine what day to show the cross bar
    var arr = [];
    multiDayEventsArray.forEach(function (element) {
      if (shouldEventShowInThisWeek(element.multi_day_first, element.multi_day_last, weekFirstDay, weekLastDay)) {
        var barPosition = barPositionInThisWeek(datesArray, element.multi_day_first, element.multi_day_last);
        arr.push(Object.assign({}, element, {
          barPositionInThisWeek: barPosition
        }));
      }
    }); //DONE: if two events overlap
    // the earlier the start date is the higher order it should be
    //return an array, contains information for each bar

    return arr;
  };

  _react.default.useEffect(function () {
    // console.log('dates in week component: ', datesArray);
    var firstDay = datesArray[0];
    var lastDay = datesArray[datesArray.length - 1];
    var weekFirstDay = "".concat(firstDay.year, "-").concat((0, _getEventsForTheDate.stringTo2Digits)(firstDay.month), "-").concat((0, _getEventsForTheDate.stringTo2Digits)(firstDay.date));
    var weekLastDay = "".concat(lastDay.year, "-").concat((0, _getEventsForTheDate.stringTo2Digits)(lastDay.month), "-").concat((0, _getEventsForTheDate.stringTo2Digits)(lastDay.date)); // console.log('First and Last day: ', firstDay, lastDay);
    // console.log('multidayEventsArr', multiDayEventsState)

    var arr = barsToShowMultiDayEvents(multiDayEventsState, weekFirstDay, weekLastDay);

    if (arr.length > 0) {
      // console.log('dates in week component: ', datesArray);
      // console.log(arr);
      // setLocalMultiDayEvents([...arr, ...arr]);
      setLocalMultiDayEvents(arr); // console.log('bar position: ', arr)
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [datesArray, multiDayEventsState]);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "relative grid grid-cols-7 w-full"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat((localMultiDayEvents === null || localMultiDayEvents === void 0 ? void 0 : localMultiDayEvents.length) ? "block" : "hidden", " absolute top-9 md:top-10 w-full")
  }, localMultiDayEvents.map(function (x, index) {
    return /*#__PURE__*/_react.default.createElement(_MultiDayEvent.default, {
      cellWidth: cellWidth,
      startBlockIndex: x.barPositionInThisWeek[0],
      endBlockIndex: x.barPositionInThisWeek[1],
      barWidthClass: "".concat(x.barPositionInThisWeek ? "w-" + (x.barPositionInThisWeek[1] - x.barPositionInThisWeek[0] + 1) + "/7" : ""),
      link: x.url,
      bar_with: x.barPositionInThisWeek ? x.barPositionInThisWeek[1] - x.barPositionInThisWeek[0] + 1 : "",
      key: (0, _nanoid.nanoid)()
    }, (0, _reactRenderHtml.default)(x.title));
  })), datesArray.map(function (x) {
    return /*#__PURE__*/_react.default.createElement(_Day.default // date={x.date}
    // month={x.month}
    , (0, _extends2.default)({
      width: cellWidth,
      isToday: isToday(x.month, x.date, x.year),
      isPast: isDayPast(x.month, x.date, x.year),
      isSelected: isSelected(x.month, x.date, x.year, selectedDay),
      eventsProp: (0, _getEventsForTheDate.getEventsForTheDate)(x.month, x.date, x.year, events),
      eventsGroupMarginTop: "".concat(localMultiDayEvents.length ? "mt-" + localMultiDayEvents.length * 6 : "") // DONE: this margin top should change base on how many bars in this day block

    }, x, {
      key: (0, _nanoid.nanoid)()
    }), x.date);
  }));
}