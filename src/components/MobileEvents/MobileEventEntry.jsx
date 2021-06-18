import React from "react";
import renderHTML from "react-render-html";

export default function MobileEventEntry({ time, title, link, ...otherProps }) {
    // Done: need to render the title with HTML
    return (
        <div className="w-full px-2">
            <div className="text-xs text-gray-500 mt-4">
            {
                time ?
                renderHTML(time) :
                ''
            }
            </div>
            <div className="text-base font-bold">
                <a href={link}>{renderHTML(title)}</a>
            </div>
        </div>
    );
}
