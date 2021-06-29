import React from 'react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { Calendar } from 'index.js'
import { stringTo2Digits } from 'libs/getEventsForTheDate'
import { daysInMonth } from 'libs/getWeeks'

import "index.css";

export default {
    component: Calendar,
    title: "Calendar",
};

const today = new Date();
const year = today.getFullYear().toString();
const month = stringTo2Digits(today.getMonth()+1);
const day = stringTo2Digits(today.getDate());
const tomorrow = stringTo2Digits(today.getDate()===daysInMonth(today.getMonth()+1, today.getFullYear()) ? 1 : today.getDate()+1);

console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

const Template = (args) => <Calendar {...args} />;

export const OneDayEvent = Template.bind({});

OneDayEvent.args = {
    events: [
        {
            start: `${year}-${month}-${day} 14:30:00`,
            end: `${year}-${month}-${day} 16:30:00`,
            // timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
        {
            start: "2008-11-22 14:30:00",
            end: "2008-11-22 16:30:00",
            // timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
    ],
};

export const MultiDayEvent = Template.bind({});

// TODO:
/**
 *  DONE: 1. streamline data structure for events
 *      DONE: 1. auto generate multi_day attributes
 *      DONE: 2. rename the attributes, make it short
 *  2. timezone conversion
 *  DONE: 3. handle empty input or in-valid ones
 *  4. update README file
 *  5. dark theme support
 *  6. should be able to switch between military / regular time format
 * */

MultiDayEvent.args = {
    events: [
        {
            start: `${year}-${month}-${day} 14:30:00`,
            end: `${year}-${month}-${tomorrow} 16:30:00`,
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
    ],
};

export const MobileView = Template.bind({});

MobileView.args = {
    // events: [...MultiDayEvent.args.events, ...eventsPlaceholder.events]
    events: [
        {
            start: `${year}-${month}-${day} 14:30:00`,
            end: `${year}-${month}-${day} 16:30:00`,
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
        {
            start: `${year}-${month}-${day} 14:30:00`,
            end: `${year}-${month}-${tomorrow} 16:30:00`,
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
        {
            start: "2008-11-22 14:30:00",
            end: "2008-11-23 16:30:00",
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
    ],
};

MobileView.parameters = {
    viewport: {
        viewports: INITIAL_VIEWPORTS,
        defaultViewport: 'iphonex'
    }
}

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
