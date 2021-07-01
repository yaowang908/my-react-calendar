import React from 'react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import Calendar from "@root/index.js";
import { stringTo2Digits } from "@root/libs/getEventsForTheDate";
// import { daysInMonth } from "@root/libs/getWeeks";

import "@root/index.css";

export default {
    component: Calendar,
    title: "Calendar",
};

const today = new Date();
const year = today.getFullYear().toString();
const month = stringTo2Digits(today.getMonth()+1);
const day = stringTo2Digits(today.getDate());
// const tomorrow = stringTo2Digits(today.getDate()===daysInMonth(today.getMonth()+1, today.getFullYear()) ? 1 : today.getDate()+1);

// console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

const Template = (args) => <Calendar {...args} />;

export const OneDayEvent = Template.bind({});

OneDayEvent.args = {
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
            start: "2008-11-22 14:30:00",
            end: "2008-11-22 16:30:00",
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
    ],
    use24Hour: false,
    enableTimezone: true,
};

export const MultiDayEvent = Template.bind({});

MultiDayEvent.args = {
    events: [
        {
            start: `${year}-${month}-08 14:30:00`,
            end: `${year}-${month}-10 16:30:00`,
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
    ],
    use24Hour: true,
    enableTimezone: false,
};

export const MobileView = Template.bind({});

MobileView.args = {
    // events: [...MultiDayEvent.args.events, ...eventsPlaceholder.events]
    events: [
        {
            start: `${year}-${month}-08 14:30:00`,
            end: `${year}-${month}-08 16:30:00`,
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
        {
            start: `${year}-${month}-08 14:30:00`,
            end: `${year}-${month}-09 16:30:00`,
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

export const TimezoneAuto = Template.bind({});

TimezoneAuto.args = {
    events: [
        {
            start: `${year}-${month}-08 14:30:00`,
            end: `${year}-${month}-10 16:30:00`,
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
        {
            start: `${year}-${month}-02 10:30:00`,
            end: `${year}-${month}-02 12:30:00`,
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
        {
            start: `${year}-${month}-05 12:30:00`,
            end: `${year}-${month}-05 15:30:00`,
            timezone: "America/New_York",
            title:
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
            url: "https://www.google.com",
            imgUrl: "https://source.unsplash.com/random/1200x630",
        },
    ],
    use24Hour: false,
    enableTimezone: 'auto',
};

export const Fetching = Template.bind({});

Fetching.args = {
    events: [...TimezoneAuto.args.events],
    use24Hour: false,
    enableTimezone: 'auto',
    status: 'FETCHING',
}

export const ErrorScreen = Template.bind({});

ErrorScreen.args = {
    events: [...TimezoneAuto.args.events],
    use24Hour: false,
    enableTimezone: "auto",
    status: "ERROR",
};



// TODO:
/**
 *  DONE: 1. streamline data structure for events
 *      DONE: 1. auto generate multi_day attributes
 *      DONE: 2. rename the attributes, make it short
 *  DONE: 2. timezone conversion
 *            DONE: 1. when set to auto, only show timezone, not changing it
 *  DONE: 3. handle empty input or in-valid ones
 *  DONE: 4. update README file
 *  TODO: 5. dark theme support
 *  DONE: 6. should be able to switch between military / regular time format
 *  TODO: 7. add support for fetch new data
 *      DONE: 1. accept an identifier, fetching or error or succeed
 *      2. accept an function, will call this function when target month or year changed.
 *      ~~DEPRECATED: 3. when accepting new events data, data will append to existing array, not replacing it.~~
 *  TODO: 8. combine settings into options object
 *      {
 *          use24Hour: false,
 *          enableTimezone: "auto",
 *          status: "fetching", // if undefined disable this feature
 *      }
 *      onChange: function() { targetYear, targetMonth }
 *
 * */

// Fun fact: in the multiline comments above, you can NOT add ! ahead, this will break the storybook preview build

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
