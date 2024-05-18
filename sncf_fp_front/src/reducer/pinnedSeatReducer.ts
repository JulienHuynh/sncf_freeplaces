import { PinnedSeatState, PinnedSeats } from "../interfaces/PinnedSeats.ts";

type Action =
    | { type: 'MAJ_FROM_LOCAL_STORAGE'; pinnedSeats: PinnedSeats[] }
    | { type: 'PIN_SEAT'; carriageNumber: number; seatNumber: number }
    | { type: 'UNPIN_SEAT'; carriageNumber: number; seatNumber: number }
    | { type: 'IS_PINNED'; carriageNumber: number; seatNumber: number; callback: (isPinned: boolean) => void };

export const pinnedSeatReducer = (state: PinnedSeatState, action: Action): PinnedSeatState => {
    switch (action.type) {
        case 'MAJ_FROM_LOCAL_STORAGE':
            return {
                ...state,
                pinnedSeats: action.pinnedSeats
            };

        case 'PIN_SEAT': {
            const carriageIndex = state.pinnedSeats.findIndex(carriage => carriage.carriageNumber === action.carriageNumber);

            if (carriageIndex === -1) {
                // Si la voiture n'existe pas dans le state, l'ajoute
                return {
                    ...state,
                    pinnedSeats: [...state.pinnedSeats, {
                        carriageNumber: action.carriageNumber,
                        seats: [action.seatNumber]
                    }]
                };
            } else 
            {
                return {
                    ...state,
                    pinnedSeats: state.pinnedSeats.map(carriage =>
                        carriage.carriageNumber === action.carriageNumber
                            ? {
                                ...carriage,
                                seats: [...carriage.seats, action.seatNumber].sort((a, b) => a - b)
                            }
                            : carriage
                    )
                };
            }
        }

        case 'UNPIN_SEAT': {
            return {
                ...state,
                pinnedSeats: state.pinnedSeats
                    .map(carriage =>
                        carriage.carriageNumber === action.carriageNumber
                            ? {
                                ...carriage,
                                seats: carriage.seats.filter(seat => seat !== action.seatNumber)
                            }
                            : carriage
                    )
                    .filter(carriage => carriage.seats.length > 0) // Retire les PinnedSeats sans sièges
            };
        }

        case 'IS_PINNED': {
            const carriage = state.pinnedSeats.find(carriage => carriage.carriageNumber === action.carriageNumber);
            const isPinned = carriage ? carriage.seats.includes(action.seatNumber) : false;
            action.callback(isPinned);
            return state;
        }

        default:
            return state;
    }
};
