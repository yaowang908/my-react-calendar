import React from "react";
import { RecoilRoot } from "recoil";

import Header from "components/Header/Header";
import Calendar from "components/Calendar/Calendar";
import "index.css";

function App({...otherProps}) {
    return (
        <RecoilRoot>
            <div className="max-w-1080 max-h-full mx-auto px-5">
                <Header />
                <Calendar {...otherProps}/>
            </div>
        </RecoilRoot>
    );
}

export default App;
