import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isViewSelectorHidden as isViewSelectorHiddenState, calendarView } from "@root/Recoil/calendar.atom";
export default function ViewSelector() {
  const [isViewSelectorHidden, setIsViewSelectorHidden] = useRecoilState(isViewSelectorHiddenState);
  const setCalendarView = useSetRecoilState(calendarView);

  const clickHandler = event => {
    event.preventDefault();
    const view = event?.target?.dataset?.view; // console.log(view);

    if (view) setCalendarView(view);
    setIsViewSelectorHidden(true);
  };

  if (!isViewSelectorHidden) {
    return /*#__PURE__*/React.createElement("div", {
      className: "absolute flex flex-col w-24 h-auto border top-14 bg-white z-50"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-24 h-12 grid place-content-center border-b cursor-pointer hover:bg-blue-400 hover:text-white",
      "data-view": "LIST",
      onClick: clickHandler
    }, "List"), /*#__PURE__*/React.createElement("div", {
      className: "w-24 h-12  grid place-content-center cursor-pointer hover:bg-blue-400 hover:text-white",
      "data-view": "MONTH",
      onClick: clickHandler
    }, "Month"));
  } else {
    // console.log("viewSelector is hidden: ", isViewSelectorHidden);
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }
}