import React from "react";
import { nanoid } from "nanoid";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { targetYear as targetYearState, targetMonth as targetMonthState, isMonthSelectorHidden as isMonthSelectorHiddenState } from "@root/Recoil/calendar.atom";
export default function MonthSelector() {
  const [targetYear, setTargetYear] = useRecoilState(targetYearState);
  const setTargetMonth = useSetRecoilState(targetMonthState);
  const isHidden = useRecoilValue(isMonthSelectorHiddenState);
  const abbrMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const clickHandler = event => {
    event.preventDefault();
    event.stopPropagation(); // console.log('MonthSelector click', event.target.dataset)

    const dataset = event?.target?.dataset || null;
    if (!dataset) return;

    switch (dataset?.type) {
      case "month":
        // console.log('Clicked month: ', abbrMonth[Number(dataset?.month)]);
        setTargetMonth(`month:${Number(dataset?.month) + 1}`);
        break;

      case "prev_year":
        // console.log('Clicked prev year')
        setTargetYear("prevYear");
        break;

      case "next_year":
        // console.log('clicked next year')
        setTargetYear("nextYear");
        break;

      default:
        break;
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: `${isHidden ? "hidden" : "block"} -ml-24 md:ml-0 absolute top-10 w-60 bg-white shadow-md z-50 text-sm p-4 box-border border text-gray-800`
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full h-4 flex flex-nowrap justify-between content-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-4 h-4 md:w-5 md:h-5 text-gray-600 hover:bg-blue-400 hover:text-white cursor-pointer grid place-items-center",
    "data-type": "prev_year",
    onClick: clickHandler
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-full h-full fill-current",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 10 16",
    "data-type": "prev_year"
  }, /*#__PURE__*/React.createElement("path", {
    "data-type": "prev_year",
    d: "M9.7 14.4l-1.5 1.5L.3 8 8.2.1l1.5 1.5L3.3 8l6.4 6.4z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid place-items-center"
  }, targetYear), /*#__PURE__*/React.createElement("div", {
    className: "w-4 h-4 md:w-5 md:h-5 text-gray-600 hover:bg-blue-400 hover:text-white cursor-pointer grid place-items-center",
    "data-type": "next_year",
    onClick: clickHandler
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-full h-full fill-current",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 10 16",
    "data-type": "next_year"
  }, /*#__PURE__*/React.createElement("path", {
    "data-type": "next_year",
    d: "M.3 1.6L1.8.1 9.7 8l-7.9 7.9-1.5-1.5L6.7 8 .3 1.6z"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "w-full h-44 grid grid-cols-4 grid-row-3 mt-2 box-border border-t-2 border-gray-400"
  }, abbrMonth.map((x, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: nanoid(),
      className: "grid place-items-center hover:bg-blue-400 hover:text-white cursor-pointer",
      "data-type": "month",
      "data-month": index,
      onClick: clickHandler
    }, x);
  })));
}