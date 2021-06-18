let local_event_endpoint = null;
try {
    // event_endpoint = require("api/ci_api_endpoint.js");
    const { event_endpoint } = require("api/ci_api_endpoint.js");
    local_event_endpoint = event_endpoint;
} catch (ex) {
    console.log("You need to know the CI_api to show real-time data");
}
const { eventsPlaceholder } = require("api/placeholder");

const isMultiDayEvent = (start, end) => {
    const start_date = `${start?.year}-${start?.month}-${start?.day}`;
    const end_date = `${end?.year}-${end?.month}-${end?.day}`;

    // if (start_date !== end_date) console.log(start_date, end_date);

    return [start_date, end_date, !(start_date === end_date)];
};

const isPocEvent = (categories) => {
    let result = false;
    categories?.map(x => {
        if (x.slug === 'poc') result = true;
        return false;
    })
    return result;
}

const getFirstImgSrcFromStr = (str) => {
    const match = str.match(/<img.+src=(?:"|')(.+?)(?:"|')(?:.+?)>/);
    // console.log(match)
    return match[1];
}

const formatEventsData = (obj) => {
    if (!obj.events || typeof obj.events !== "object") return false;
    const result = obj.events.map((event, index) => {
        const [start, end, _multiDay] = isMultiDayEvent(
            event.start_date_details,
            event.end_date_details
        );
        // if (index === 13) console.log(event);

        let _thisPocImgUrl = event?.image.url;
        if(isPocEvent(event?.categories)) {
            _thisPocImgUrl = getFirstImgSrcFromStr(event?.description);
        }

        return {
            id: event.id,
            status: event.status,
            date: event.date,
            date_utc: event.date_utc,
            url: event.url,
            title: event.title,
            image: event.image,
            imgUrl: _thisPocImgUrl,
            start_date: event.start_date,
            start_date_details: event.start_date_details,
            end_date: event.end_date,
            end_date_details: event.end_date_details,
            timezone: event.timezone,
            multi_day: _multiDay,
            multi_day_first: _multiDay ? start : false,
            multi_day_last: _multiDay ? end : false,
        };
    });

    return result;
};

const getEvents = async (startDate, endDate) => {
    if (local_event_endpoint) {
        // console.log("local_event_endpoint", local_event_endpoint);
        const response = await fetch(
            `${local_event_endpoint}?start_date=${startDate}&end_date=${endDate}&per_page=365`
        )
            .then((response) => {
                if (response.status >= 400 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                return response;
            })
            .then((returnedResponse) => {
                // console.log(returnedResponse)
                return returnedResponse;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
        // console.log('response',response);
        if (response instanceof Error) return false;
        const myJson = await response.json();
        // console.log('myJson',myJson);
        // console.log('Formatted: ', formatEventsData(myJson));
        return formatEventsData(myJson);
    } else {
        return formatEventsData(eventsPlaceholder);
    }
};

export { getEvents };
