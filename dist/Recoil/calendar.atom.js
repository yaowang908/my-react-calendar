"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusSelector = exports.enableTimezoneAtom = exports.use24HourAtom = exports.clientTimezoneSelector = exports.clientTimezone = exports.calendarView = exports.isViewSelectorHidden = exports.normalEventsAtom = exports.multiDayEventsAtom = exports.isMonthSelectorHidden = exports.eventsDataAtom = exports.eventsBufferAtom = exports.selectedDay = exports.targetYear = exports.targetMonth = exports.calendarStart = void 0;

var _placeholder = require("../libs/placeholder");

var _recoil = require("recoil");

var _getEventsForTheDate = require("../libs/getEventsForTheDate");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var calendarStart = (0, _recoil.atom)({
  key: "calendarStart",
  default: 0
}); // 0 => Sunday, 1 => Monday

exports.calendarStart = calendarStart;
var today = new Date();
var targetMonthAtom = (0, _recoil.atom)({
  key: "targetMonthAtom",
  default: today.getMonth() + 1
});
var targetMonth = (0, _recoil.selector)({
  key: "targetMonth",
  get: function get(_ref) {
    var _get = _ref.get;
    return _get(targetMonthAtom);
  },
  set: function set(_ref2, method) {
    var _set = _ref2.set,
        get = _ref2.get;
    var currentTargetMonth = get(targetMonthAtom);

    switch (true) {
      case method === "nextMonth":
        if (currentTargetMonth === 12) {
          _set(targetMonthAtom, 1);

          _set(targetYearAtom, get(targetYearAtom) + 1);
        } else {
          _set(targetMonthAtom, currentTargetMonth + 1);
        }

        return;

      case method === "prevMonth":
        if (currentTargetMonth === 1) {
          _set(targetMonthAtom, 12);

          _set(targetYearAtom, get(targetYearAtom) - 1);
        } else {
          _set(targetMonthAtom, currentTargetMonth - 1);
        }

        return;

      case /month:/.test(method):
        // console.log('regex working!')
        // console.log(method.split(':')[1])
        _set(targetMonthAtom, method.split(":")[1]);

        break;

      default:
        if (method instanceof _recoil.DefaultValue) {
          _set(targetMonthAtom, method);
        } // set(DefaultValue);


        return;
    }
  }
});
exports.targetMonth = targetMonth;
var targetYearAtom = (0, _recoil.atom)({
  key: "targetYearAtom",
  default: today.getFullYear()
});
var targetYear = (0, _recoil.selector)({
  key: "targetYear",
  get: function get(_ref3) {
    var _get2 = _ref3.get;
    return _get2(targetYearAtom);
  },
  set: function set(_ref4, method) {
    var _set2 = _ref4.set,
        get = _ref4.get;
    var currentTargetYear = get(targetYearAtom);

    switch (method) {
      case "prevYear":
        _set2(targetYearAtom, currentTargetYear - 1);

        return;

      case "nextYear":
        _set2(targetYearAtom, currentTargetYear + 1);

        return;

      default:
        if (method instanceof _recoil.DefaultValue) {
          _set2(targetYearAtom, method);
        }

        return;
    }
  }
});
exports.targetYear = targetYear;
var selectedDay = (0, _recoil.atom)({
  key: "selectedDay",
  default: {
    month: (0, _getEventsForTheDate.stringTo2Digits)(today.getMonth() + 1),
    date: (0, _getEventsForTheDate.stringTo2Digits)(today.getDate()),
    year: today.getFullYear().toString()
  }
});
exports.selectedDay = selectedDay;
var eventsBufferAtom = (0, _recoil.atom)({
  key: "eventsBufferAtom",
  default: {}
});
exports.eventsBufferAtom = eventsBufferAtom;
var eventsDataAtom = (0, _recoil.atom)({
  key: "eventsDataAtom",
  default: _placeholder.eventsPlaceholder.events
});
exports.eventsDataAtom = eventsDataAtom;
var isMonthSelectorHidden = (0, _recoil.atom)({
  key: "isMonthSelectorHidden",
  default: true
});
exports.isMonthSelectorHidden = isMonthSelectorHidden;
var multiDayEventsAtom = (0, _recoil.atom)({
  key: "multiDayEventsAtom",
  default: []
});
exports.multiDayEventsAtom = multiDayEventsAtom;
var normalEventsAtom = (0, _recoil.atom)({
  key: "normalEventsAtom",
  default: []
});
exports.normalEventsAtom = normalEventsAtom;
var isViewSelectorHidden = (0, _recoil.atom)({
  key: "isViewSelectorHidden",
  default: true
});
exports.isViewSelectorHidden = isViewSelectorHidden;
var calendarViewAtom = (0, _recoil.atom)({
  key: "calendarViewAtom",
  default: 'MONTH'
});
var calendarView = (0, _recoil.selector)({
  key: "calendarView",
  get: function get(_ref5) {
    var _get3 = _ref5.get;
    return _get3(calendarViewAtom);
  },
  set: function set(_ref6, view) {
    var _set3 = _ref6.set,
        get = _ref6.get;

    switch (view) {
      case "LIST":
        // console.log("list selected")
        _set3(calendarViewAtom, "LIST");

        break;

      case "MONTH":
        // console.log("month selected")
        _set3(calendarViewAtom, "MONTH");

        break;

      default:
        if (view instanceof _recoil.DefaultValue) {
          _set3(calendarViewAtom, view);
        }

        break;
    }
  }
});
exports.calendarView = calendarView;
var clientTimezone = (0, _recoil.atom)({
  key: "clientTimezone",
  default: _momentTimezone.default.tz.guess()
});
exports.clientTimezone = clientTimezone;
var clientTimezoneSelector = (0, _recoil.selector)({
  key: "clientTimezoneSelector",
  get: function get(_ref7) {
    var _get4 = _ref7.get;
    return _get4(clientTimezone);
  },
  set: function set(_ref8, timezoneObject) {
    var _set4 = _ref8.set,
        get = _ref8.get;

    if (timezoneObject instanceof _recoil.DefaultValue) {
      _set4(clientTimezone, timezoneObject);

      return;
    }

    if (timezoneObject === null || timezoneObject === void 0 ? void 0 : timezoneObject.value) {
      _set4(clientTimezone, timezoneObject === null || timezoneObject === void 0 ? void 0 : timezoneObject.value);
    } else {
      console.error("There is something wrong with the timezone selector");
    }
  }
});
exports.clientTimezoneSelector = clientTimezoneSelector;
var use24HourAtom = (0, _recoil.atom)({
  key: "use24Hour",
  default: false
});
exports.use24HourAtom = use24HourAtom;
var enableTimezoneAtom = (0, _recoil.atom)({
  key: "enableTimezone",
  default: true
});
exports.enableTimezoneAtom = enableTimezoneAtom;
var statusAtom = (0, _recoil.atom)({
  key: "statusAtom",
  default: "SUCCEED"
});
var statusSelector = (0, _recoil.selector)({
  key: "statusSelector",
  get: function get(_ref9) {
    var _get5 = _ref9.get;
    return _get5(statusAtom);
  },
  set: function set(_ref10, newStatus) {
    var _set5 = _ref10.set,
        get = _ref10.get;

    if (newStatus instanceof _recoil.DefaultValue) {
      _set5(statusAtom, "SUCCEED");

      return;
    }

    if (newStatus === "ERROR") {
      _set5(statusAtom, "ERROR");

      return;
    }

    if (newStatus === "FETCHING") {
      _set5(statusAtom, "FETCHING");

      return;
    }

    if (newStatus === "SUCCEED") {
      _set5(statusAtom, "SUCCEED");

      return;
    }

    console.error("Unrecognized Status code: calendar status can only be one of the following: ['SUCCEED', 'ERROR', 'FETCHING']");
  }
});
exports.statusSelector = statusSelector;