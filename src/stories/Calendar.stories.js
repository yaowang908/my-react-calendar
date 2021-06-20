import React from 'react'
import { Calendar } from 'index.js'

import {eventsPlaceholder} from 'libs/placeholder'

export default {
    component: Calendar,
    title: "Calendar",
};

const Template = (args) => <Calendar {...args} />;

export const Default = Template.bind({});

Default.args = {
    events: eventsPlaceholder.events,
};

export const Primary = Template.bind({});

Primary.args = {
    events: [
        {
            id: "001",
            date: "2021-06-21",
            url: "https://source.unsplash.com",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            imgUrl: "https://source.unsplash.com/random/1200x630",
            start_date_details: {
                year: "2021",
                month: "06",
                day: "20",
                hour: "14",
                minute: "30",
            },
            end_date_details: {
                year: "2021",
                month: "06",
                day: "22",
                hour: "14",
                minute: "30",
            },
            timezone: "America/New York",
            multi_day: true,
            multi_day_first: "2021-06-20",
            multi_day_last: "2021-06-22",
        },
    ],
};

// {
//     id: event.id,
//     status: event.status,
//     date: event.date,
//     date_utc: event.date_utc,
//     url: event.url,
//     title: event.title,
//     image: {url: ''},
//     imgUrl: "https://source.unsplash.com/random/1200x630",
//     start_date: "2021-06-20",
//     start_date_details: {year, month, day, hour, minutes},
//     end_date: event.end_date,
//     end_date_details: {year, month, day, hour, minutes},
//     timezone: event.timezone,
//     multi_day: _multiDay,
// };
