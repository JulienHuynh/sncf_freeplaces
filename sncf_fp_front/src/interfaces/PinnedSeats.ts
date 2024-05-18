export interface PinnedSeatState {
    pinnedSeats: PinnedSeats[];
}

export interface PinnedSeats {
    carriageNumber: number,
    seats: number[],
}