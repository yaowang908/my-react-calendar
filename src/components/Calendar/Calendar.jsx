import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import { monthArray } from "@root/libs/getWeeks";
import {
    selectedDay as selectedDayState,
    eventsDataAtom,
    multiDayEventsAtom,
    normalEventsAtom,
    calendarView as calendarViewSelector,
    statusSelector,
} from "@root/Recoil/calendar.atom";
import MobileEvents from "@root/components/MobileEvents/MobileEvents";
import { getEventsForTheDate } from "@root/libs/getEventsForTheDate";
import CalendarView from "@root/components/Calendar/CalendarView";
import MultiDayEventsMobile from "@root/components/MobileEvents/MultiDayEventsMobile";
import ListView from "@root/components/ListView/ListView";
import DayNames from "@root/components/DayNames/DayNames";
import ErrorScreen from "../ErrorScreen/ErrorScreen";
import Loading from "../Loading/Loading";
// import { stringTo2Digits } from 'libs/getEventsForTheDate';

export default function Calendar({events, otherProps}) {
    const selectedDay = useRecoilValue(selectedDayState);
    const [eventsData, setEventsData] = useRecoilState(eventsDataAtom);
    const [multiDayEvents, setMultiDayEventsState] =
        useRecoilState(multiDayEventsAtom);
    const [normalEvents, setNormalEvents] = useRecoilState(normalEventsAtom);
    const calendarView = useRecoilValue(calendarViewSelector);
    const calendarStatus = useRecoilValue(statusSelector)

    const getMobileViewMonthName = (selected) => {
        // console.log('monthName', selected)
        const monthNum = selected?.month || new Date().getMonth() + 1;
        return monthArray[Number(monthNum) - 1];
    };

    //DONE: multi day events needs to cross a few blocks
    // console.log(`${year}-${month}-${date}`, events)

    React.useEffect(() => {
        // console.log(events)
        if(events) {
            setEventsData(events)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [events])

    React.useEffect(() => {
        const eventsFilter = (events) => {
            const normalEvents = [];
            const multiDayEvents = [];

            // eslint-disable-next-line array-callback-return
            events?.map((event) => {
                if (event?.multi_day) {
                    multiDayEvents.push(event);
                } else {
                    normalEvents.push(event);
                }
            });

            return [normalEvents, multiDayEvents];
        };

        const [normalEvents, multiDayEvents] = eventsFilter(eventsData);

        // console.log('normalEvents', normalEvents);
        // console.log('multiDayEvents', multiDayEvents);

        setNormalEvents(normalEvents);
        setMultiDayEventsState(multiDayEvents);
        // setMultiDayEventsState([...multiDayEvents, ...multiDayEvents]);

        // DONE: multi day events are hidden now
        //DONE: mobile events also
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventsData, setMultiDayEventsState]);

    if (calendarStatus === "ERROR") {
        return <ErrorScreen />
    }

    if (calendarStatus === "FETCHING") {
        return <Loading />
    }

    if (calendarStatus === "SUCCEED" && calendarView === "MONTH") {
        return (
            <>
                <DayNames />
                <CalendarView eventsData={normalEvents} />
                <MultiDayEventsMobile selectedDay={selectedDay} />
                <MobileEvents
                    events={getEventsForTheDate(
                        selectedDay?.month,
                        selectedDay?.date,
                        selectedDay?.year,
                        normalEvents
                    )}
                    date={selectedDay?.date}
                    monthName={getMobileViewMonthName(selectedDay)}
                />
            </>
        );
    }
    if (calendarStatus === "SUCCEED" && calendarView === "LIST") {
        return (
            <>
                <ListView
                    eventsData={normalEvents}
                    multiDayEvents={multiDayEvents}
                />
            </>
        );
    }
    return       <> </>
}
