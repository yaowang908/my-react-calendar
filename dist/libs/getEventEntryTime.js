"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventEntryTime = void 0;

var _moment = _interopRequireDefault(require("moment"));

var getEventEntryTime = function getEventEntryTime(event, use24HourState) {
  var _event$start_date_det, _event$start_date_det2, _event$start_date_det3, _event$start_date_det4, _event$end_date_detai, _event$end_date_detai2, _event$end_date_detai3, _event$end_date_detai4;

  //moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss", true);
  var momentParser = function momentParser(timeString) {
    return (0, _moment.default)(timeString, "HH:mm", true).format("hh:mm A"); //HH stands for 24hour format
  };

  var _start = use24HourState ? "".concat(event === null || event === void 0 ? void 0 : (_event$start_date_det = event.start_date_details) === null || _event$start_date_det === void 0 ? void 0 : _event$start_date_det.hour, ":").concat(event === null || event === void 0 ? void 0 : (_event$start_date_det2 = event.start_date_details) === null || _event$start_date_det2 === void 0 ? void 0 : _event$start_date_det2.minute) : momentParser("".concat(event === null || event === void 0 ? void 0 : (_event$start_date_det3 = event.start_date_details) === null || _event$start_date_det3 === void 0 ? void 0 : _event$start_date_det3.hour, ":").concat(event === null || event === void 0 ? void 0 : (_event$start_date_det4 = event.start_date_details) === null || _event$start_date_det4 === void 0 ? void 0 : _event$start_date_det4.minute));

  var _end = use24HourState ? "".concat(event === null || event === void 0 ? void 0 : (_event$end_date_detai = event.end_date_details) === null || _event$end_date_detai === void 0 ? void 0 : _event$end_date_detai.hour, ":").concat(event === null || event === void 0 ? void 0 : (_event$end_date_detai2 = event.end_date_details) === null || _event$end_date_detai2 === void 0 ? void 0 : _event$end_date_detai2.minute) : momentParser("".concat(event === null || event === void 0 ? void 0 : (_event$end_date_detai3 = event.end_date_details) === null || _event$end_date_detai3 === void 0 ? void 0 : _event$end_date_detai3.hour, ":").concat(event === null || event === void 0 ? void 0 : (_event$end_date_detai4 = event.end_date_details) === null || _event$end_date_detai4 === void 0 ? void 0 : _event$end_date_detai4.minute)); // console.log(_start)


  return "".concat(_start, " - ").concat(_end);
};

exports.getEventEntryTime = getEventEntryTime;