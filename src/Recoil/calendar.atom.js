import { eventsPlaceholder } from "api/placeholder";
import { atom, selector, DefaultValue } from "recoil";

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
        month: today.getMonth() + 1,
        date: today.getDate(),
        year: today.getFullYear(),
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

const fetchStatusAtom = atom({
    key: "fetchStatusAtom",
    default: {
        isProcessing: false,
        isFinished: true,
        succeed: true,
    },
});

const fetchStatus = selector({
    key: "fetchStatus",
    get: ({ get }) => get(fetchStatusAtom),
    set: ({ set, get }, status) => {
        console.log(status);
        switch (status) {
            case "FETCHING":
                set(fetchStatusAtom, {
                    isProcessing: true,
                    isFinished: false,
                    succeed: false,
                });
                break;
            case "ERROR":
                set(fetchStatusAtom, {
                    isProcessing: false,
                    isFinished: true,
                    succeed: false,
                });
                break;
            case "FINISHED":
                set(fetchStatusAtom, {
                    isProcessing: false,
                    isFinished: true,
                    succeed: true,
                });
                break;
            default:
                if (status instanceof DefaultValue) {
                    set(fetchStatusAtom, status);
                }
                break;
        }
    },
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

export {
    calendarStart,
    targetMonth,
    targetYear,
    selectedDay,
    eventsBufferAtom,
    eventsDataAtom,
    fetchStatus,
    isMonthSelectorHidden,
    multiDayEventsAtom,
    normalEventsAtom,
    isViewSelectorHidden,
    calendarView,
};
