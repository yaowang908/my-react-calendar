import React from 'react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { Calendar } from 'index.js'

export default {
    component: Calendar,
    title: "Calendar",
};

const Template = (args) => <Calendar {...args} />;

export const OneDayEvent = Template.bind({});

OneDayEvent.args = {
    events: [
        {
            start: "2021-06-22 14:30:00",
            end: "2021-06-22 16:30:00",
            // timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://source.unsplash.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
        {
            start: "2008-11-22 14:30:00",
            end: "2008-11-22 16:30:00",
            // timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://source.unsplash.com",
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
 * */

MultiDayEvent.args = {
    events: [
        {
            start: "2021-06-22 14:30:00",
            end: "2021-06-24 16:30:00",
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://source.unsplash.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
    ],
};

export const MobileView = Template.bind({});

MobileView.args = {
    // events: [...MultiDayEvent.args.events, ...eventsPlaceholder.events]
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
        {
            start: "2021-06-22 14:30:00",
            end: "2021-06-23 16:30:00",
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://source.unsplash.com",
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
