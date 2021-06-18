import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

// import { daysInMonth } from 'libs/getWeeks';
import { getEvents } from "libs/getEvents";

import {
    selectedDay as selectedDayState,
    eventsBufferAtom,
    eventsDataAtom,
    fetchStatus as fetchStatusState,
} from "Recoil/calendar.atom";

function useEventsBuffer() {
    // const [size, setSize] = useState([0, 0]);
    const selectedDay = useRecoilValue(selectedDayState);
    const [eventsBuffer, setEventsBuffer] = useRecoilState(eventsBufferAtom);
    const [eventsData, setEventsData] = useRecoilState(eventsDataAtom);
    const setFetchStatus = useSetRecoilState(fetchStatusState);

    useEffect(() => {
        (async () => {
            // to save loading time, fetch data per year
            const startDate = `${selectedDay?.year}-1-1`;
            const endDate = `${selectedDay?.year}-12-31`;
            const index = `${selectedDay?.year}`;

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
    }, [selectedDay]);

    return eventsData;
}

export default useEventsBuffer;

// fetch data prevMonth, thisMonth, nextMonth
//  separate three month
