import moment from "moment";

const getEventEntryTime = (event, use24HourState) => {
    //moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss", true);
    const momentParser = (timeString) => {
        return moment(timeString, "HH:mm", true).format("hh:mm A"); //HH stands for 24hour format
    }

    const _start = use24HourState 
                    ? `${event?.start_date_details?.hour}:${event?.start_date_details?.minute}` 
                    : momentParser(`${event?.start_date_details?.hour}:${event?.start_date_details?.minute}`);
    const _end = use24HourState 
                    ? `${event?.end_date_details?.hour}:${event?.end_date_details?.minute}`
                    : momentParser(`${event?.end_date_details?.hour}:${event?.end_date_details?.minute}`);

    // console.log(_start)

    return `${_start} - ${_end}`
};

export { getEventEntryTime };