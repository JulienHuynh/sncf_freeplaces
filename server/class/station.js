export default class Station {
    constructor(name, uicStationCode, timestamp) {
        this._name = name;
        this._uicStationCode = uicStationCode;
        this._timestamp = new Date(timestamp);
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
    }

    getUicStationCode() {
        return this._uicStationCode;
    }

    setUicStationCode(uicStationCode) {
        this._uicStationCode = uicStationCode;
    }

    getTimestamp() {
        return this._timestamp;
    }

    setTimestamp(timestamp) {
        this._timestamp = new Date(timestamp);
    }
}
