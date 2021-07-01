import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import App from "@root/App";
import { stringTo2Digits } from "@root/libs/getEventsForTheDate";
// import { OneDayEvent } from "@root/stories/Calendar.stories.js"

export default function Calendar ({events, ...otherProps}) {
    return (
        <RecoilRoot>
            <App events={events} {...otherProps}/>
        </RecoilRoot>
    )
};

const today = new Date();
const year = today.getFullYear().toString();
const month = stringTo2Digits(today.getMonth() + 1);
const day = stringTo2Digits(today.getDate());
const placeholder = [{
    start: `${year}-${month}-${day} 14:30:00`,
    end: `${year}-${month}-${day} 16:30:00`,
    timezone: "America/New_York",
    title:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    url: "https://www.google.com",
    imgUrl: "https://source.unsplash.com/random/1200x630",
}];

ReactDOM.render(
    <Calendar events={placeholder} use24Hour={false} enableTimezone={'auto'}/>,
    document.getElementById("root")
);
