import React from 'react'
import { Calendar } from 'index.js'

import {eventsPlaceholder} from 'libs/placeholder'

export default {
    component: Calendar,
    title: "Calendar",
};

const Template = (args) => <Calendar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    events: eventsPlaceholder.events,
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
