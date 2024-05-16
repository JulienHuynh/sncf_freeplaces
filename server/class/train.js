import Station from "./station.js";

export default class Train {
    constructor(name, scheduleDate, departureStation, arrivalStation, durationSec) {
        this._name = name;
        this._scheduleDate = scheduleDate;
        this.departureStation = new Station(departureStation.name, departureStation.uicStationCode, departureStation.departureTimestamp);
        this.arrivalStation = new Station(arrivalStation.name, arrivalStation.uicStationCode, arrivalStation.arrivalTimestamp);
        this._durationSec = durationSec;
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
    }

    getScheduleDate() {
        return this._scheduleDate;
    }

    setScheduleDate(scheduleDate) {
        this._scheduleDate = scheduleDate;
    }

    getDurationSec() {
        return this._durationSec;
    }

    setDurationSec(durationSec) {
        this._durationSec = durationSec;
    }
}