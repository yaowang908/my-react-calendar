import React from "react";
import { nanoid } from "nanoid";
import { useRecoilValue } from "recoil";

import MobileEventEntry from "components/MobileEvents/MobileEventEntry";
import { multiDayEventsAtom } from "Recoil/calendar.atom";

export default function MultiDayEventsMobile({ selectedDay, ...otherProps }) {
    const multiDayEventsState = useRecoilValue(multiDayEventsAtom);
    const [multiDayEventsForSelectedDay, setMultiDayEventsForSelectedDay] =
        React.useState([]);

    // if selectedDay in the period of the multiDayEvents
    // show the block
    React.useEffect(() => {
        // console.log("mobileView", multiDayEventsState);
        // console.log(
        //     "selectedDay",
        //     `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.date}`
        // );
        const isSelectedDayInThePeriod = (selectedDay, multiDayEvent) => {
            const targetTimeStamp = new Date(
                `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.date}`
            ).getTime();
            const startBoundary = new Date(
                `${multiDayEvent?.start_date_details?.year}-${multiDayEvent?.start_date_details?.month}-${multiDayEvent?.start_date_details?.date}`
            ).getTime();
            const endBoundary = new Date(
                `${multiDayEvent?.end_date_details?.year}-${multiDayEvent?.end_date_details?.month}-${multiDayEvent?.end_date_details?.date}`
            ).getTime();

            if (
                isNaN(targetTimeStamp) ||
                isNaN(startBoundary) ||
                isNaN(endBoundary)
            ) {
                console.error(
                    "invalid input for isSelectedDayInThePeriod",
                    targetTimeStamp, startBoundary, endBoundary);
                return false;
            }

            if (
                targetTimeStamp >= startBoundary &&
                targetTimeStamp <= endBoundary
            ) {
                // console.log("check????", targetTimeStamp, startBoundary);
                // console.log("check????", targetTimeStamp, endBoundary);
                return true;
            }
            return false;
        };
        const temp = []
        multiDayEventsState.map((x) => {
            // console.log('MultiDayEvent: ', x);
            if (isSelectedDayInThePeriod(selectedDay, x)) {
                temp.push(x);
            }
            return <></>;
        });
        setMultiDayEventsForSelectedDay(temp);
    }, [multiDayEventsState, selectedDay]);

    return (
        <div className="mb-12">
            {multiDayEventsForSelectedDay?.map((x) => {
                return (
                    <div
                        key={nanoid()}
                        className="block relative md:hidden mt-5 border-t border-b border-gray-700 py-3"
                    >
                        <div className="absolute -top-3 bg-white px-5">
                            {`${x.start_date_details.year}-${x.start_date_details.month}-${x.start_date_details.date} - ${x.end_date_details.year}-${x.end_date_details.month}-${x.end_date_details.date}`}
                        </div>
                        <MobileEventEntry title={x.title} link={x.url} />
                    </div>
                );
            })}
        </div>
    );
}
