import React from "react";
import { RecoilRoot } from "recoil";

import Header from "components/Header/Header";
import Calendar from "components/Calendar/Calendar";
import "./App.css";

function App() {
    return (
        <RecoilRoot>
            <div className="max-w-1080 mx-auto px-5 my-10">
                <Header />
                <Calendar />
            </div>
        </RecoilRoot>
    );
}

export default App;
