function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "@root/App";
import { OneDayEvent } from "@root/stories/Calendar.stories";
export default function Calendar({
  events,
  ...otherProps
}) {
  return /*#__PURE__*/React.createElement(RecoilRoot, null, /*#__PURE__*/React.createElement(App, _extends({
    events: events
  }, otherProps)));
}
;
ReactDOM.render( /*#__PURE__*/React.createElement(Calendar, {
  events: OneDayEvent.args.events
}), document.getElementById('calendar_root'));