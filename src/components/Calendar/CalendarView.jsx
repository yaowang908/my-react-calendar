import React from "react";
import { nanoid } from "nanoid";
import { useRecoilValue } from "recoil";

import Week from "@root/components/Week/Week";
import weeksGenerator from "@root/libs/getWeeks";
import {
    calendarStart as calendarStartState,
    targetMonth as targetMonthState,
    targetYear as targetYearState,
} from "@root/Recoil/calendar.atom";
import useWindowSize from "@root/hooks/useWindowSize";
import { eventsPlaceholder as eventsPlaceHolder } from "@root/libs/placeholder";

export default function CalendarView({ eventsData = null, otherProps }) {
    const [cellWidth, setCellWidth] = React.useState(20);
    const calendarStart = useRecoilValue(calendarStartState);
    const targetMonth = useRecoilValue(targetMonthState);
    const targetYear = useRecoilValue(targetYearState);
    const [windowWidth, windowHeight] = useWindowSize();
    const weeks = weeksGenerator(calendarStart, targetMonth, targetYear);

    const [weeksState, setWeeksState] = React.useState(weeks);

    React.useEffect(() => {
        setWeeksState(weeksGenerator(calendarStart, targetMonth, targetYear));
        // console.log('Array', targetMonth, targetYear)
    }, [calendarStart, targetMonth, targetYear]);

    const calendarRef = React.useCallback(
        (node) => {
            if (!node) return;
            const { width } = node.getBoundingClientRect();
            setCellWidth(width / 7);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [windowWidth, windowHeight]
    );

    return (
        <div
            className="relative w-full border border-gray-300"
            data-testid="calendar-app"
            ref={calendarRef}
        >
            {weeksState.map((x) => {
                return (
                    <Week
                        datesArray={x}
                        cellWidth={cellWidth}
                        events={eventsData ? eventsData : eventsPlaceHolder}
                        key={nanoid()}
                    />
                );
            })}
        </div>
    );
}
