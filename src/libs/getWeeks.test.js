const {
    daysInMonth,
    thisMonth,
    thisDate,
    thisDay,
    lastDayOfThisMonthAsNumber,
    daysNumber,
    days,
    weeksGenerator,
    weeksSun,
    weeksMon,
} = require("@root/libs/getWeeks");

test("daysInMonth should return a number", () => {
    expect(daysInMonth(5, 2021)).toBe(31);
    expect(daysInMonth(6, 2021)).toBe(30);
});

const _today = new Date();
test("should thisMonth be a number and matches this month", () => {
    expect(typeof thisMonth).toBe("number");
    expect(thisMonth).toBe(_today.getMonth() + 1);
});

test("should thisDate be a number and matches todays date", () => {
    expect(typeof thisDate).toBe("number");
    expect(thisDate).toBe(_today.getDate());
});

test("should thisDay be a string and one of the day name array", () => {
    expect(typeof thisDay).toBe("object");
    expect(typeof thisDay.fullName).toBe("string");
    expect(typeof thisDay.abbr).toBe("string");
});

test("should lastDayOfThisMonthAsNumber be a number and is correct", () => {
    expect(typeof lastDayOfThisMonthAsNumber).toBe("number");
    expect(lastDayOfThisMonthAsNumber).toBe(
        daysInMonth(_today.getMonth() + 1, _today.getFullYear())
    );
});

test("should daysNumber be an array, not empty", () => {
    expect(typeof daysNumber).toBe("object");
    expect(typeof daysNumber[0]).toBe("number");
    //any month should have more than 20 days
    expect(daysNumber.length).toBeGreaterThan(20);
});

test("should days be an object array and has correct structure", () => {
    expect(typeof days).toBe("object");
    expect(typeof days[0]).toBe("object");
    //any month should have more than 20 days
    expect(days.length).toBeGreaterThan(20);

    const _day = {
        date: expect.any(Number),
        month: _today.getMonth() + 1,
        dayNameNumber: expect.any(Number),
        dayName: {
            abbr: expect.any(String),
            fullName: expect.any(String),
        },
    };
    for (const day of days) {
        expect(day).toMatchObject(_day);
    }
});

const _day = {
    date: expect.any(Number),
    month: expect.any(Number),
    dayNameNumber: expect.any(Number),
    dayName: {
        abbr: expect.any(String),
        fullName: expect.any(String),
    },
};

test("should weeksGenerator return an array of object array", () => {
    const weeksSunTemp = weeksGenerator(0, 6, 2021);
    const weeksMonTemp = weeksGenerator(1, 6, 2021);
    // console.log('weeksSun', weeksSunTemp)
    for (const week of weeksSunTemp) {
        expect(week.length).toBe(7);
        for (const day of week) {
            expect(day).toMatchObject(_day);
        }
    }
    for (const week of weeksMonTemp) {
        expect(week.length).toBe(7);
        for (const day of week) {
            expect(day).toMatchObject(_day);
        }
    }
});

test("should each weeksSun sub array starts from Sunday, length of weeksSun subarray is 7", () => {
    expect(weeksSun[0][0].dayName.fullName).toBe("Sunday");
    expect(weeksSun[0][6].dayName.fullName).toBe("Saturday");
    for (const week of weeksSun) {
        expect(week.length).toBe(7);
        for (const day of week) {
            expect(day).toMatchObject(_day);
        }
    }
});

test("should each weeksMon sub array starts from Monday, length of weeksSun subarray is 7", () => {
    expect(weeksMon[0][0].dayName.fullName).toBe("Monday");
    expect(weeksMon[0][6].dayName.fullName).toBe("Sunday");
    for (const week of weeksMon) {
        expect(week.length).toBe(7);
        for (const day of week) {
            expect(day).toMatchObject(_day);
        }
    }
});
