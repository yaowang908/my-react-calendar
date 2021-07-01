import React from "react";

export default function ErrorScreen() {
    return (
        <>
            <div className="mt-32 max-w-1080 w-full h-full grid place-items-center bg-white">
                <div className="">
                    <h1 className="txt-red-600">
                        There is an error when fetching the data, please refresh
                        the page to try again
                    </h1>
                </div>
            </div>
        </>
    );
}
