"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Calendar;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _recoil = require("recoil");

var _getWeeks = require("../../libs/getWeeks");

var _calendar = require("../../Recoil/calendar.atom");

var _MobileEvents = _interopRequireDefault(require("../MobileEvents/MobileEvents"));

var _getEventsForTheDate = require("../../libs/getEventsForTheDate");

var _CalendarView = _interopRequireDefault(require("./CalendarView"));

var _MultiDayEventsMobile = _interopRequireDefault(require("../MobileEvents/MultiDayEventsMobile"));

var _ListView = _interopRequireDefault(require("../ListView/ListView"));

var _DayNames = _interopRequireDefault(require("../DayNames/DayNames"));

var _ErrorScreen = _interopRequireDefault(require("../ErrorScreen/ErrorScreen"));

var _Loading = _interopRequireDefault(require("../Loading/Loading"));

// import { stringTo2Digits } from 'libs/getEventsForTheDate';
function Calendar(_ref) {
  var events = _ref.events,
      otherProps = _ref.otherProps;
  var selectedDay = (0, _recoil.useRecoilValue)(_calendar.selectedDay);

  var _useRecoilState = (0, _recoil.useRecoilState)(_calendar.eventsDataAtom),
      _useRecoilState2 = (0, _slicedToArray2.default)(_useRecoilState, 2),
      eventsData = _useRecoilState2[0],
      setEventsData = _useRecoilState2[1];

  var _useRecoilState3 = (0, _recoil.useRecoilState)(_calendar.multiDayEventsAtom),
      _useRecoilState4 = (0, _slicedToArray2.default)(_useRecoilState3, 2),
      multiDayEvents = _useRecoilState4[0],
      setMultiDayEventsState = _useRecoilState4[1];

  var _useRecoilState5 = (0, _recoil.useRecoilState)(_calendar.normalEventsAtom),
      _useRecoilState6 = (0, _slicedToArray2.default)(_useRecoilState5, 2),
      normalEvents = _useRecoilState6[0],
      setNormalEvents = _useRecoilState6[1];

  var calendarView = (0, _recoil.useRecoilValue)(_calendar.calendarView);
  var calendarStatus = (0, _recoil.useRecoilValue)(_calendar.statusSelector);

  var getMobileViewMonthName = function getMobileViewMonthName(selected) {
    // console.log('monthName', selected)
    var monthNum = (selected === null || selected === void 0 ? void 0 : selected.month) || new Date().getMonth() + 1;
    return _getWeeks.monthArray[Number(monthNum) - 1];
  }; //DONE: multi day events needs to cross a few blocks
  // console.log(`${year}-${month}-${date}`, events)


  _react.default.useEffect(function () {
    // console.log(events)
    if (events) {
      setEventsData(events);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [events]);

  _react.default.useEffect(function () {
    var eventsFilter = function eventsFilter(events) {
      var normalEvents = [];
      var multiDayEvents = []; // eslint-disable-next-line array-callback-return

      events === null || events === void 0 ? void 0 : events.map(function (event) {
        if (event === null || event === void 0 ? void 0 : event.multi_day) {
          multiDayEvents.push(event);
        } else {
          normalEvents.push(event);
        }
      });
      return [normalEvents, multiDayEvents];
    };

    var _eventsFilter = eventsFilter(eventsData),
        _eventsFilter2 = (0, _slicedToArray2.default)(_eventsFilter, 2),
        normalEvents = _eventsFilter2[0],
        multiDayEvents = _eventsFilter2[1]; // console.log('normalEvents', normalEvents);
    // console.log('multiDayEvents', multiDayEvents);


    setNormalEvents(normalEvents);
    setMultiDayEventsState(multiDayEvents); // setMultiDayEventsState([...multiDayEvents, ...multiDayEvents]);
    // DONE: multi day events are hidden now
    //DONE: mobile events also
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsData, setMultiDayEventsState]);

  if (calendarStatus === "ERROR") {
    return /*#__PURE__*/_react.default.createElement(_ErrorScreen.default, null);
  }

  if (calendarStatus === "FETCHING") {
    return /*#__PURE__*/_react.default.createElement(_Loading.default, null);
  }

  if (calendarStatus === "SUCCEED" && calendarView === "MONTH") {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DayNames.default, null), /*#__PURE__*/_react.default.createElement(_CalendarView.default, {
      eventsData: normalEvents
    }), /*#__PURE__*/_react.default.createElement(_MultiDayEventsMobile.default, {
      selectedDay: selectedDay
    }), /*#__PURE__*/_react.default.createElement(_MobileEvents.default, {
      events: (0, _getEventsForTheDate.getEventsForTheDate)(selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.month, selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.date, selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.year, normalEvents),
      date: selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.date,
      monthName: getMobileViewMonthName(selectedDay)
    }));
  }

  if (calendarStatus === "SUCCEED" && calendarView === "LIST") {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ListView.default, {
      eventsData: normalEvents,
      multiDayEvents: multiDayEvents
    }));
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " ");
}