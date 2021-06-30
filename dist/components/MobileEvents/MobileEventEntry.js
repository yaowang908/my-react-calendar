import React from "react";
import renderHTML from "react-render-html";
export default function MobileEventEntry({
  time,
  title,
  link,
  ...otherProps
}) {
  // Done: need to render the title with HTML
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full px-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-500 mt-4"
  }, time ? renderHTML(time) : ''), /*#__PURE__*/React.createElement("div", {
    className: "text-base font-bold"
  }, /*#__PURE__*/React.createElement("a", {
    href: link
  }, renderHTML(title))));
}