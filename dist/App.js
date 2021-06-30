function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import Header from "@root/components/Header/Header";
import Calendar from "@root/components/Calendar/Calendar";
import "@root/index.css";
import { stringTo2Digits } from "@root/libs/getEventsForTheDate";
import { clientTimezone as clientTimezoneState, use24HourAtom, enableTimezoneAtom } from "@root/Recoil/calendar.atom";
import moment from "moment-timezone";

function App({
  events,
  ...otherProps
}) {
  const [formattedEvents, setFormattedEvents] = React.useState([]);
  const clientTimezone = useRecoilValue(clientTimezoneState);
  const setUse24HourState = useSetRecoilState(use24HourAtom);
  const [enableTimezoneState, setEnableTimezoneAtom] = useRecoilState(enableTimezoneAtom);
  const {
    use24Hour,
    enableTimezone
  } = { ...otherProps
  };
  React.useEffect(() => {
    // console.log(use24Hour)
    setUse24HourState(!!use24Hour); //if it's undefined, !!undefined is false
  }, [use24Hour]);
  React.useEffect(() => {
    // console.log(enableTimezone)
    if (enableTimezone === 'auto') {
      setEnableTimezoneAtom('auto');
    } else {
      setEnableTimezoneAtom(!!enableTimezone); //if it's undefined, !!undefined is false
    }
  }, [enableTimezone]);
  /**
   *  start(year,month,day,hour,minute), end(...), title, link, imgUrl, timezone
   */

  const getTimeDetails = t => {
    if (typeof t !== "string") return false;
    const day = t.split(" ")[0].split("-");
    const time = t.split(" ")[1].split(":");

    if (!(day && time)) {
      console.error("Format error: start/end should match, 2021-06-22 14:30:00");
      return false;
    }

    const [year, month, date] = day;
    const [hour, minute, second] = time;
    return {
      year: year.toString(),
      month: stringTo2Digits(month),
      date: stringTo2Digits(date),
      hour: stringTo2Digits(hour),
      minute: stringTo2Digits(minute),
      second: stringTo2Digits(second)
    };
  };

  const isMultiDay = (s, e) => {
    if (s?.year === e?.year && s?.month === e?.month && s?.date === e?.date) {
      return false;
    }

    return true;
  };

  const converTimeOnTimezone = (events, enableTimezone, targetTimezone) => {
    /**
     * events = events
     *      end: "2021-06-29 16:30:00"
     *      imgUrl: "https://source.unsplash.com/random/1200x630"
     *      start: "2021-06-29 14:30:00"
     *      timezone: "America/New_York"
     *      title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur"
     *      url: "https://www.google.com"
     * enableTimezone = enableTimezoneState
     * targetTimezone = clientTimezone e.g. America/New_York
     *
     * moment-timezone is also required here
     */
    const result = [];

    if (!enableTimezone) {
      // return original data
      return events;
    } else {
      // enableTimezone: true or auto
      if (enableTimezone === 'auto') console.log('Using default timezone setting, but not showing'); // DONE: calculate time base on timezone
      //REFERENCE: var b = moment.tz("May 12th 2014 8PM", "MMM Do YYYY hA", "America/Toronto");

      events.map(event => {
        if (event.timezone !== targetTimezone) {
          const _startMoment = moment.tz(event.start, "YYYY-MM-DD HH:mm:ss", event.timezone);

          const _endMoment = moment.tz(event.end, "YYYY-MM-DD HH:mm:ss", event.timezone);

          const _startMomentAtTargetTimezone = _startMoment.tz(targetTimezone).format("YYYY-MM-DD HH:mm:ss");

          const _endMomentAtTargetTimezone = _endMoment.tz(targetTimezone).format("YYYY-MM-DD HH:mm:ss"); // console.log("startMoment", _startMomentAtTargetTimezone)


          result.push(Object.assign({}, event, {
            end: _endMomentAtTargetTimezone,
            start: _startMomentAtTargetTimezone,
            targetTimezone: targetTimezone
          }));
        } else {
          result.push(event);
        }
      });
      return result;
    }
  };

  React.useEffect(() => {
    // DONE: convert timezone here, if necessary
    const temp = []; // console.log("Events: ", events);

    const eventsConvertedToClientTimezone = converTimeOnTimezone(events, enableTimezoneState, clientTimezone); // console.log("!!!", eventsConvertedToClientTimezone)

    eventsConvertedToClientTimezone.map(event => {
      const _startDetails = getTimeDetails(event?.start);

      const _endDetails = getTimeDetails(event?.end);

      if (isMultiDay(_startDetails, _endDetails)) {
        temp.push({
          date: `${_endDetails?.year}-${_endDetails?.month}-${_endDetails?.date}`,
          url: event?.url,
          title: event?.title,
          imgUrl: event?.imgUrl,
          start_date_details: _startDetails,
          end_date_details: _endDetails,
          timezone: event?.timezone,
          multi_day: true,
          multi_day_first: `${_startDetails?.year}-${_startDetails?.month}-${_startDetails?.date}`,
          multi_day_last: `${_endDetails?.year}-${_endDetails?.month}-${_endDetails?.date}`
        });
      } else {
        temp.push({
          date: `${_endDetails?.year}-${_endDetails?.month}-${_endDetails?.date}`,
          url: event?.url,
          title: event?.title,
          imgUrl: event?.imgUrl,
          start_date_details: _startDetails,
          end_date_details: _endDetails,
          timezone: event?.timezone,
          multi_day: false
        });
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null);
    }); // console.log('temp: ', temp)

    setFormattedEvents(temp); // console.log(clientTimezone)
  }, [events, clientTimezone, enableTimezoneState]);
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-1080 max-h-full mx-auto px-5"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Calendar, _extends({
    events: formattedEvents
  }, otherProps)));
}

export default App;
App.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    timezone: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    imgUrl: PropTypes.string
  })).isRequired
};