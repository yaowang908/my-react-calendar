function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
export default function MultiDayEvent({
  cellWidth,
  barWidthClass,
  bar_with,
  startBlockIndex,
  endBlockIndex,
  link,
  children,
  ...otherProps
}) {
  const borderColor = "border-white";
  const backgroundColor = "bg-blue-400";
  const textColor = "text-white";

  const clickHandler = event => {
    // console.log('Clicked multiDayEvent -> cellWidth: ', cellWidth);
    event.preventDefault();

    if (cellWidth < 104) {
      //  disable link in mobile view
      return;
    }

    if (link) {
      window.open(link, "_self");
    } else {
      console.log("Link does not exist");
    }
  };

  const getLeftMargin = () => {
    return {
      marginLeft: `${startBlockIndex * cellWidth}px`,
      width: bar_with ? `${bar_with * cellWidth}px` : "auto"
    };
  };

  return /*#__PURE__*/React.createElement("div", _extends({
    className: `border ${borderColor} ${backgroundColor} ${textColor} h-1 md:h-6 top-2 px-5 cursor-auto pointer-events-none md:cursor-pointer md:pointer-events-auto text-xxs md:text-sm ${barWidthClass ? barWidthClass : "w-full"}`,
    style: getLeftMargin(),
    onClick: clickHandler
  }, otherProps), /*#__PURE__*/React.createElement("span", {
    className: "hidden md:block"
  }, children));
}