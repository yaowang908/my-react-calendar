"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = require("@testing-library/react");

var _App = _interopRequireDefault(require("./App"));

test("renders App", function () {
  (0, _react.render)( /*#__PURE__*/React.createElement(_App.default, null));

  var app = _react.screen.getByTestId("calendar-app");

  expect(app).toBeInTheDocument();
});