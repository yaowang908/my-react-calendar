import React from "react";

let local_default_image = null;

export default function MultiDayEvent({
    cellWidth,
    barWidthClass,
    bar_with,
    startBlockIndex,
    endBlockIndex,
    link,
    children,
    image,
    title = '',
    ...otherProps
}) {
    const borderColor = "border-white";
    const backgroundColor = "bg-blue-400";
    const textColor = "text-white";
    const eventImage = React.useRef(null);
    const [localImgSrc, setLocalImgSrc] = React.useState(image);

    React.useEffect(() => {
        if (local_default_image) {
            if (!image) {
                setLocalImgSrc(local_default_image);
            }
        } else {
            setLocalImgSrc(image);
        }

    }, [image]);

    const clickHandler = (event) => {
        // console.log('Clicked multiDayEvent -> cellWidth: ', cellWidth);
        event.preventDefault();
        if (cellWidth < 104) {
            //  disable link in mobile view
            return;
        }

        if (link) {
            window.open(link, "_self");
        } else {
            console.log("Link does not exist");
        }
    };

    const mouseEnterHandler = (event) => {
        // console.log('Enter', link, event);
        if (localImgSrc){
            const cursorX = event.clientX;
            const cursorY = event.clientY;
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            // console.log('Cursor', cursorX, cursorY);
            // console.log('Screen', screenWidth, screenHeight);
            const isRightHalf = screenWidth / 2 < cursorX ? true : false;
            const isTopHalf = screenHeight / 2 < cursorY ? false : true;

            eventImage.current.classList.remove("hidden");

            eventImage.current.style.top = '0px';
            eventImage.current.style.left = 'auto';
            eventImage.current.style.right = "auto";

            if (isRightHalf) {
                eventImage.current.classList.add("block", "mr-16");
                eventImage.current.style.right = (screenWidth - cursorX) +'px';
            } else {
                eventImage.current.classList.add("block", "ml-16");
                eventImage.current.style.left = cursorX +'px';
            }

            if (isTopHalf) {
                eventImage.current.classList.add("mt-16");
            } else {
                eventImage.current.classList.add("-mt-32");
            }
        }
    };
    const mouseLeaveHandler = () => {
        // console.log('Leave');
        eventImage.current.classList.remove(
            "block",
            "mt-16",
            "-mt-32",
            "-ml-32",
            "mr-32",
            "mr-16",
            "ml-16",
            "-ml-64",
            "ml-64"
        );
        eventImage.current.classList.add("hidden");
    };

    const getLeftMargin = () => {
        return {
            marginLeft: `${startBlockIndex * cellWidth}px`,
            width: bar_with ? `${bar_with * cellWidth}px` : "auto",
        };
    };

    return (
        <div
            className={`border ${borderColor} ${backgroundColor} ${textColor} h-1 md:h-6 top-2 px-5 truncate cursor-auto pointer-events-none md:cursor-pointer md:pointer-events-auto text-xxs md:text-sm ${
                barWidthClass ? barWidthClass : "w-full"
            }`}
            style={getLeftMargin()}
            onClick={clickHandler}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            {...otherProps}
        >
            <div className="hidden w-96 cursor-pointer h-auto absolute z-50" ref={eventImage} onClick={()=> {if(link) window.open(link);}}>
                <img className="w-full h-auto" src={localImgSrc} alt={title} />
            </div>
            <span className="hidden md:block">{children}</span>
        </div>
    );
}
