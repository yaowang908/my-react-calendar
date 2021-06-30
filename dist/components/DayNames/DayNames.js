"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DayNames;

var _react = _interopRequireDefault(require("react"));

var _nanoid = require("nanoid");

function DayNames() {
  var days = [{
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
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "grid grid-cols-7 w-full h-10 mt-5"
  }, days.map(function (x) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "hidden md:block",
      key: (0, _nanoid.nanoid)()
    }, x.fullName);
  }), days.map(function (x) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "block md:hidden",
      key: (0, _nanoid.nanoid)()
    }, x.abbr);
  }));
}