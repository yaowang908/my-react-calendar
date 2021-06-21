import React from 'react';
import renderHTML from 'react-render-html';

let local_default_image = null;

export default function ListEntry({date, title, link, imgSrc, ...otherProps}) {
    const [localImgSrc, setLocalImgSrc] = React.useState(imgSrc);

    React.useEffect(() => {
        if(local_default_image) {
            if(!imgSrc) {
                setLocalImgSrc(local_default_image);
            }
        }
    }, [imgSrc])

    return (
        <div className="py-4 px-4 md:px-12 border-b border-gray-300 w-10/12 mx-auto grid grid-cols-12 gap-4">
            <div className="col-span-8 flex flex-col flex-wrap justify-between">
                <div className="text-sm">{date}</div>
                <div className="font-bold text-base md:text-xl max-w-lg">
                    <a className="" href={link} alt="event title">
                        {renderHTML(title)}
                    </a>
                </div>
            </div>
            <div className="col-span-4 w-auto md:w-48">
                <a className="w-full" href={link} alt="event title">
                    <img className="w-full" src={localImgSrc} alt={title} />
                </a>
            </div>
        </div>
    );
}
