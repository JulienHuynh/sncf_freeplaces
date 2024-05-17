import Train from "../class/train.js"

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
        const departureTimeA = new Date(a.departureStation.departureTimestamp);
        const departureTimeB = new Date(b.departureStation.departureTimestamp);
        const differenceA = Math.abs(departureTimeA - date);
        const differenceB = Math.abs(departureTimeB - date);
        return differenceA - differenceB;
    });

    return filteredTrains[0];
}
