"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ViewSelector;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _recoil = require("recoil");

var _calendar = require("../../Recoil/calendar.atom");

function ViewSelector() {
  var _useRecoilState = (0, _recoil.useRecoilState)(_calendar.isViewSelectorHidden),
      _useRecoilState2 = (0, _slicedToArray2.default)(_useRecoilState, 2),
      isViewSelectorHidden = _useRecoilState2[0],
      setIsViewSelectorHidden = _useRecoilState2[1];

  var setCalendarView = (0, _recoil.useSetRecoilState)(_calendar.calendarView);

  var clickHandler = function clickHandler(event) {
    var _event$target, _event$target$dataset;

    event.preventDefault();
    var view = event === null || event === void 0 ? void 0 : (_event$target = event.target) === null || _event$target === void 0 ? void 0 : (_event$target$dataset = _event$target.dataset) === null || _event$target$dataset === void 0 ? void 0 : _event$target$dataset.view; // console.log(view);

    if (view) setCalendarView(view);
    setIsViewSelectorHidden(true);
  };

  if (!isViewSelectorHidden) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "absolute flex flex-col w-24 h-auto border top-14 bg-white z-50"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "w-24 h-12 grid place-content-center border-b cursor-pointer hover:bg-blue-400 hover:text-white",
      "data-view": "LIST",
      onClick: clickHandler
    }, "List"), /*#__PURE__*/_react.default.createElement("div", {
      className: "w-24 h-12  grid place-content-center cursor-pointer hover:bg-blue-400 hover:text-white",
      "data-view": "MONTH",
      onClick: clickHandler
    }, "Month"));
  } else {
    // console.log("viewSelector is hidden: ", isViewSelectorHidden);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  }
}