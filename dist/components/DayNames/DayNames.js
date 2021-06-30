import React from "react";
import { nanoid } from "nanoid";
export default function DayNames() {
  const days = [{
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
  return /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 w-full h-10 mt-5"
  }, days.map(x => {
    return /*#__PURE__*/React.createElement("div", {
      className: "hidden md:block",
      key: nanoid()
    }, x.fullName);
  }), days.map(x => {
    return /*#__PURE__*/React.createElement("div", {
      className: "block md:hidden",
      key: nanoid()
    }, x.abbr);
  }));
}