import React from "react";
import { nanoid } from "nanoid";
import { useRecoilValue } from "recoil";
import MobileEventEntry from "@root/components/MobileEvents/MobileEventEntry";
import { multiDayEventsAtom } from "@root/Recoil/calendar.atom";
import { stringTo2Digits } from "@root/libs/getEventsForTheDate";
export default function MultiDayEventsMobile({
  selectedDay,
  ...otherProps
}) {
  const multiDayEventsState = useRecoilValue(multiDayEventsAtom);
  const [multiDayEventsForSelectedDay, setMultiDayEventsForSelectedDay] = React.useState([]); // if selectedDay in the period of the multiDayEvents
  // show the block

  React.useEffect(() => {
    // console.log("mobileView", multiDayEventsState);
    // console.log(
    //     "selectedDay",
    //     `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.date}`
    // );
    const isSelectedDayInThePeriod = (selectedDay, multiDayEvent) => {
      const targetTimeStamp = new Date(`${selectedDay?.year}-${stringTo2Digits(selectedDay?.month)}-${stringTo2Digits(selectedDay?.date)}`).getTime();
      const startBoundary = new Date(new Date(`${multiDayEvent?.start_date_details?.year}-${multiDayEvent?.start_date_details?.month}-${multiDayEvent?.start_date_details?.date}`).setHours(0, 0, 0, 0)).getTime();
      const endBoundary = new Date(new Date(`${multiDayEvent?.end_date_details?.year}-${multiDayEvent?.end_date_details?.month}-${multiDayEvent?.end_date_details?.date}`).setHours(24, 0, 0, 0)).getTime(); // console.log("check????", `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.date}`);

      if (isNaN(targetTimeStamp) || isNaN(startBoundary) || isNaN(endBoundary)) {
        console.error("invalid input for isSelectedDayInThePeriod", targetTimeStamp, startBoundary, endBoundary);
        return false;
      }

      if (targetTimeStamp >= startBoundary && targetTimeStamp <= endBoundary) {
        // console.log("check????", targetTimeStamp, startBoundary);
        // console.log("check????", targetTimeStamp, endBoundary);
        return true;
      }

      return false;
    };

    const temp = [];
    multiDayEventsState.map(x => {
      // console.log('MultiDayEvent: ', x);
      if (isSelectedDayInThePeriod(selectedDay, x)) {
        temp.push(x);
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null);
    }); // console.log('multidayevents for selected day: ', temp)

    setMultiDayEventsForSelectedDay(temp);
  }, [multiDayEventsState, selectedDay]);
  return /*#__PURE__*/React.createElement("div", {
    className: "mb-12"
  }, multiDayEventsForSelectedDay?.map(x => {
    return /*#__PURE__*/React.createElement("div", {
      key: nanoid(),
      className: "block relative md:hidden mt-5 border-t border-b border-gray-700 py-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute -top-3 bg-white px-5"
    }, `${x.start_date_details.year}-${x.start_date_details.month}-${x.start_date_details.date} - ${x.end_date_details.year}-${x.end_date_details.month}-${x.end_date_details.date}`), /*#__PURE__*/React.createElement(MobileEventEntry, {
      title: x.title,
      link: x.url
    }));
  }));
}