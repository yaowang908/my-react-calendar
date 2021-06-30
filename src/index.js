import React from "react";
import App from "@root/App";
import { RecoilRoot } from "recoil";

export default function Calendar ({events, ...otherProps}) {
    return (
        <RecoilRoot>
            <App events={events} {...otherProps}/>
        </RecoilRoot>
    )
};
