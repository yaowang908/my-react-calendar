"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.weeksMon = exports.weeksSun = exports.weeksGenerator = exports.days = exports.daysNumber = exports.lastDayOfThisMonthAsNumber = exports.dayArray = exports.thisDay = exports.thisDate = exports.thisMonth = exports.monthArray = exports.daysInMonth = void 0;

var _createForOfIteratorHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createForOfIteratorHelper"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var daysInMonth = function daysInMonth(month, year) {
  return Number(new Date(year, month, 0).getDate());
};

exports.daysInMonth = daysInMonth;

var getDayNameAsNumber = function getDayNameAsNumber(date, month, year) {
  return Number(new Date("".concat(month, "/").concat(date, "/").concat(year)).getDay());
};

var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
exports.monthArray = monthArray;
var dayArray = [{
  fullName: "Sunday",
  abbr: "Sun."
}, {
  fullName: "Monday",
  abbr: "Mon."
}, {
  fullName: "Tuesday",
  abbr: "Tue."
}, {
  fullName: "Wednesday",
  abbr: "Wed."
}, {
  fullName: "Thursday",
  abbr: "Thu."
}, {
  fullName: "Friday",
  abbr: "Fri."
}, {
  fullName: "Saturday",
  abbr: "Sat."
}, {
  fullName: "Sunday",
  abbr: "Sun."
}];
exports.dayArray = dayArray;
var today = new Date();
var thisYear = today.getFullYear();
var thisMonth = today.getMonth() + 1;
exports.thisMonth = thisMonth;
var thisDate = today.getDate();
exports.thisDate = thisDate;
var thisDayAsNumber = today.getDay();
var thisDay = dayArray[thisDayAsNumber]; // const lastMonth = today.getMonth === 0 ? 12 : today.getMonth();
// // get the number of last day of last month
// const lastDayOfLastMonthAsNumber = daysInMonth(lastMonth, thisYear);
// // get day name as NUMBER of the first day of this month
// const whatDayIsTheFirstDayOfThisMonthAsNumber = getDayNameAsNumber(1, thisMonth, thisYear);

exports.thisDay = thisDay;

var daysGenerator = function daysGenerator(month, year) {
  var _lastDayOfThisMonthAsNumber = daysInMonth(month, year);

  var _daysNumber = [];

  for (var i = _lastDayOfThisMonthAsNumber; i > 0; i--) {
    _daysNumber.unshift(i);
  }

  var _days = [];

  _daysNumber.forEach(function (day) {
    var __n = getDayNameAsNumber(day, month, year);

    _days.push({
      date: day,
      month: month,
      year: year,
      dayNameNumber: __n,
      dayName: dayArray[__n]
    });
  });

  return [_daysNumber, _days];
};

var lastDayOfThisMonthAsNumber = daysInMonth(thisMonth, thisYear);
exports.lastDayOfThisMonthAsNumber = lastDayOfThisMonthAsNumber;

var _daysGenerator = daysGenerator(thisMonth, thisYear),
    _daysGenerator2 = (0, _slicedToArray2.default)(_daysGenerator, 2),
    daysNumber = _daysGenerator2[0],
    days = _daysGenerator2[1];

exports.days = days;
exports.daysNumber = daysNumber;

// accept starting day dayName
//  0 => Sunday, 1 => Monday
var completeWeek = function completeWeek(arr, startingIndex, currentYear) {
  /**
  * arr = [
      { date: 1, month: 6, dayNameNumber: 2, dayName: [Object] },
      { date: 2, month: 6, dayNameNumber: 3, dayName: [Object] },
      { date: 3, month: 6, dayNameNumber: 4, dayName: [Object] },
      { date: 4, month: 6, dayNameNumber: 5, dayName: [Object] },
      { date: 5, month: 6, dayNameNumber: 6, dayName: [Object] },
      { date: 6, month: 6, dayNameNumber: 0, dayName: [Object] }
    ]
  */
  var _arr = (0, _toConsumableArray2.default)(arr);

  if (_arr.length >= 7) return; // if array length equal or longer than 7, return

  var missingDays = 7 - _arr.length;
  var _lastDay = _arr[arr.length - 1];
  var _firstDay = _arr[0];
  var _thisMonth = _lastDay.month;

  if (_arr[0].dayNameNumber === startingIndex) {
    // missing days at the end
    // this could only happen at the end of each month
    // so the added days should have the next month, date starts from 1
    for (var i = 1; i <= missingDays; i++) {
      _arr.push({
        date: i,
        month: Number(_thisMonth) + 1,
        year: currentYear,
        dayNameNumber: _lastDay.dayNameNumber + i,
        dayName: dayArray[_lastDay.dayNameNumber + i] //when number reaches 7, it should return Sunday

      });
    }

    return _arr;
  } // missing days at the beginning
  // this could only happen at the beginning of each month
  // the added days should have the last month, dates depends on the last month max day number


  var _lastMonthLastDay = daysInMonth(_firstDay.month - 1, currentYear);

  for (var _i = 0; _i < missingDays; _i++) {
    // console.log(_lastMonthLastDay - i);
    _arr.unshift({
      date: _lastMonthLastDay - _i,
      month: Number(_thisMonth) - 1,
      year: currentYear,
      dayNameNumber: _firstDay.dayNameNumber - 1 - _i,
      // the starting index is either 0 or 1
      dayName: dayArray[_firstDay.dayNameNumber - 1 - _i]
    });
  } // console.log('completed arr:', _arr)


  return _arr;
};

var weeksGenerator = function weeksGenerator() {
  var starting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var currentMonth = arguments.length > 1 ? arguments[1] : undefined;
  var currentYear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2021;

  var _daysGenerator3 = daysGenerator(currentMonth, currentYear),
      _daysGenerator4 = (0, _slicedToArray2.default)(_daysGenerator3, 2),
      days = _daysGenerator4[1];

  var weeksTemp = [];
  var wNum = 0;

  var _iterator = (0, _createForOfIteratorHelper2.default)(days),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var day = _step.value;

      if (day.dayNameNumber === starting) {
        wNum += 1;
      }

      if (!weeksTemp[wNum]) {
        weeksTemp[wNum] = [];
      }

      weeksTemp[wNum].push(day);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  for (var i = 0; i < (weeksTemp === null || weeksTemp === void 0 ? void 0 : weeksTemp.length); i++) {
    var _weeksTemp$i;

    if (((_weeksTemp$i = weeksTemp[i]) === null || _weeksTemp$i === void 0 ? void 0 : _weeksTemp$i.length) < 7) {
      weeksTemp[i] = completeWeek(weeksTemp[i], starting, currentYear);
    }
  }

  return weeksTemp;
}; // week starts from Sunday


exports.weeksGenerator = weeksGenerator;
var weeksSun = weeksGenerator(0, thisMonth, 2021); // week starts from Monday

exports.weeksSun = weeksSun;
var weeksMon = weeksGenerator(1, thisMonth, 2021);
exports.weeksMon = weeksMon;
var _default = weeksGenerator;
exports.default = _default;