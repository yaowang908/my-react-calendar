"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _recoil = require("recoil");

var _Header = _interopRequireDefault(require("./components/Header/Header"));

var _Calendar = _interopRequireDefault(require("./components/Calendar/Calendar"));

require("./index.css");

var _getEventsForTheDate = require("./libs/getEventsForTheDate");

var _calendar = require("./Recoil/calendar.atom");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _excluded = ["events"];

function App(_ref) {
  var events = _ref.events,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _React$useState = _react.default.useState([]),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      formattedEvents = _React$useState2[0],
      setFormattedEvents = _React$useState2[1];

  var clientTimezone = (0, _recoil.useRecoilValue)(_calendar.clientTimezone);
  var setUse24HourState = (0, _recoil.useSetRecoilState)(_calendar.use24HourAtom);
  var setStatus = (0, _recoil.useSetRecoilState)(_calendar.statusSelector);

  var _useRecoilState = (0, _recoil.useRecoilState)(_calendar.enableTimezoneAtom),
      _useRecoilState2 = (0, _slicedToArray2.default)(_useRecoilState, 2),
      enableTimezoneState = _useRecoilState2[0],
      setEnableTimezoneAtom = _useRecoilState2[1];

  var _otherProps = (0, _objectSpread2.default)({}, otherProps),
      use24Hour = _otherProps.use24Hour,
      enableTimezone = _otherProps.enableTimezone,
      status = _otherProps.status,
      onChange = _otherProps.onChange,
      calendarView = _otherProps.calendarView;

  var targetMonth = (0, _recoil.useRecoilValue)(_calendar.targetMonth);
  var targetYear = (0, _recoil.useRecoilValue)(_calendar.targetYear);
  var setCalendarView = (0, _recoil.useSetRecoilState)(_calendar.calendarView);

  _react.default.useEffect(function () {
    if (calendarView && (calendarView === "LIST" || calendarView === "MONTH")) {
      setCalendarView(calendarView);
    } else {
      console.error("Wrong 'calendarView' value ", calendarView);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [calendarView]);

  _react.default.useEffect(function () {
    // console.log(use24Hour)
    setUse24HourState(!!use24Hour); //if it's undefined, !!undefined is false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [use24Hour]);

  _react.default.useEffect(function () {
    // console.log(enableTimezone)
    if (enableTimezone === "auto") {
      setEnableTimezoneAtom("auto");
    } else {
      setEnableTimezoneAtom(!!enableTimezone); //if it's undefined, !!undefined is false
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [enableTimezone]);

  _react.default.useEffect(function () {
    setStatus(status); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  _react.default.useEffect(function () {
    if (typeof onChange === 'function') {
      onChange({
        targetMonth: Number(targetMonth),
        targetYear: Number(targetYear)
      });
    } // console.log("changed")
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [targetMonth, targetYear]); // TODO:

  /**
   *  DONE: 1. streamline data structure for events
   *      DONE: 1. auto generate multi_day attributes
   *      DONE: 2. rename the attributes, make it short
   *  DONE: 2. timezone conversion
   *            DONE: 1. when set to auto, only show timezone, not changing it
   *  DONE: 3. handle empty input or in-valid ones
   *  DONE: 4. update README file
   *  TODO: 5. dark theme support
   *  DONE: 6. should be able to switch between military / regular time format
   *  DONE: 7. add support for fetch new data
   *      DONE: 1. accept an identifier, fetching or error or succeed
   *      DONE: 2. accept an function, will call this function when target month or year changed.
   *      ~~DEPRECATED: 3. when accepting new events data, data will append to existing array, not replacing it.~~
   *  TODO: 8. combine settings into options object
   *      {
   *          use24Hour: false,
   *          enableTimezone: "auto",
   *          status: "fetching", // if undefined disable this feature
   *      }
   *      onChange: function() { targetYear, targetMonth }
   *
   * */

  /**
   *  start(year,month,day,hour,minute), end(...), title, link, imgUrl, timezone
   */


  var getTimeDetails = function getTimeDetails(t) {
    if (typeof t !== "string") return false;
    var day = t.split(" ")[0].split("-");
    var time = t.split(" ")[1].split(":");

    if (!(day && time)) {
      console.error("Format error: start/end should match, 2021-06-22 14:30:00");
      return false;
    }

    var _day = (0, _slicedToArray2.default)(day, 3),
        year = _day[0],
        month = _day[1],
        date = _day[2];

    var _time = (0, _slicedToArray2.default)(time, 3),
        hour = _time[0],
        minute = _time[1],
        second = _time[2];

    return {
      year: year.toString(),
      month: (0, _getEventsForTheDate.stringTo2Digits)(month),
      date: (0, _getEventsForTheDate.stringTo2Digits)(date),
      hour: (0, _getEventsForTheDate.stringTo2Digits)(hour),
      minute: (0, _getEventsForTheDate.stringTo2Digits)(minute),
      second: (0, _getEventsForTheDate.stringTo2Digits)(second)
    };
  };

  var isMultiDay = function isMultiDay(s, e) {
    if ((s === null || s === void 0 ? void 0 : s.year) === (e === null || e === void 0 ? void 0 : e.year) && (s === null || s === void 0 ? void 0 : s.month) === (e === null || e === void 0 ? void 0 : e.month) && (s === null || s === void 0 ? void 0 : s.date) === (e === null || e === void 0 ? void 0 : e.date)) {
      return false;
    }

    return true;
  };

  var convertTimeOnTimezone = function convertTimeOnTimezone(events, enableTimezone, targetTimezone) {
    /**
     * events = events
     *      end: "2021-06-29 16:30:00"
     *      imgUrl: "https://source.unsplash.com/random/1200x630"
     *      start: "2021-06-29 14:30:00"
     *      timezone: "America/New_York"
     *      title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur"
     *      url: "https://www.google.com"
     *      allDay: true | false | undefined
     * enableTimezone = enableTimezoneState
     * targetTimezone = clientTimezone e.g. America/New_York
     *
     * moment-timezone is also required here
     */
    var result = [];

    if (!enableTimezone) {
      // return original data
      return events;
    } else {
      // enableTimezone: true or auto
      if (enableTimezone === "auto") console.log("enableTimezone: auto"); // DONE: calculate time base on timezone
      //REFERENCE: var b = moment.tz("May 12th 2014 8PM", "MMM Do YYYY hA", "America/Toronto");
      // eslint-disable-next-line array-callback-return

      events.map(function (event) {
        if (event.timezone !== targetTimezone) {
          var _startMoment = _momentTimezone.default.tz(event.start, "YYYY-MM-DD HH:mm:ss", event.timezone);

          var _endMoment = _momentTimezone.default.tz(event.end, "YYYY-MM-DD HH:mm:ss", event.timezone);

          var _startMomentAtTargetTimezone = _startMoment.tz(targetTimezone).format("YYYY-MM-DD HH:mm:ss");

          var _endMomentAtTargetTimezone = _endMoment.tz(targetTimezone).format("YYYY-MM-DD HH:mm:ss"); // console.log("startMoment", _startMomentAtTargetTimezone)


          result.push(Object.assign({}, event, {
            end: _endMomentAtTargetTimezone,
            start: _startMomentAtTargetTimezone,
            targetTimezone: targetTimezone
          }));
        } else {
          result.push(event);
        }
      });
      return result;
    }
  };

  _react.default.useEffect(function () {
    // DONE: convert timezone here, if necessary
    var temp = []; // console.log("Events: ", events);

    var eventsConvertedToClientTimezone = convertTimeOnTimezone(events, enableTimezoneState, clientTimezone); // console.log("!!!", eventsConvertedToClientTimezone)

    eventsConvertedToClientTimezone.map(function (event) {
      var _startDetails = getTimeDetails(event === null || event === void 0 ? void 0 : event.start);

      var _endDetails = getTimeDetails(event === null || event === void 0 ? void 0 : event.end);

      if (isMultiDay(_startDetails, _endDetails)) {
        temp.push({
          allDay: event === null || event === void 0 ? void 0 : event.allDay,
          date: "".concat(_endDetails === null || _endDetails === void 0 ? void 0 : _endDetails.year, "-").concat(_endDetails === null || _endDetails === void 0 ? void 0 : _endDetails.month, "-").concat(_endDetails === null || _endDetails === void 0 ? void 0 : _endDetails.date),
          url: event === null || event === void 0 ? void 0 : event.url,
          title: event === null || event === void 0 ? void 0 : event.title,
          imgUrl: event === null || event === void 0 ? void 0 : event.imgUrl,
          start_date_details: _startDetails,
          end_date_details: _endDetails,
          timezone: event === null || event === void 0 ? void 0 : event.timezone,
          multi_day: true,
          multi_day_first: "".concat(_startDetails === null || _startDetails === void 0 ? void 0 : _startDetails.year, "-").concat(_startDetails === null || _startDetails === void 0 ? void 0 : _startDetails.month, "-").concat(_startDetails === null || _startDetails === void 0 ? void 0 : _startDetails.date),
          multi_day_last: "".concat(_endDetails === null || _endDetails === void 0 ? void 0 : _endDetails.year, "-").concat(_endDetails === null || _endDetails === void 0 ? void 0 : _endDetails.month, "-").concat(_endDetails === null || _endDetails === void 0 ? void 0 : _endDetails.date)
        });
      } else {
        temp.push({
          allDay: event === null || event === void 0 ? void 0 : event.allDay,
          date: "".concat(_endDetails === null || _endDetails === void 0 ? void 0 : _endDetails.year, "-").concat(_endDetails === null || _endDetails === void 0 ? void 0 : _endDetails.month, "-").concat(_endDetails === null || _endDetails === void 0 ? void 0 : _endDetails.date),
          url: event === null || event === void 0 ? void 0 : event.url,
          title: event === null || event === void 0 ? void 0 : event.title,
          imgUrl: event === null || event === void 0 ? void 0 : event.imgUrl,
          start_date_details: _startDetails,
          end_date_details: _endDetails,
          timezone: event === null || event === void 0 ? void 0 : event.timezone,
          multi_day: false
        });
      }

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
    }); // console.log('temp: ', temp)

    setFormattedEvents(temp); // console.log(clientTimezone)
  }, [events, clientTimezone, enableTimezoneState]);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "max-w-1080 max-h-full mx-auto px-5"
  }, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_Calendar.default, (0, _extends2.default)({
    events: formattedEvents
  }, otherProps)));
}

var _default = App;
exports.default = _default;