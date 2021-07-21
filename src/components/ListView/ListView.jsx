import React from "react";
import { nanoid  } from "nanoid";
import { useRecoilValue } from "recoil";

import {
    targetYear as targetYearState,
    targetMonth as targetMonthState,
    use24HourAtom,
} from "@root/Recoil/calendar.atom";
import ListEntry from "@root/components/ListEntry/ListEntry";
import { getEventEntryTime } from "@root/libs/getEventEntryTime";

export default function ListView({ eventsData, multiDayEvents, ...otherProps}) {
    // const normalEvents = useRecoilValue(normalEventsAtom);
    // const multiDayEvents = useRecoilValue(multiDayEventsAtom);
    const targetMonth = useRecoilValue(targetMonthState);
    const targetYear = useRecoilValue(targetYearState);
    const use24HourState = useRecoilValue(use24HourAtom);

    const [normal, setNormal] = React.useState(eventsData);
    const [multi, setMulti] = React.useState(multiDayEvents);

    React.useEffect(() => {
        setNormal(eventsData);
        setMulti(multiDayEvents);
    }, [eventsData, multiDayEvents]);


    //  DONE: make it sticky after header

    //DONE: only show evens on the targeted month

    const shouldMultiDayEventShow = (
        startDateDetails,
        endDateDetails,
        targetMonth,
        targetYear
    ) => {
        if (!(startDateDetails && endDateDetails && targetMonth && targetYear))
            return false;

        const [startDateMonth, startDateYear] = [
            Number(startDateDetails?.month),
            Number(startDateDetails?.year),
        ];
        const [endDateMonth, endDateYear] = [
            Number(endDateDetails?.month),
            Number(endDateDetails?.year),
        ];

        if (endDateYear < targetYear || startDateYear > targetYear)
            return false;
        if (endDateMonth < targetMonth || startDateMonth > targetMonth)
            return false;

        return true;
    };

    return (
        <>
            <div className="relative w-full border-b border-gray-900 mb-12 z-10 bg-white sticky top-80 shadow-xl">
                {/* <h3>MultiDayEvents</h3> */}
                {multi?.map((x, index) => {
                    if (
                        shouldMultiDayEventShow(
                            x?.start_date_details,
                            x?.end_date_details,
                            targetMonth,
                            targetYear
                        )
                    ) {
                        // console.log("targetDate: ", targetMonth, targetYear);
                        // console.log("multi: ", multi)
                        // TODO: show time here
                        return (
                            <ListEntry
                                key={nanoid()}
                                date={`${x?.start_date_details?.year}-${x?.start_date_details?.month}-${x?.start_date_details?.date} - ${x?.end_date_details?.year}-${x?.end_date_details?.month}-${x?.end_date_details?.date}`}
                                time={getEventEntryTime(x, use24HourState)}
                                link={x?.url}
                                title={x?.title}
                                imgSrc={x?.imgUrl}
                            />
                        );
                    }
                    return "";
                })}
            </div>
            <div className="relative w-full">
                {normal?.map((x) => {
                    if (
                        Number(x?.end_date_details?.year) === Number(targetYear) &&
                        Number(x?.end_date_details?.month) === Number(targetMonth)
                    ) {
                        return (
                            <ListEntry
                                key={nanoid()}
                                date={`${x?.end_date_details?.year}-${x?.end_date_details?.month}-${x?.end_date_details?.date}`}
                                time={getEventEntryTime(x, use24HourState)}
                                link={x?.url}
                                title={x?.title}
                                imgSrc={x?.imgUrl}
                            />
                        );
                    }
                    return "";
                })}
            </div>
        </>
    );
}
