"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MonthSelector;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _nanoid = require("nanoid");

var _recoil = require("recoil");

var _calendar = require("@root/Recoil/calendar.atom");

function MonthSelector() {
  var _useRecoilState = (0, _recoil.useRecoilState)(_calendar.targetYear),
      _useRecoilState2 = (0, _slicedToArray2.default)(_useRecoilState, 2),
      targetYear = _useRecoilState2[0],
      setTargetYear = _useRecoilState2[1];

  var setTargetMonth = (0, _recoil.useSetRecoilState)(_calendar.targetMonth);
  var isHidden = (0, _recoil.useRecoilValue)(_calendar.isMonthSelectorHidden);
  var abbrMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var clickHandler = function clickHandler(event) {
    var _event$target;

    event.preventDefault();
    event.stopPropagation(); // console.log('MonthSelector click', event.target.dataset)

    var dataset = (event === null || event === void 0 ? void 0 : (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.dataset) || null;
    if (!dataset) return;

    switch (dataset === null || dataset === void 0 ? void 0 : dataset.type) {
      case "month":
        // console.log('Clicked month: ', abbrMonth[Number(dataset?.month)]);
        setTargetMonth("month:".concat(Number(dataset === null || dataset === void 0 ? void 0 : dataset.month) + 1));
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

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(isHidden ? "hidden" : "block", " -ml-24 md:ml-0 absolute top-10 w-60 bg-white shadow-md z-50 text-sm p-4 box-border border text-gray-800")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full h-4 flex flex-nowrap justify-between content-center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "w-4 h-4 md:w-5 md:h-5 text-gray-600 hover:bg-blue-400 hover:text-white cursor-pointer grid place-items-center",
    "data-type": "prev_year",
    onClick: clickHandler
  }, /*#__PURE__*/_react.default.createElement("svg", {
    className: "w-full h-full fill-current",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 10 16",
    "data-type": "prev_year"
  }, /*#__PURE__*/_react.default.createElement("path", {
    "data-type": "prev_year",
    d: "M9.7 14.4l-1.5 1.5L.3 8 8.2.1l1.5 1.5L3.3 8l6.4 6.4z"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "grid place-items-center"
  }, targetYear), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-4 h-4 md:w-5 md:h-5 text-gray-600 hover:bg-blue-400 hover:text-white cursor-pointer grid place-items-center",
    "data-type": "next_year",
    onClick: clickHandler
  }, /*#__PURE__*/_react.default.createElement("svg", {
    className: "w-full h-full fill-current",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 10 16",
    "data-type": "next_year"
  }, /*#__PURE__*/_react.default.createElement("path", {
    "data-type": "next_year",
    d: "M.3 1.6L1.8.1 9.7 8l-7.9 7.9-1.5-1.5L6.7 8 .3 1.6z"
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full h-44 grid grid-cols-4 grid-row-3 mt-2 box-border border-t-2 border-gray-400"
  }, abbrMonth.map(function (x, index) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: (0, _nanoid.nanoid)(),
      className: "grid place-items-center hover:bg-blue-400 hover:text-white cursor-pointer",
      "data-type": "month",
      "data-month": index,
      onClick: clickHandler
    }, x);
  })));
}