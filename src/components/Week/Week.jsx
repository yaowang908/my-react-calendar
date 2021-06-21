import React from "react";
import { nanoid } from "nanoid";
import { useRecoilValue } from "recoil";
import renderHTML from "react-render-html";

import {
    selectedDay as selectedDayState,
    multiDayEventsAtom,
} from "Recoil/calendar.atom";
import Day from "components/Day/Day";
import { getEventsForTheDate, stringTo2Digits } from "libs/getEventsForTheDate";
import MultiDayEvent from "components/MultiDayEvents/MultiDayEvent";

export default function Week({ datesArray, cellWidth, events, ...otherProps }) {
    const selectedDay = useRecoilValue(selectedDayState);
    const multiDayEventsState = useRecoilValue(multiDayEventsAtom);

    const [localMultiDayEvents, setLocalMultiDayEvents] = React.useState([]);

    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    const todayYear = today.getFullYear();

    // console.log('Week events: ', events)

    const isDayPast = (month, date, year) => {
        if (
            month < todayMonth ||
            year < todayYear ||
            (month === todayMonth && date < todayDate)
        ) {
            return true;
        }
        return false;
    };

    const isToday = (month, date, year) => {
        if (month === todayMonth && date === todayDate && year === todayYear) {
            return true;
        }
        return false;
    };

    const isSelected = (month, date, year, selectedDay) => {
        if (!selectedDay || !selectedDay.date) return false;
        if (
            Number(selectedDay.date) === date &&
            Number(selectedDay.month) === month &&
            Number(selectedDay.year) === year
        ) {
            return true;
        }
        return false;
    };

    const shouldEventShowInThisWeek = (
        eventFirstDay,
        eventLastDay,
        weekFirstDay,
        weekLastDay
    ) => {
        // all four arguments are in this format '2021-05-01'
        const [eventFirst, eventLast, weekFirst, weekLast] = [
            new Date(eventFirstDay)?.getTime(),
            new Date(eventLastDay)?.getTime(),
            new Date(weekFirstDay)?.getTime(),
            new Date(weekLastDay)?.getTime(),
        ];
        // console.log(eventFirstDay, weekLastDay)
        // console.log(eventLast < weekFirst);
        if (eventLast < weekFirst || eventFirst > weekLast) {
            return false;
        }
        return true;
    };

    const getDateTimeStamp = (dateObj) => {
        // return a time stamp
        // make two digits, when new Date() 2021-2-1 is different than 2021-02-01
        return new Date(
            `${dateObj.year}-${stringTo2Digits(
                dateObj.month
            )}-${stringTo2Digits(dateObj.date)}`
        ).getTime();
    };

    const barPositionInThisWeek = (datesArray, eventFirstDay, eventLastDay) => {
        // full week or a part of the week, index from 0 to 6
        const eventFirst = new Date(eventFirstDay)?.getTime();
        const eventLast = new Date(eventLastDay)?.getTime();
        let beginning_index = 0,
            ending_index = 6;

        if (eventFirst > getDateTimeStamp(datesArray[0])) {
            datesArray.map((x, i) => {
                if (getDateTimeStamp(x) === eventFirst) {
                    beginning_index = i;
                }
                return <></>;
            });
        }
        if (eventLast < getDateTimeStamp(datesArray[6])) {
            datesArray.map((x, i) => {
                if (getDateTimeStamp(x) === eventLast) {
                    ending_index = i;
                }
                return <></>;
            });
        }

        // return a array [beginning_index, ending_index]
        return [beginning_index, ending_index];
    };

    const barsToShowMultiDayEvents = (
        multiDayEventsArray,
        weekFirstDay,
        weekLastDay
    ) => {
        // loop through multiDayEventsArray
        // compare each event to determine what day to show the cross bar
        const arr = [];
        multiDayEventsArray.forEach((element) => {
            if (
                shouldEventShowInThisWeek(
                    element.multi_day_first,
                    element.multi_day_last,
                    weekFirstDay,
                    weekLastDay
                )
            ) {
                const barPosition = barPositionInThisWeek(
                    datesArray,
                    element.multi_day_first,
                    element.multi_day_last
                );
                arr.push(
                    Object.assign({}, element, {
                        barPositionInThisWeek: barPosition,
                    })
                );
            }
        });
        //DONE: if two events overlap
        // the earlier the start date is the higher order it should be

        //return an array, contains information for each bar
        return arr;
    };

    React.useEffect(() => {
        // console.log('dates in week component: ', datesArray);
        const firstDay = datesArray[0];
        const lastDay = datesArray[datesArray.length - 1];
        const weekFirstDay = `${firstDay.year}-${firstDay.month}-${firstDay.date}`;
        const weekLastDay = `${lastDay.year}-${lastDay.month}-${lastDay.date}`;
        // console.log('First and Last day: ', firstDay, lastDay);
        // console.log('multidayEventsArr', multiDayEventsState)
        const arr = barsToShowMultiDayEvents(
            multiDayEventsState,
            weekFirstDay,
            weekLastDay
        );

        if (arr.length > 0) {
            // console.log('dates in week component: ', datesArray);
            // console.log(arr);
            // setLocalMultiDayEvents([...arr, ...arr]);
            setLocalMultiDayEvents(arr);
            // console.log('bar position: ', )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datesArray, multiDayEventsState]);

    return (
        <div className="relative grid grid-cols-7 w-full">
            <div
                className={`${
                    localMultiDayEvents?.length ? "block" : "hidden"
                } absolute top-9 md:top-10 w-full`}
            >
                {localMultiDayEvents.map((x, index) => {
                    return (
                        <MultiDayEvent
                            cellWidth={cellWidth}
                            startBlockIndex={x.barPositionInThisWeek[0]}
                            endBlockIndex={x.barPositionInThisWeek[1]}
                            barWidthClass={`${
                                x.barPositionInThisWeek
                                    ? "w-" + (x.barPositionInThisWeek[1] - x.barPositionInThisWeek[0] + 1) + "/7"
                                    : ""
                            }`}
                            link={x.url}
                            key={nanoid()}
                        >
                            {renderHTML(x.title)}
                        </MultiDayEvent>
                    );
                })}
            </div>
            {datesArray.map((x) => {
                return (
                    <Day
                        // date={x.date}
                        // month={x.month}
                        width={cellWidth}
                        isToday={isToday(x.month, x.date, x.year)}
                        isPast={isDayPast(x.month, x.date, x.year)}
                        isSelected={isSelected(
                            x.month,
                            x.date,
                            x.year,
                            selectedDay
                        )}
                        eventsProp={getEventsForTheDate(
                            x.month,
                            x.date,
                            x.year,
                            events
                        )}
                        eventsGroupMarginTop={`${
                            localMultiDayEvents.length
                                ? "mt-" + localMultiDayEvents.length * 6
                                : ""
                        }`}
                        // DONE: this margin top should change base on how many bars in this day block
                        {...x}
                        key={nanoid()}
                    >
                        {x.date}
                    </Day>
                );
            })}
        </div>
    );
}
