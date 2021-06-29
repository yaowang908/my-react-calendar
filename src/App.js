import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue, useRecoilState } from "recoil";

import Header from "components/Header/Header";
import Calendar from "components/Calendar/Calendar";
import "index.css";
import { stringTo2Digits } from "libs/getEventsForTheDate";
import { 
    clientTimezone as clientTimezoneState,
    use24HourAtom,
    enableTimezoneAtom,
} from "Recoil/calendar.atom";

function App({ events, ...otherProps }) {
    const [formattedEvents, setFormattedEvents] = React.useState([]);
    const clientTimezone = useRecoilValue(clientTimezoneState);
    const [use24HourState, setUse24HourState] = useRecoilState(use24HourAtom);
    const [enableTimezoneState, setEnableTimezoneAtom] = useRecoilState(enableTimezoneAtom);
    const { use24Hour, enableTimezone } = {...otherProps};

    React.useEffect(() => {
        // console.log(use24Hour)
        setUse24HourState(use24Hour);
    }, [use24Hour])

    React.useEffect(() => {
        // console.log(enableTimezone)
        setEnableTimezoneAtom(enableTimezone)
    }, [enableTimezone])

    /**
     *  start(year,month,day,hour,minute), end(...), title, link, imgUrl, timezone
     */
    const getTimeDetails = (t) => {
        if (typeof t !== "string") return false;
        const day = t.split(" ")[0].split("-");
        const time = t.split(" ")[1].split(":");
        if (!(day && time)) {
            console.error(
                "Format error: start/end should match, 2021-06-22 14:30:00"
            );
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
            second: stringTo2Digits(second),
        };
    };

    const isMultiDay = (s, e) => {
        if (
            s?.year === e?.year &&
            s?.month === e?.month &&
            s?.date === e?.date
        ) {
            return false;
        }
        return true;
    };

    React.useEffect(() => {
        // TODO: convert timezone here, if necessary
        const temp = [];
        console.log("Events: ", events)
        events.map((event) => {
            const _startDetails = getTimeDetails(event?.start);
            const _endDetails = getTimeDetails(event?.end);
            if(isMultiDay(_startDetails, _endDetails)) {
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
                    multi_day_last: `${_endDetails?.year}-${_endDetails?.month}-${_endDetails?.date}`,
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
                    multi_day: false,
                });
            }
            return <></>
        });
        console.log('temp: ', temp)
        setFormattedEvents(temp);
        console.log(clientTimezone)
    }, [events, clientTimezone]);

    return (
        <div className="max-w-1080 max-h-full mx-auto px-5">
            <Header />
            <Calendar events={formattedEvents} {...otherProps} />
        </div>
    );
}

export default App;

App.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            start: PropTypes.string.isRequired,
            end: PropTypes.string.isRequired,
            timezone: PropTypes.string,
            title: PropTypes.string.isRequired,
            url: PropTypes.string,
            imgUrl: PropTypes.string,
        })
    ).isRequired,
};
