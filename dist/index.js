"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Calendar;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _recoil = require("recoil");

var _App = _interopRequireDefault(require("./App"));

var _excluded = ["events"];

// import { OneDayEvent } from "stories/Calendar.stories"
function Calendar(_ref) {
  var events = _ref.events,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_recoil.RecoilRoot, null, /*#__PURE__*/_react.default.createElement(_App.default, (0, _extends2.default)({
    events: events
  }, otherProps)));
}

; // ReactDOM.render(<Calendar events={OneDayEvent.args.events}/>, document.getElementById('calendar_root'))