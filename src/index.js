import React from "react";
// import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import App from "@root/App";
// import { OneDayEvent } from "stories/Calendar.stories"

export default function Calendar ({events, ...otherProps}) {
    return (
        <RecoilRoot>
            <App events={events} {...otherProps}/>
        </RecoilRoot>
    )
};

// ReactDOM.render(<Calendar events={OneDayEvent.args.events}/>, document.getElementById('calendar_root'))
