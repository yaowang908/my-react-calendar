import React from "react";

let local_default_image = null;
try {
    const { default_image } = require("api/ci_api_endpoint.js");
    local_default_image = default_image;
} catch (ex) {
    console.log("You need to know the CI_api to show real-time data");
}

export default function EventEntry({
    time,
    title,
    link,
    image = "",
    ...otherProps
}) {
    const eventImage = React.useRef(null);
    const [localImgSrc, setLocalImgSrc] = React.useState(image);

    React.useEffect(() => {
        if (local_default_image) {
            if (!image) {
                setLocalImgSrc(local_default_image);
            }
        }
    }, [image]);

    const mouseEnterHandler = (event) => {
        // console.log('Enter', link, event);
        const cursorX = event.clientX;
        const cursorY = event.clientY;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        // console.log('Cursor', cursorX, cursorY);
        // console.log('Screen', screenWidth, screenHeight);
        const isRightHalf = screenWidth / 2 < cursorX ? true : false;
        const isTopHalf = screenHeight / 2 < cursorY ? false : true;

        eventImage.current.classList.remove("hidden");
        if (isRightHalf) {
            eventImage.current.classList.add("block", "-ml-32");
        } else {
            eventImage.current.classList.add("block");
        }

        if (isTopHalf) {
            eventImage.current.classList.add("mt-16");
        } else {
            eventImage.current.classList.add("-mt-32");
        }
    };
    const mouseLeaveHandler = () => {
        // console.log('Leave');
        eventImage.current.classList.remove(
            "block",
            "mt-16",
            "-mt-32",
            "-ml-32"
        );
        eventImage.current.classList.add("hidden");
    };

    return (
        <div
            className="hidden md:block w-full text-xxs lg:text-xs mt-1 border-b border-gray-100 pb-1"
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            <div className="hidden w-72 h-auto absolute z-50" ref={eventImage}>
                <img className="w-full h-auto" src={localImgSrc} alt={title} />
            </div>
            <div className="mb-1">{time.toUpperCase()}</div>
            <div>
                <a href={link}>{title}</a>
            </div>
        </div>
    );
}
