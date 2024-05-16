export interface FreeplacesDTO {
    carriages: Carriage[];
    isFreePlacement: boolean;
    train: Train;
}

export interface Seat {
    seatNumber: string;
    inventoryClass: "SR" | "ST";
}

export interface Carriage {
    seats: Seat[];
    isFirstClass: boolean;
    nbFreeSR: number;
    nbFreeST: number;
    carriageNumber: number;
}

export interface Station {
    _name: string;
    _uicStationCode: string;
    _timestamp: string;
}

export interface Train {
    _name: string;
    _scheduleDate: string;
    departureStation: Station;
    arrivalStation: Station;
    _durationSec: number;
}

