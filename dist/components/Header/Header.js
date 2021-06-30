"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Header;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _recoil = require("recoil");

var _reactTimezoneSelect = _interopRequireDefault(require("react-timezone-select"));

var _calendar = require("@root/Recoil/calendar.atom");

var _getWeeks = require("@root/libs/getWeeks");

var _MonthSelector = _interopRequireDefault(require("@root/components/MonthSelector/MonthSelector"));

var _ViewSelector = _interopRequireDefault(require("@root/components/ViewSelector/ViewSelector"));

function Header() {
  var _useRecoilState = (0, _recoil.useRecoilState)(_calendar.targetMonth),
      _useRecoilState2 = (0, _slicedToArray2.default)(_useRecoilState, 2),
      targetMonth = _useRecoilState2[0],
      setTargetMonth = _useRecoilState2[1];

  var targetYear = (0, _recoil.useRecoilValue)(_calendar.targetYear);
  var resetMonth = (0, _recoil.useResetRecoilState)(_calendar.targetMonth);
  var resetYear = (0, _recoil.useResetRecoilState)(_calendar.targetYear);
  var resetSelectedDay = (0, _recoil.useResetRecoilState)(_calendar.selectedDay);

  var _useRecoilState3 = (0, _recoil.useRecoilState)(_calendar.isMonthSelectorHidden),
      _useRecoilState4 = (0, _slicedToArray2.default)(_useRecoilState3, 2),
      isMonthSelectorHidden = _useRecoilState4[0],
      setIsMonthSelectorHidden = _useRecoilState4[1];

  var _useRecoilState5 = (0, _recoil.useRecoilState)(_calendar.isViewSelectorHidden),
      _useRecoilState6 = (0, _slicedToArray2.default)(_useRecoilState5, 2),
      isViewSelectorHidden = _useRecoilState6[0],
      setIsViewSelectorHidden = _useRecoilState6[1];

  var calendarView = (0, _recoil.useRecoilValue)(_calendar.calendarView);

  var _useRecoilState7 = (0, _recoil.useRecoilState)(_calendar.clientTimezoneSelector),
      _useRecoilState8 = (0, _slicedToArray2.default)(_useRecoilState7, 2),
      clientTimezone = _useRecoilState8[0],
      setClientTimezone = _useRecoilState8[1];

  var enableTimezone = (0, _recoil.useRecoilValue)(_calendar.enableTimezoneAtom);

  var prevMonthClickHandler = function prevMonthClickHandler(event) {
    event.preventDefault();
    setTargetMonth("prevMonth");
  };

  var nextMonthClickHandler = function nextMonthClickHandler(event) {
    event.preventDefault();
    setTargetMonth("nextMonth");
  };

  var monthSelectorClickHandler = function monthSelectorClickHandler(event) {
    event.preventDefault();
    event.stopPropagation(); // console.log('clicked', isMonthSelectorHidden);

    setIsMonthSelectorHidden(!isMonthSelectorHidden);
  };

  var resetClickHandler = function resetClickHandler(event) {
    event.preventDefault(); // console.log('reset state')

    resetMonth();
    resetYear();
    resetSelectedDay(); // setIsViewSelectorHidden(true);
  };

  _react.default.useEffect(function () {
    var hideMonthSelector = function hideMonthSelector(event) {
      // event.preventDefault(); //this will conflict with other parts of the page
      event.stopPropagation();
      setIsMonthSelectorHidden(true);
    };

    document.body.addEventListener("click", hideMonthSelector);
    return function () {
      window.removeEventListener("click", hideMonthSelector);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var viewSelectorClickHandler = function viewSelectorClickHandler() {
    // console.log('click')
    setIsViewSelectorHidden(!isViewSelectorHidden);
  }; // DONE: add indicator that the timezone is display timezone


  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row flex-nowrap justify-between w-full bg-white z-30 ".concat(calendarView === 'LIST' ? 'sticky top-0' : '')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row flex-nowrap justify-start items-center w-4/5 md:w-6/12 h-20"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row flex-nowrap"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "mr-3 md:mr-5 hover:bg-blue-400 hover:text-white",
    onClick: prevMonthClickHandler
  }, /*#__PURE__*/_react.default.createElement("svg", {
    className: "w-3 h-3 md:w-5 md:h-5 fill-current text-gray-800 hover:text-white",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 10 16"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M9.7 14.4l-1.5 1.5L.3 8 8.2.1l1.5 1.5L3.3 8l6.4 6.4z"
  }))), /*#__PURE__*/_react.default.createElement("button", {
    className: "hover:bg-blue-400 hover:text-white",
    onClick: nextMonthClickHandler
  }, /*#__PURE__*/_react.default.createElement("svg", {
    className: "w-3 h-3 md:w-5 md:h-5 fill-current text-gray-800 hover:text-white",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 10 16"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M.3 1.6L1.8.1 9.7 8l-7.9 7.9-1.5-1.5L6.7 8 .3 1.6z"
  })))), /*#__PURE__*/_react.default.createElement("button", {
    className: "text-gray-600 border-2 border-gray-400 rounded py-1 px-2 mx-2 text-sm md:text-base md:px-5 md:mx-5 hover:bg-blue-400 hover:text-white",
    onClick: resetClickHandler
  }, "Today"), /*#__PURE__*/_react.default.createElement("div", {
    className: "relative text-sm md:text-2xl flex flex-row items-center cursor-pointer",
    onClick: monthSelectorClickHandler
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: ""
  }, _getWeeks.monthArray[targetMonth - 1], " ", targetYear), /*#__PURE__*/_react.default.createElement("div", {
    className: "ml-3"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    className: "w-3 h-2 fill-current text-gray-800",
    viewBox: "0 0 10 7",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.008.609L5 4.6 8.992.61l.958.958L5 6.517.05 1.566l.958-.958z"
  }))), /*#__PURE__*/_react.default.createElement(_MonthSelector.default, null))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex-row flex-nowrap items-center ml-4 hidden ".concat(enableTimezone && enableTimezone !== 'auto' ? 'md:flex md:w-5/12' : '')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row flex-nowrap items-center text-xs"
  }, "Time zone: "), /*#__PURE__*/_react.default.createElement("div", {
    className: "mx-4 w-full max-w-xxs text-xs text-gray-600 "
  }, /*#__PURE__*/_react.default.createElement(_reactTimezoneSelect.default, {
    value: clientTimezone,
    onChange: setClientTimezone
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex-row flex-nowrap items-center ml-4 hidden ".concat(enableTimezone === 'auto' ? 'md:flex md:w-5/12' : '')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row flex-nowrap items-center text-xs"
  }, "Time zone: "), /*#__PURE__*/_react.default.createElement("div", {
    className: "mx-4 w-full max-w-xxs text-xs text-gray-600 "
  }, clientTimezone)), /*#__PURE__*/_react.default.createElement("div", {
    className: "relative flex flex-row flex-nowrap justify-end items-center w-1/5 md:w-1/12 h-20"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "w-5 cursor-pointer",
    onClick: viewSelectorClickHandler
  }, /*#__PURE__*/_react.default.createElement("svg", {
    className: "fill-current text-gray-800",
    viewBox: "0 0 18 19",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 .991v17.04c0 .236.162.428.361.428h17.175c.2 0 .361-.192.361-.429V.991c0-.237-.162-.428-.361-.428H.36C.161.563 0 .754 0 .99zm.985.803H16.89v2.301H.985v-2.3zM16.89 5.223H.985v12H16.89v-12zM6.31 7.366v.857c0 .237.192.429.429.429h.857a.429.429 0 00.428-.429v-.857a.429.429 0 00-.428-.429H6.74a.429.429 0 00-.429.429zm3.429.857v-.857c0-.237.191-.429.428-.429h.857c.237 0 .429.192.429.429v.857a.429.429 0 01-.429.429h-.857a.429.429 0 01-.428-.429zm3.428-.857v.857c0 .237.192.429.429.429h.857a.429.429 0 00.428-.429v-.857a.429.429 0 00-.428-.429h-.857a.429.429 0 00-.429.429zm-6.857 4.286v-.858c0-.236.192-.428.429-.428h.857c.236 0 .428.192.428.428v.858a.429.429 0 01-.428.428H6.74a.429.429 0 01-.429-.428zm3.429-.858v.858c0 .236.191.428.428.428h.857a.429.429 0 00.429-.428v-.858a.429.429 0 00-.429-.428h-.857a.428.428 0 00-.428.428zm3.428.858v-.858c0-.236.192-.428.429-.428h.857c.236 0 .428.192.428.428v.858a.429.429 0 01-.428.428h-.857a.429.429 0 01-.429-.428zm-10.286-.858v.858c0 .236.192.428.429.428h.857a.429.429 0 00.429-.428v-.858a.429.429 0 00-.429-.428h-.857a.429.429 0 00-.429.428zm0 4.286v-.857c0-.237.192-.429.429-.429h.857c.237 0 .429.192.429.429v.857a.429.429 0 01-.429.429h-.857a.429.429 0 01-.429-.429zm3.429-.857v.857c0 .237.192.429.429.429h.857a.429.429 0 00.428-.429v-.857a.429.429 0 00-.428-.429H6.74a.429.429 0 00-.429.429zm3.429.857v-.857c0-.237.191-.429.428-.429h.857c.237 0 .429.192.429.429v.857a.429.429 0 01-.429.429h-.857a.429.429 0 01-.428-.429z"
  }))), /*#__PURE__*/_react.default.createElement(_ViewSelector.default, null)));
}