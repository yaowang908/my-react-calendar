export const daysInMonth = (month, year) => {
  return Number(new Date(year, month, 0).getDate());
};

const getDayNameAsNumber = (date, month, year) => {
  return Number(new Date(`${month}/${date}/${year}`).getDay());
};

export const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayArray = [{
  fullName: "Sunday",
  abbr: "Sun."
}, {
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
const today = new Date();
const thisYear = today.getFullYear();
export const thisMonth = today.getMonth() + 1;
export const thisDate = today.getDate();
const thisDayAsNumber = today.getDay();
export const thisDay = dayArray[thisDayAsNumber]; // const lastMonth = today.getMonth === 0 ? 12 : today.getMonth();
// // get the number of last day of last month
// const lastDayOfLastMonthAsNumber = daysInMonth(lastMonth, thisYear);
// // get day name as NUMBER of the first day of this month
// const whatDayIsTheFirstDayOfThisMonthAsNumber = getDayNameAsNumber(1, thisMonth, thisYear);

const daysGenerator = (month, year) => {
  const _lastDayOfThisMonthAsNumber = daysInMonth(month, year);

  const _daysNumber = [];

  for (let i = _lastDayOfThisMonthAsNumber; i > 0; i--) {
    _daysNumber.unshift(i);
  }

  const _days = [];

  _daysNumber.forEach(day => {
    const __n = getDayNameAsNumber(day, month, year);

    _days.push({
      date: day,
      month: month,
      year: year,
      dayNameNumber: __n,
      dayName: dayArray[__n]
    });
  });

  return [_daysNumber, _days];
};

const lastDayOfThisMonthAsNumber = daysInMonth(thisMonth, thisYear);
const [daysNumber, days] = daysGenerator(thisMonth, thisYear);
export { dayArray, lastDayOfThisMonthAsNumber, daysNumber, days }; // accept starting day dayName
//  0 => Sunday, 1 => Monday

const completeWeek = (arr, startingIndex, currentYear) => {
  /**
  * arr = [
      { date: 1, month: 6, dayNameNumber: 2, dayName: [Object] },
      { date: 2, month: 6, dayNameNumber: 3, dayName: [Object] },
      { date: 3, month: 6, dayNameNumber: 4, dayName: [Object] },
      { date: 4, month: 6, dayNameNumber: 5, dayName: [Object] },
      { date: 5, month: 6, dayNameNumber: 6, dayName: [Object] },
      { date: 6, month: 6, dayNameNumber: 0, dayName: [Object] }
    ]
  */
  const _arr = [...arr];
  if (_arr.length >= 7) return; // if array length equal or longer than 7, return

  const missingDays = 7 - _arr.length;
  const _lastDay = _arr[arr.length - 1];
  const _firstDay = _arr[0];
  const _thisMonth = _lastDay.month;

  if (_arr[0].dayNameNumber === startingIndex) {
    // missing days at the end
    // this could only happen at the end of each month
    // so the added days should have the next month, date starts from 1
    for (let i = 1; i <= missingDays; i++) {
      _arr.push({
        date: i,
        month: Number(_thisMonth) + 1,
        year: currentYear,
        dayNameNumber: _lastDay.dayNameNumber + i,
        dayName: dayArray[_lastDay.dayNameNumber + i] //when number reaches 7, it should return Sunday

      });
    }

    return _arr;
  } // missing days at the beginning
  // this could only happen at the beginning of each month
  // the added days should have the last month, dates depends on the last month max day number


  const _lastMonthLastDay = daysInMonth(_firstDay.month, currentYear);

  for (let i = 0; i < missingDays; i++) {
    // console.log(_lastMonthLastDay - i);
    _arr.unshift({
      date: _lastMonthLastDay - i,
      month: Number(_thisMonth) - 1,
      year: currentYear,
      dayNameNumber: _firstDay.dayNameNumber - 1 - i,
      // the starting index is either 0 or 1
      dayName: dayArray[_firstDay.dayNameNumber - 1 - i]
    });
  } // console.log('completed arr:', _arr)


  return _arr;
};

const weeksGenerator = (starting = 0, currentMonth, currentYear = 2021) => {
  const [, days] = daysGenerator(currentMonth, currentYear);
  const weeksTemp = [];
  let wNum = 0;

  for (const day of days) {
    if (day.dayNameNumber === starting) {
      wNum += 1;
    }

    if (!weeksTemp[wNum]) {
      weeksTemp[wNum] = [];
    }

    weeksTemp[wNum].push(day);
  }

  for (let i = 0; i < weeksTemp?.length; i++) {
    if (weeksTemp[i]?.length < 7) {
      weeksTemp[i] = completeWeek(weeksTemp[i], starting, currentYear);
    }
  }

  return weeksTemp;
}; // week starts from Sunday


const weeksSun = weeksGenerator(0, thisMonth, 2021); // week starts from Monday

const weeksMon = weeksGenerator(1, thisMonth, 2021);
export { weeksGenerator, weeksSun, weeksMon };
export default weeksGenerator;