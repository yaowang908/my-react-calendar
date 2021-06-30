"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventsForTheDate = exports.stringTo2Digits = void 0;

var _placeholder = require("./placeholder");

var stringTo2Digits = function stringTo2Digits(t) {
  if (typeof t !== "string" && typeof t !== "number") return false;
  return Number(t).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
};

exports.stringTo2Digits = stringTo2Digits;

var getEventsForTheDate = function getEventsForTheDate(month, date, year, arr) {
  // console.log('arr for mobile view', arr instanceof Array, arr);
  if (!(arr instanceof Array)) return _placeholder.eventsPlaceholder.events;

  var _date = "".concat(year, "-").concat(stringTo2Digits(month), "-").concat(stringTo2Digits(date));

  return arr.filter(function (x) {
    if ((x === null || x === void 0 ? void 0 : x.date) === _date) {
      // console.log('qualified event:', x);
      return true;
    } else {
      // console.log('dis-qualified event:', x?.end_date, _date);
      return false;
    }
  });
};

exports.getEventsForTheDate = getEventsForTheDate;