import { eventsPlaceholder } from "@root/libs/placeholder";

const stringTo2Digits = t => {
  if (typeof t !== "string" && typeof t !== "number") return false;
  return Number(t).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
};

const getEventsForTheDate = (month, date, year, arr) => {
  // console.log('arr for mobile view', arr instanceof Array, arr);
  if (!(arr instanceof Array)) return eventsPlaceholder.events;
  const _date = `${year}-${stringTo2Digits(month)}-${stringTo2Digits(date)}`;
  return arr.filter(x => {
    if (x?.date === _date) {
      // console.log('qualified event:', x);
      return true;
    } else {
      // console.log('dis-qualified event:', x?.end_date, _date);
      return false;
    }
  });
};

export { stringTo2Digits, getEventsForTheDate };