import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useRecoilValue } from "recoil";
import MobileEventEntry from "@root/components/MobileEvents/MobileEventEntry";
import { use24HourAtom } from "@root/Recoil/calendar.atom";
import { getEventEntryTime } from "@root/libs/getEventEntryTime";
export default function MobileEvents({
  events,
  monthName,
  date = 0,
  ...otherProps
}) {
  const [eventsState, setEventsState] = React.useState(events);
  const use24HourState = useRecoilValue(use24HourAtom);
  React.useEffect(() => {
    // console.log("MobileEvents: ", events)
    setEventsState(events);
  }, [events]);
  return /*#__PURE__*/React.createElement("div", {
    className: "block relative md:hidden mt-5 border-t border-b border-gray-700 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -top-3 bg-white px-5"
  }, `${monthName} ${date}`), /*#__PURE__*/React.createElement("div", {
    className: ` ${eventsState.length === 0 ? "block" : "hidden"} md:hidden py-3 pl-5 text-gray-400`
  }, eventsState.length === 0 ? "No event at the selected day" : ""), eventsState.map(x => {
    return /*#__PURE__*/React.createElement(MobileEventEntry, {
      key: nanoid(),
      time: getEventEntryTime(x, use24HourState),
      title: x.title,
      link: x.url
    });
  }));
}
MobileEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired,
  monthName: PropTypes.string.isRequired
};