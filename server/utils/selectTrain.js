import Train from "../class/train.js"
import {getFullFormattedDateFr} from "./getFormattedDate.js";

export default function selectTrain(date, trains, stationCode1, stationCode2) {
    let train = null;
    if (date.getUTCHours() < 12) {
        train = selectNextTrain(date, trains, stationCode1, stationCode2);
    } else {
        train = selectNextTrain(date, trains, stationCode2, stationCode1)
    }

    return new Train(
        train.name,
        train.scheduleDate,
        train.departureStation,
        train.arrivalStation,
        train.durationSec
    );
}

function selectNextTrain(date, trains, departureCode, arrivalCode) {
    const filteredTrains = trains.filter(train => {
        return train.departureStation.uicStationCode === departureCode &&
               train.arrivalStation.uicStationCode === arrivalCode;
    });

    filteredTrains.sort((a, b) => {
        return new Date(a.departureStation.departureTimestamp) - new Date(b.departureStation.departureTimestamp);
    });

    return filteredTrains.find(train => {
        const departureTime = getFullFormattedDateFr(new Date(train.departureStation.departureTimestamp));
        return new Date(departureTime + "Z") >= date;
    });
}
