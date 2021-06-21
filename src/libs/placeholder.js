const stringTo2Digits = (t) => {
    if (typeof t !== "string" && typeof t !== "number") return false;

    return Number(t).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
};
const today = new Date();
const hour = stringTo2Digits(today.getHours());
const year = today.getFullYear().toString();
const minutes = stringTo2Digits(today.getMinutes());
const month = stringTo2Digits(today.getMonth() + 1);
const day = stringTo2Digits(today.getDate());

const eventsPlaceholder = {
    events: [
        {
            start: "2021-06-22 14:30:00",
            end: "2021-06-22 16:30:00",
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://source.unsplash.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
        // {
        //     id: 23916,
        //     date: "date",
        //     end_date: `${year}-${month}-${day}`,
        //     end_date_details: {
        //         year: year,
        //         month: month,
        //         day: day,
        //         hour: stringTo2Digits(Number(hour) + 1),
        //         minutes: minutes,
        //     },
        //     start_date: `${year}-${month}-${day}`,
        //     start_date_details: {
        //         year: year,
        //         month: month,
        //         day: day,
        //         hour: hour,
        //         minutes: minutes,
        //     },
        //     url: "https://source.unsplash.com/",
        //     title:
        //         "Lorem Ipsum is simply dummy text of the printing and typesettin",
        //     image: {
        //         url: "https://source.unsplash.com/random/1200x630",
        //     },
        //     imgUrl: "https://source.unsplash.com/random/1200x630",
        //     status: "published",
        //     date_utc: "string",
        //     timezone: "America/New_York",
        // },
    ],
};

export { eventsPlaceholder };
