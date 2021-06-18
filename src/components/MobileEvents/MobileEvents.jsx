import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

import MobileEventEntry from "components/MobileEvents/MobileEventEntry";

export default function MobileEvents({
    events,
    monthName,
    date = 0,
    ...otherProps
}) {
    const [eventsState, setEventsState] = React.useState(events);

    React.useEffect(() => {
        setEventsState(events);
    }, [events]);

    return (
        <div className="block relative md:hidden mt-5 border-t border-b border-gray-700 py-3">
            <div className="absolute -top-3 bg-white px-5">
                {`${monthName} ${date}`}
            </div>
            <div
                className={` ${
                    eventsState.length === 0 ? "block" : "hidden"
                } md:hidden py-3 pl-5 text-gray-400`}
            >
                {eventsState.length === 0 ? "No event at the selected day" : ""}
            </div>
            {eventsState.map((x) => {
                return (
                    <MobileEventEntry
                        key={nanoid()}
                        time={x.end_date}
                        title={x.title}
                        link={x.url}
                    />
                );
            })}
        </div>
    );
}

MobileEvents.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            end_date: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    monthName: PropTypes.string.isRequired,
};
