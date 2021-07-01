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

// import { stringTo2Digits } from "@root/libs/getEventsForTheDate";
// import { OneDayEvent } from "@root/stories/Calendar.stories.js"
function Calendar(_ref) {
  var events = _ref.events,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_recoil.RecoilRoot, null, /*#__PURE__*/_react.default.createElement(_App.default, (0, _extends2.default)({
    events: events
  }, otherProps)));
}

; // const today = new Date();
// const year = today.getFullYear().toString();
// const month = stringTo2Digits(today.getMonth() + 1);
// const day = stringTo2Digits(today.getDate());
// const placeholder = [{
//     start: `${year}-${month}-${day} 14:30:00`,
//     end: `${year}-${month}-${day} 16:30:00`,
//     timezone: "America/New_York",
//     title:
//         "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
//     url: "https://www.google.com",
//     imgUrl: "https://source.unsplash.com/random/1200x630",
// }];
// ReactDOM.render(
//     <Calendar events={placeholder} use24Hour={false} enableTimezone={'auto'}/>,
//     document.getElementById("root")
// );