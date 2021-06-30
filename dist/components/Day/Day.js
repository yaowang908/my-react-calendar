import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import renderHTML from "react-render-html";
import { nanoid } from "nanoid";
import { selectedDay as selectedDayState, use24HourAtom } from "@root/Recoil/calendar.atom";
import EventEntry from "@root/components/EventEntry/EventEntry";
import { getEventEntryTime } from "@root/libs/getEventEntryTime";
export default function Day({
  date = 1,
  month = 1,
  year,
  width,
  isToday = false,
  isPast = true,
  isSelected = false,
  eventsProp,
  eventsGroupMarginTop,
  ...otherProps
}) {
  const [cellWidth, setCellWidth] = React.useState(width || 20);
  const [dateState, setDateState] = React.useState(date);
  const [monthState, setMonthState] = React.useState(month);
  const [borderColor, setBorderColor] = React.useState("border-gray-300");
  const [backgroundColor, setBackgroundColor] = React.useState("");
  const setSelectedDay = useSetRecoilState(selectedDayState);
  const [events, setEvents] = React.useState(eventsProp); // const setMultiDayEventsState = useSetRecoilState(multiDayEventsAtom);

  const use24HourState = useRecoilValue(use24HourAtom);
  const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const borderColorObj = {
    gray: "border-gray-300",
    red: "border-red-400",
    blue: "border-blue-600"
  };
  React.useEffect(() => {
    setCellWidth(width);
  }, [width]);
  React.useEffect(() => {
    setDateState(date);
  }, [date]);
  React.useEffect(() => {
    setMonthState(month);
  }, [month]);
  React.useEffect(() => {
    // console.log(eventsProp)
    setEvents(eventsProp);
  }, [eventsProp]);

  const getTextColor = () => {
    if (isToday) return "text-blue-700";
    if (!isToday && isPast) return "text-gray-400";
    return "text-gray-800";
  };

  React.useEffect(() => {
    //set border and background color if selected
    // console.log('isSelected', isSelected)
    if (isSelected) {
      setBorderColor(borderColorObj.blue);
      setBackgroundColor("bg-blue-300 md:bg-transparent");
    } else {
      setBorderColor(borderColorObj.gray);
      setBackgroundColor("");
    }
  }, [borderColorObj.blue, borderColorObj.gray, borderColorObj.red, isSelected]);

  const clickHandler = event => {
    // event.stopPropagation();
    // event.preventDefault();
    const _thisNode = event.target.dataset;
    if (!_thisNode || !_thisNode.date) return; //when click on child element, stop handler
    // console.log(event.target.dataset);

    setSelectedDay({
      date: _thisNode.date,
      month: _thisNode.month,
      year: _thisNode.year
    });
  }; // const getEventEntryTime = (event) => {
  //     //moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss", true);
  //     const momentParser = (timeString) => {
  //         return moment(timeString, "HH:mm", true).format("hh:mm A"); //HH stands for 24hour format
  //     }
  //     const _start = use24HourState
  //                     ? `${event?.start_date_details?.hour}:${event?.start_date_details?.minute}`
  //                     : momentParser(`${event?.start_date_details?.hour}:${event?.start_date_details?.minute}`);
  //     const _end = use24HourState
  //                     ? `${event?.end_date_details?.hour}:${event?.end_date_details?.minute}`
  //                     : momentParser(`${event?.end_date_details?.hour}:${event?.end_date_details?.minute}`);
  //     // console.log(_start)
  //     return `${_start} - ${_end}`
  // }


  return /*#__PURE__*/React.createElement("div", {
    className: `border ${borderColor} ${backgroundColor} pl-1 pt-1 md:pl-3 md:pt-3 ${getTextColor()}`,
    "data-month": monthState,
    "data-date": dateState,
    "data-year": year,
    "data-testid": "calendar-day",
    style: {
      minHeight: `${cellWidth}px`
    },
    onClick: clickHandler
  }, /*#__PURE__*/React.createElement("div", {
    className: `text-sm md:text-2xl font-bold block`,
    "data-month": monthState,
    "data-date": dateState,
    "data-year": year,
    onClick: clickHandler
  }, dateState), /*#__PURE__*/React.createElement("div", {
    className: "text-sm hidden md:block"
  }, dateState === 1 ? monthArray[monthState - 1] : ""), /*#__PURE__*/React.createElement("div", {
    className: "block md:hidden"
  }, events?.length === 0 ? "" : /*#__PURE__*/React.createElement("div", {
    className: "rounded-full w-2 h-2 bg-blue-700"
  })), /*#__PURE__*/React.createElement("div", {
    className: eventsGroupMarginTop
  }, events?.map(x => {
    return /*#__PURE__*/React.createElement(EventEntry, {
      title: renderHTML(x.title),
      link: x.url,
      key: nanoid(),
      image: x?.imgUrl,
      time: getEventEntryTime(x, use24HourState)
    });
  })));
}