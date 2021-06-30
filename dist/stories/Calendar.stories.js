"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimezoneAuto = exports.MobileView = exports.MultiDayEvent = exports.OneDayEvent = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonViewport = require("@storybook/addon-viewport");

var _index = _interopRequireDefault(require("@root/index.js"));

var _getEventsForTheDate = require("@root/libs/getEventsForTheDate");

var _getWeeks = require("@root/libs/getWeeks");

require("@root/index.css");

var _default = {
  component: _index.default,
  title: "Calendar"
};
exports.default = _default;
var today = new Date();
var year = today.getFullYear().toString();
var month = (0, _getEventsForTheDate.stringTo2Digits)(today.getMonth() + 1);
var day = (0, _getEventsForTheDate.stringTo2Digits)(today.getDate());
var tomorrow = (0, _getEventsForTheDate.stringTo2Digits)(today.getDate() === (0, _getWeeks.daysInMonth)(today.getMonth() + 1, today.getFullYear()) ? 1 : today.getDate() + 1); // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

var Template = function Template(args) {
  return /*#__PURE__*/_react.default.createElement(_index.default, args);
};

var OneDayEvent = Template.bind({});
exports.OneDayEvent = OneDayEvent;
OneDayEvent.args = {
  events: [{
    start: "".concat(year, "-").concat(month, "-").concat(day, " 14:30:00"),
    end: "".concat(year, "-").concat(month, "-").concat(day, " 16:30:00"),
    timezone: "America/New_York",
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    url: "https://www.google.com",
    imgUrl: "https://source.unsplash.com/random/1200x630"
  }, {
    start: "2008-11-22 14:30:00",
    end: "2008-11-22 16:30:00",
    timezone: "America/New_York",
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    url: "https://www.google.com",
    imgUrl: "https://source.unsplash.com/random/1200x630"
  }],
  use24Hour: false,
  enableTimezone: true
};
var MultiDayEvent = Template.bind({}); // TODO:

/**
 *  DONE: 1. streamline data structure for events
 *      DONE: 1. auto generate multi_day attributes
 *      DONE: 2. rename the attributes, make it short
 *  DONE: 2. timezone conversion
 *            1. when set to auto, only show timezone, not changing it
 *  DONE: 3. handle empty input or in-valid ones
 *  DONE: 4. update README file
 *  5. dark theme support
 *  DONE: 6. should be able to switch between military / regular time format
 * */

exports.MultiDayEvent = MultiDayEvent;
MultiDayEvent.args = {
  events: [{
    start: "".concat(year, "-").concat(month, "-08 14:30:00"),
    end: "".concat(year, "-").concat(month, "-10 16:30:00"),
    timezone: "America/New_York",
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    url: "https://www.google.com",
    imgUrl: "https://source.unsplash.com/random/1200x630"
  }],
  use24Hour: true,
  enableTimezone: false
};
var MobileView = Template.bind({});
exports.MobileView = MobileView;
MobileView.args = {
  // events: [...MultiDayEvent.args.events, ...eventsPlaceholder.events]
  events: [{
    start: "".concat(year, "-").concat(month, "-08 14:30:00"),
    end: "".concat(year, "-").concat(month, "-08 16:30:00"),
    timezone: "America/New_York",
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    url: "https://www.google.com",
    imgUrl: "https://source.unsplash.com/random/1200x630"
  }, {
    start: "".concat(year, "-").concat(month, "-08 14:30:00"),
    end: "".concat(year, "-").concat(month, "-09 16:30:00"),
    timezone: "America/New_York",
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    url: "https://www.google.com",
    imgUrl: "https://source.unsplash.com/random/1200x630"
  }, {
    start: "2008-11-22 14:30:00",
    end: "2008-11-23 16:30:00",
    timezone: "America/New_York",
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    url: "https://www.google.com",
    imgUrl: "https://source.unsplash.com/random/1200x630"
  }]
};
MobileView.parameters = {
  viewport: {
    viewports: _addonViewport.INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex'
  }
};
var TimezoneAuto = Template.bind({});
exports.TimezoneAuto = TimezoneAuto;
TimezoneAuto.args = {
  events: [{
    start: "".concat(year, "-").concat(month, "-08 14:30:00"),
    end: "".concat(year, "-").concat(month, "-10 16:30:00"),
    timezone: "America/New_York",
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    url: "https://www.google.com",
    imgUrl: "https://source.unsplash.com/random/1200x630"
  }, {
    start: "".concat(year, "-").concat(month, "-02 10:30:00"),
    end: "".concat(year, "-").concat(month, "-02 12:30:00"),
    timezone: "America/New_York",
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    url: "https://www.google.com",
    imgUrl: "https://source.unsplash.com/random/1200x630"
  }, {
    start: "".concat(year, "-").concat(month, "-05 12:30:00"),
    end: "".concat(year, "-").concat(month, "-05 15:30:00"),
    timezone: "America/New_York",
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    url: "https://www.google.com",
    imgUrl: "https://source.unsplash.com/random/1200x630"
  }],
  use24Hour: false,
  enableTimezone: 'auto'
}; // {
//     id: event.id,
//     status: event.status,
//     date: event.date,
//     date_utc: event.date_utc,
//     url: event.url,
//     title: event.title,
//     image: {url: ''},
//     imgUrl: "https://source.unsplash.com/random/1200x630",
//     start_date: "2021-06-20",
//     start_date_details: {year, month, day, hour, minutes},
//     end_date: event.end_date,
//     end_date_details: {year, month, day, hour, minutes},
//     timezone: event.timezone,
//     multi_day: _multiDay,
// };