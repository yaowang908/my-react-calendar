import React from "react";
import App from "App";
import { RecoilRoot } from "recoil";

export default function Calendar ({events, ...otherProps}) {
    return (
        <RecoilRoot>
            <App events={events} otherProps={otherProps}/>
        </RecoilRoot>
    )
};
