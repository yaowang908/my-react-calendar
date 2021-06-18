import { act, render, screen } from "@testing-library/react";

import { snapshot_UNSTABLE } from "recoil";

import { selectedDay as selectedDayState } from "Recoil/calendar.atom";
import Day from "components/Day/Day";
import { eventsPlaceholder } from "api/placeholder";

test("normal day component should have classes", () => {
    render(
        <Day
            date="1"
            month="5"
            width="120"
            isToday={false}
            isPast={false}
            isSelected={false}
            events={eventsPlaceholder.events}
        />
    );
    const day = screen.getByTestId("calendar-day");
    expect(day).toBeInTheDocument();
    expect(day).toHaveClass(`border border-gray-300 text-gray-800`);
});

test("selected day component should have red border", () => {
    render(
        <Day
            date="1"
            month="5"
            width="120"
            isToday={false}
            isPast={false}
            isSelected={true}
            events={eventsPlaceholder.events}
        />
    );
    const day = screen.getByTestId("calendar-day");
    expect(day).toBeInTheDocument();
    expect(day).toHaveClass(`border border-blue-600 text-gray-800`);
});

test("past day component should have lighter text", () => {
    render(
        <Day
            date="1"
            month="5"
            width="120"
            isToday={false}
            isPast={true}
            isSelected={false}
            events={eventsPlaceholder.events}
        />
    );
    const day = screen.getByTestId("calendar-day");
    expect(day).toBeInTheDocument();
    expect(day).toHaveClass(`border border-gray-300 text-gray-400`);
});

test("day component for today should have blue text", () => {
    render(
        <Day
            date="1"
            month="5"
            width="120"
            isToday={true}
            isPast={false}
            isSelected={false}
            events={eventsPlaceholder.events}
        />
    );
    const day = screen.getByTestId("calendar-day");
    expect(day).toBeInTheDocument();
    expect(day).toHaveClass(`border border-gray-300 text-blue-700`);
});

test("Recoil selectedDay default to be false, and update to object it received", () => {
    const initialSnapshot = snapshot_UNSTABLE();
    const today = new Date();
    expect(
        initialSnapshot.getLoadable(selectedDayState).valueOrThrow()
    ).toMatchObject({
        month: today.getMonth() + 1,
        date: today.getDate(),
        year: today.getFullYear(),
    });
    let testSnapshot;
    act(() => {
        testSnapshot = snapshot_UNSTABLE(({ set }) =>
            set(selectedDayState, { date: "3", month: "6", year: "2021" })
        );
    });
    expect(
        testSnapshot.getLoadable(selectedDayState).valueOrThrow()
    ).toMatchObject({ date: "3", month: "6", year: "2021" });
});
