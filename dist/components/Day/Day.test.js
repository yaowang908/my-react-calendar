"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = require("@testing-library/react");

var _recoil = require("recoil");

var _calendar = require("@root/Recoil/calendar.atom");

var _Day = _interopRequireDefault(require("@root/components/Day/Day"));

var _placeholder = require("@root/libs/placeholder");

test("normal day component should have classes", function () {
  (0, _react.render)( /*#__PURE__*/React.createElement(_Day.default, {
    date: "1",
    month: "5",
    width: "120",
    isToday: false,
    isPast: false,
    isSelected: false,
    events: _placeholder.eventsPlaceholder.events
  }));

  var day = _react.screen.getByTestId("calendar-day");

  expect(day).toBeInTheDocument();
  expect(day).toHaveClass("border border-gray-300 text-gray-800");
});
test("selected day component should have red border", function () {
  (0, _react.render)( /*#__PURE__*/React.createElement(_Day.default, {
    date: "1",
    month: "5",
    width: "120",
    isToday: false,
    isPast: false,
    isSelected: true,
    events: _placeholder.eventsPlaceholder.events
  }));

  var day = _react.screen.getByTestId("calendar-day");

  expect(day).toBeInTheDocument();
  expect(day).toHaveClass("border border-blue-600 text-gray-800");
});
test("past day component should have lighter text", function () {
  (0, _react.render)( /*#__PURE__*/React.createElement(_Day.default, {
    date: "1",
    month: "5",
    width: "120",
    isToday: false,
    isPast: true,
    isSelected: false,
    events: _placeholder.eventsPlaceholder.events
  }));

  var day = _react.screen.getByTestId("calendar-day");

  expect(day).toBeInTheDocument();
  expect(day).toHaveClass("border border-gray-300 text-gray-400");
});
test("day component for today should have blue text", function () {
  (0, _react.render)( /*#__PURE__*/React.createElement(_Day.default, {
    date: "1",
    month: "5",
    width: "120",
    isToday: true,
    isPast: false,
    isSelected: false,
    events: _placeholder.eventsPlaceholder.events
  }));

  var day = _react.screen.getByTestId("calendar-day");

  expect(day).toBeInTheDocument();
  expect(day).toHaveClass("border border-gray-300 text-blue-700");
});
test("Recoil selectedDay default to be false, and update to object it received", function () {
  var initialSnapshot = (0, _recoil.snapshot_UNSTABLE)();
  var today = new Date();
  expect(initialSnapshot.getLoadable(_calendar.selectedDay).valueOrThrow()).toMatchObject({
    month: today.getMonth() + 1,
    date: today.getDate(),
    year: today.getFullYear()
  });
  var testSnapshot;
  (0, _react.act)(function () {
    testSnapshot = (0, _recoil.snapshot_UNSTABLE)(function (_ref) {
      var set = _ref.set;
      return set(_calendar.selectedDay, {
        date: "3",
        month: "6",
        year: "2021"
      });
    });
  });
  expect(testSnapshot.getLoadable(_calendar.selectedDay).valueOrThrow()).toMatchObject({
    date: "3",
    month: "6",
    year: "2021"
  });
});