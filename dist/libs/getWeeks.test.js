"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _createForOfIteratorHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createForOfIteratorHelper"));

var _require = require("@root/libs/getWeeks"),
    daysInMonth = _require.daysInMonth,
    thisMonth = _require.thisMonth,
    thisDate = _require.thisDate,
    thisDay = _require.thisDay,
    lastDayOfThisMonthAsNumber = _require.lastDayOfThisMonthAsNumber,
    daysNumber = _require.daysNumber,
    days = _require.days,
    weeksGenerator = _require.weeksGenerator,
    weeksSun = _require.weeksSun,
    weeksMon = _require.weeksMon;

test("daysInMonth should return a number", function () {
  expect(daysInMonth(5, 2021)).toBe(31);
  expect(daysInMonth(6, 2021)).toBe(30);
});

var _today = new Date();

test("should thisMonth be a number and matches this month", function () {
  expect(typeof thisMonth).toBe("number");
  expect(thisMonth).toBe(_today.getMonth() + 1);
});
test("should thisDate be a number and matches todays date", function () {
  expect(typeof thisDate).toBe("number");
  expect(thisDate).toBe(_today.getDate());
});
test("should thisDay be a string and one of the day name array", function () {
  expect(typeof thisDay).toBe("object");
  expect(typeof thisDay.fullName).toBe("string");
  expect(typeof thisDay.abbr).toBe("string");
});
test("should lastDayOfThisMonthAsNumber be a number and is correct", function () {
  expect(typeof lastDayOfThisMonthAsNumber).toBe("number");
  expect(lastDayOfThisMonthAsNumber).toBe(daysInMonth(_today.getMonth() + 1, _today.getFullYear()));
});
test("should daysNumber be an array, not empty", function () {
  expect(typeof daysNumber).toBe("object");
  expect(typeof daysNumber[0]).toBe("number"); //any month should have more than 20 days

  expect(daysNumber.length).toBeGreaterThan(20);
});
test("should days be an object array and has correct structure", function () {
  expect(typeof days).toBe("object");
  expect(typeof days[0]).toBe("object"); //any month should have more than 20 days

  expect(days.length).toBeGreaterThan(20);
  var _day = {
    date: expect.any(Number),
    month: _today.getMonth() + 1,
    dayNameNumber: expect.any(Number),
    dayName: {
      abbr: expect.any(String),
      fullName: expect.any(String)
    }
  };

  var _iterator = (0, _createForOfIteratorHelper2.default)(days),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var day = _step.value;
      expect(day).toMatchObject(_day);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
});
var _day = {
  date: expect.any(Number),
  month: expect.any(Number),
  dayNameNumber: expect.any(Number),
  dayName: {
    abbr: expect.any(String),
    fullName: expect.any(String)
  }
};
test("should weeksGenerator return an array of object array", function () {
  var weeksSunTemp = weeksGenerator(0, 6, 2021);
  var weeksMonTemp = weeksGenerator(1, 6, 2021); // console.log('weeksSun', weeksSunTemp)

  var _iterator2 = (0, _createForOfIteratorHelper2.default)(weeksSunTemp),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var week = _step2.value;
      expect(week.length).toBe(7);

      var _iterator4 = (0, _createForOfIteratorHelper2.default)(week),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var day = _step4.value;
          expect(day).toMatchObject(_day);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var _iterator3 = (0, _createForOfIteratorHelper2.default)(weeksMonTemp),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _week = _step3.value;
      expect(_week.length).toBe(7);

      var _iterator5 = (0, _createForOfIteratorHelper2.default)(_week),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _day2 = _step5.value;
          expect(_day2).toMatchObject(_day);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
});
test("should each weeksSun sub array starts from Sunday, length of weeksSun subarray is 7", function () {
  expect(weeksSun[0][0].dayName.fullName).toBe("Sunday");
  expect(weeksSun[0][6].dayName.fullName).toBe("Saturday");

  var _iterator6 = (0, _createForOfIteratorHelper2.default)(weeksSun),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var week = _step6.value;
      expect(week.length).toBe(7);

      var _iterator7 = (0, _createForOfIteratorHelper2.default)(week),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var day = _step7.value;
          expect(day).toMatchObject(_day);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
});
test("should each weeksMon sub array starts from Monday, length of weeksSun subarray is 7", function () {
  expect(weeksMon[0][0].dayName.fullName).toBe("Monday");
  expect(weeksMon[0][6].dayName.fullName).toBe("Sunday");

  var _iterator8 = (0, _createForOfIteratorHelper2.default)(weeksMon),
      _step8;

  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var week = _step8.value;
      expect(week.length).toBe(7);

      var _iterator9 = (0, _createForOfIteratorHelper2.default)(week),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var day = _step9.value;
          expect(day).toMatchObject(_day);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
});