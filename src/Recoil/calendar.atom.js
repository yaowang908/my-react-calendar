import { eventsPlaceholder } from "@root/libs/placeholder";
import { atom, selector, DefaultValue } from "recoil";
import { stringTo2Digits } from "@root/libs/getEventsForTheDate";
import moment from "moment-timezone";

const calendarStart = atom({
    key: "calendarStart",
    default: 0,
});
// 0 => Sunday, 1 => Monday

const today = new Date();

const targetMonthAtom = atom({
    key: "targetMonthAtom",
    default: today.getMonth() + 1,
});

const targetMonth = selector({
    key: "targetMonth",
    get: ({ get }) => get(targetMonthAtom),
    set: ({ set, get }, method) => {
        const currentTargetMonth = get(targetMonthAtom);
        switch (true) {
            case method === "nextMonth":
                if (currentTargetMonth === 12) {
                    set(targetMonthAtom, 1);
                    set(targetYearAtom, get(targetYearAtom) + 1);
                } else {
                    set(targetMonthAtom, currentTargetMonth + 1);
                }
                return;
            case method === "prevMonth":
                if (currentTargetMonth === 1) {
                    set(targetMonthAtom, 12);
                    set(targetYearAtom, get(targetYearAtom) - 1);
                } else {
                    set(targetMonthAtom, currentTargetMonth - 1);
                }
                return;
            case /month:/.test(method):
                // console.log('regex working!')
                // console.log(method.split(':')[1])
                set(targetMonthAtom, method.split(":")[1]);
                break;
            default:
                if (method instanceof DefaultValue) {
                    set(targetMonthAtom, method);
                }
                // set(DefaultValue);
                return;
        }
    },
});

const targetYearAtom = atom({
    key: "targetYearAtom",
    default: today.getFullYear(),
});

const targetYear = selector({
    key: "targetYear",
    get: ({ get }) => get(targetYearAtom),
    set: ({ set, get }, method) => {
        const currentTargetYear = get(targetYearAtom);
        switch (method) {
            case "prevYear":
                set(targetYearAtom, currentTargetYear - 1);
                return;
            case "nextYear":
                set(targetYearAtom, currentTargetYear + 1);
                return;
            default:
                if (method instanceof DefaultValue) {
                    set(targetYearAtom, method);
                }
                return;
        }
    },
});

const selectedDay = atom({
    key: "selectedDay",
    default: {
        month: stringTo2Digits(today.getMonth() + 1),
        date: stringTo2Digits(today.getDate()),
        year: today.getFullYear().toString(),
    },
});

const eventsBufferAtom = atom({
    key: "eventsBufferAtom",
    default: {},
});

const eventsDataAtom = atom({
    key: "eventsDataAtom",
    default: eventsPlaceholder.events,
});

const isMonthSelectorHidden = atom({
    key: "isMonthSelectorHidden",
    default: true,
});

const multiDayEventsAtom = atom({
    key: "multiDayEventsAtom",
    default: [],
});

const normalEventsAtom = atom({
    key: "normalEventsAtom",
    default: [],
})

const isViewSelectorHidden = atom({
    key: "isViewSelectorHidden",
    default: true
});

const calendarViewAtom = atom({
    key: "calendarViewAtom",
    default: 'MONTH'
});

const calendarView = selector({
    key: "calendarView",
    get: ({ get }) => get(calendarViewAtom),
    set: ({set, get}, view) => {
        switch (view) {
            case "LIST":
                // console.log("list selected")
                set(calendarViewAtom, "LIST");
                break;
            case "MONTH":
                // console.log("month selected")
                set(calendarViewAtom, "MONTH");
                break;
            default:
                if (view instanceof DefaultValue) {
                    set(calendarViewAtom, view);
                }
                break;
        }
    }
})

const clientTimezone = atom({
    key: "clientTimezone",
    default: moment.tz.guess()
})

const clientTimezoneSelector = selector({
    key: "clientTimezoneSelector",
    get: ({get}) => get(clientTimezone),
    set: ({set, get}, timezoneObject) => {
        if (timezoneObject instanceof DefaultValue) {
            set(clientTimezone, timezoneObject);
            return;
        }
        if (timezoneObject?.value) {
            set(clientTimezone, timezoneObject?.value)
        } else {
            console.error("There is something wrong with the timezone selector");
        }
    }
})

const use24HourAtom = atom({
    key: "use24Hour",
    default: false
})

const enableTimezoneAtom = atom({
    key: "enableTimezone",
    default: true,
})

const statusAtom = atom({
    key: "statusAtom",
    default: "SUCCEED",
})

const statusSelector = selector({
    key: "statusSelector",
    get: ({get}) => get(statusAtom),
    set: ({set, get}, newStatus) => {
        if (newStatus instanceof DefaultValue) {
            set(statusAtom, "SUCCEED");
            return;
        }
        if (newStatus === "ERROR") {
            set(statusAtom, "ERROR");
            return;
        }
        if (newStatus === "FETCHING") {
            set(statusAtom, "FETCHING");
            return;
        }
        if (newStatus === "SUCCEED") {
            set(statusAtom, "SUCCEED");
            return;
        }
        console.error("Unrecognized Status code: calendar status can only be one of the following: ['SUCCEED', 'ERROR', 'FETCHING']");
    }
})

export {
    calendarStart,
    targetMonth,
    targetYear,
    selectedDay,
    eventsBufferAtom,
    eventsDataAtom,
    isMonthSelectorHidden,
    multiDayEventsAtom,
    normalEventsAtom,
    isViewSelectorHidden,
    calendarView,
    clientTimezone,
    clientTimezoneSelector,
    use24HourAtom,
    enableTimezoneAtom,
    statusSelector,
};
