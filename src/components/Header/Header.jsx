import React from "react";
import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from "recoil";

import {
    selectedDay as selectedDayState,
    targetMonth as targetMonthState,
    targetYear as targetYearState,
    eventsBufferAtom,
    eventsDataAtom,
    fetchStatus as fetchStatusState,
    isMonthSelectorHidden as isMonthSelectorHiddenState,
    isViewSelectorHidden as isViewSelectorHiddenState,
    calendarView as calendarViewSelector,
} from "Recoil/calendar.atom";
import { monthArray } from "libs/getWeeks";
import { getEvents } from "libs/getEvents";
import MonthSelector from "components/MonthSelector/MonthSelector";
import ViewSelector from "components/ViewSelector/ViewSelector";

export default function Header() {
    const [targetMonth, setTargetMonth] = useRecoilState(targetMonthState);
    const targetYear = useRecoilValue(targetYearState);
    const resetMonth = useResetRecoilState(targetMonthState);
    const resetYear = useResetRecoilState(targetYearState);
    const resetSelectedDay = useResetRecoilState(selectedDayState);
    const [eventsBuffer, setEventsBuffer] = useRecoilState(eventsBufferAtom);
    const setEventsData = useSetRecoilState(eventsDataAtom);
    const setFetchStatus = useSetRecoilState(fetchStatusState);
    const [isMonthSelectorHidden, setIsMonthSelectorHidden] = useRecoilState(
        isMonthSelectorHiddenState
    );
    const [ isViewSelectorHidden, setIsViewSelectorHidden ] = useRecoilState(isViewSelectorHiddenState);
    const calendarView = useRecoilValue(calendarViewSelector);

    const prevMonthClickHandler = (event) => {
        event.preventDefault();
        setTargetMonth("prevMonth");
    };
    const nextMonthClickHandler = (event) => {
        event.preventDefault();
        setTargetMonth("nextMonth");
    };

    const monthSelectorClickHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        // console.log('clicked', isMonthSelectorHidden);
        setIsMonthSelectorHidden(!isMonthSelectorHidden);
    };

    React.useEffect(() => {
        (async () => {
            // to save loading time, fetch data per year
            const startDate = `${targetYear}-1-1`;
            const endDate = `${targetYear}-12-31`;
            const index = `${targetYear}`;

            if (eventsBuffer && eventsBuffer[index]) {
                console.log("use buffer");
                setEventsData(eventsBuffer[index]);
            } else {
                // console.log('index',index)
                // console.log('eventsBuffer',eventsBuffer)

                // get data and store them and return
                // console.log('fetch data', new Date());
                setFetchStatus("FETCHING");
                const _events = await getEvents(startDate, endDate);
                if (!_events) {
                    setFetchStatus("ERROR");
                    console.log("There is an Error in fetching process");
                    return;
                }
                setFetchStatus("FINISHED");
                // console.log('fetch data finished', new Date(), _events);
                setEventsBuffer({ ...eventsBuffer, [index]: _events });
                // console.log('_events',_events);
                setEventsData(_events);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetYear]);

    const resetClickHandler = (event) => {
        event.preventDefault();
        // console.log('reset state')
        resetMonth();
        resetYear();
        resetSelectedDay();
        // setIsViewSelectorHidden(true);
    };

    React.useEffect(() => {
        const hideMonthSelector = (event) => {
            // event.preventDefault(); //this will conflict with other parts of the page
            event.stopPropagation();
            setIsMonthSelectorHidden(true);
        };

        document.body.addEventListener("click", hideMonthSelector);

        return () => {
            window.removeEventListener("click", hideMonthSelector);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const viewSelectorClickHandler = () => {
        // console.log('click')
        setIsViewSelectorHidden(!isViewSelectorHidden);
    }

    return (
        <div className={`flex flex-row flex-nowrap justify-between w-full bg-white z-30 ${calendarView === 'LIST' ? 'sticky top-0' : ''}`}>
            <div className="flex flex-row flex-nowrap justify-start items-center w-4/5 md:w-2/3 h-20">
                <div className="flex flex-row flex-nowrap">
                    <button
                        className="mr-3 md:mr-5 hover:bg-blue-400 hover:text-white"
                        onClick={prevMonthClickHandler}
                    >
                        <svg
                            className="w-3 h-3 md:w-5 md:h-5 fill-current text-gray-800 hover:text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 10 16"
                        >
                            <path d="M9.7 14.4l-1.5 1.5L.3 8 8.2.1l1.5 1.5L3.3 8l6.4 6.4z"></path>
                        </svg>
                    </button>
                    <button
                        className="hover:bg-blue-400 hover:text-white"
                        onClick={nextMonthClickHandler}
                    >
                        <svg
                            className="w-3 h-3 md:w-5 md:h-5 fill-current text-gray-800 hover:text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 10 16"
                        >
                            <path d="M.3 1.6L1.8.1 9.7 8l-7.9 7.9-1.5-1.5L6.7 8 .3 1.6z"></path>
                        </svg>
                    </button>
                </div>
                <button
                    className="text-gray-600 border-2 border-gray-400 rounded py-1 px-2 mx-2 text-sm md:text-base md:px-5 md:mx-5 hover:bg-blue-400 hover:text-white"
                    onClick={resetClickHandler}
                >
                    Today
                </button>
                <div
                    className="relative text-sm md:text-2xl flex flex-row items-center cursor-pointer"
                    onClick={monthSelectorClickHandler}
                >
                    <span className="">
                        {monthArray[targetMonth - 1]} {targetYear}
                    </span>
                    <div className="ml-3">
                        <svg
                            className="w-3 h-2 fill-current text-gray-800"
                            viewBox="0 0 10 7"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.008.609L5 4.6 8.992.61l.958.958L5 6.517.05 1.566l.958-.958z"
                            ></path>
                        </svg>
                    </div>
                    <MonthSelector />
                </div>
            </div>
            <div className="relative flex flex-row flex-nowrap justify-end items-center w-1/5 md:w-1/3 h-20">
                <div
                    className="w-5 cursor-pointer"
                    onClick={viewSelectorClickHandler}
                >
                    <svg
                        className="fill-current text-gray-800"
                        viewBox="0 0 18 19"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 .991v17.04c0 .236.162.428.361.428h17.175c.2 0 .361-.192.361-.429V.991c0-.237-.162-.428-.361-.428H.36C.161.563 0 .754 0 .99zm.985.803H16.89v2.301H.985v-2.3zM16.89 5.223H.985v12H16.89v-12zM6.31 7.366v.857c0 .237.192.429.429.429h.857a.429.429 0 00.428-.429v-.857a.429.429 0 00-.428-.429H6.74a.429.429 0 00-.429.429zm3.429.857v-.857c0-.237.191-.429.428-.429h.857c.237 0 .429.192.429.429v.857a.429.429 0 01-.429.429h-.857a.429.429 0 01-.428-.429zm3.428-.857v.857c0 .237.192.429.429.429h.857a.429.429 0 00.428-.429v-.857a.429.429 0 00-.428-.429h-.857a.429.429 0 00-.429.429zm-6.857 4.286v-.858c0-.236.192-.428.429-.428h.857c.236 0 .428.192.428.428v.858a.429.429 0 01-.428.428H6.74a.429.429 0 01-.429-.428zm3.429-.858v.858c0 .236.191.428.428.428h.857a.429.429 0 00.429-.428v-.858a.429.429 0 00-.429-.428h-.857a.428.428 0 00-.428.428zm3.428.858v-.858c0-.236.192-.428.429-.428h.857c.236 0 .428.192.428.428v.858a.429.429 0 01-.428.428h-.857a.429.429 0 01-.429-.428zm-10.286-.858v.858c0 .236.192.428.429.428h.857a.429.429 0 00.429-.428v-.858a.429.429 0 00-.429-.428h-.857a.429.429 0 00-.429.428zm0 4.286v-.857c0-.237.192-.429.429-.429h.857c.237 0 .429.192.429.429v.857a.429.429 0 01-.429.429h-.857a.429.429 0 01-.429-.429zm3.429-.857v.857c0 .237.192.429.429.429h.857a.429.429 0 00.428-.429v-.857a.429.429 0 00-.428-.429H6.74a.429.429 0 00-.429.429zm3.429.857v-.857c0-.237.191-.429.428-.429h.857c.237 0 .429.192.429.429v.857a.429.429 0 01-.429.429h-.857a.429.429 0 01-.428-.429z"
                        ></path>
                    </svg>
                </div>
                <ViewSelector />
            </div>
        </div>
    );
}
