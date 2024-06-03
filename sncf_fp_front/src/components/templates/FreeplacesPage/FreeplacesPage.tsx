import TrainInfoBar from "../../organisms/TrainInfoBar/TrainInfoBar.tsx";
import useGetFreeplaces from "../../../hooks/useGetFreeplaces.tsx";
import {useEffect, useReducer, useState} from "react";
import {PinnedSeatState} from "../../../interfaces/PinnedSeats.ts";
import {Carriage, FreeplacesDTO, Seat} from "../../../interfaces/FreeplacesDTO.ts";
import {convertSecondToHours, dateToFRDay, extractTimeFromISOString} from "../../../utils/DateFormatter.ts";
import {pinnedSeatReducer} from "../../../reducer/pinnedSeatReducer.ts";
import PinnedSeatsBar from "../../organisms/PinnedSeatsBar/PinnedSeatsBar.tsx";

const initPinnedSeatsState: PinnedSeatState = {
    pinnedSeats: []
};

export default function FreeplacesPage() {
    const savedPinnedSeats = localStorage.getItem('pinnedSeats');
    const trackedTrain = JSON.parse(localStorage.getItem('trainNumber')!) as number;
    const pinnedSeatsFromLocaleStorage: PinnedSeatState = savedPinnedSeats ? { pinnedSeats: JSON.parse(savedPinnedSeats) } : initPinnedSeatsState;

    const [freeplacesData, setFreeplacesData] = useState<FreeplacesDTO | undefined>(undefined);
    const [freeplacesNumber, setFreeplacesNumber] = useState<number | undefined>(undefined);
    const [pinnedSeatsState, dispatchPinnedSeats] = useReducer(pinnedSeatReducer, pinnedSeatsFromLocaleStorage);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const getFreeplaces = useGetFreeplaces();

    useEffect(() => {
        if (freeplacesData && freeplacesData.carriages) {
            const updatedPinnedSeats = pinnedSeatsState.pinnedSeats.map(pinnedSeat => {
                const foundCarriage = freeplacesData.carriages.find((carriage: Carriage) => carriage.carriageNumber === pinnedSeat.carriageNumber);
                if (foundCarriage) {
                    // Garder uniquement les sièges qui sont toujours disponibles
                    const availableSeats = pinnedSeat.seats.filter((pinnedSeatNumber: number) =>
                        foundCarriage.seats.some((seat: Seat) => seat.seatNumber === pinnedSeatNumber.toString())
                    );
                    return {
                        ...pinnedSeat,
                        seats: availableSeats
                    };
                }
                return pinnedSeat;
            }).filter(pinnedSeat => pinnedSeat.seats.length > 0); // On supprime les wagon sans sieges disponibles

            dispatchPinnedSeats({ type: 'MAJ_FROM_LOCAL_STORAGE', pinnedSeats: updatedPinnedSeats });
        }
    }, [freeplacesData, pinnedSeatsState.pinnedSeats]);

    useEffect(() => {
        getFreeplacesData().then((data: any) => {
            setFreeplacesData(sortSeats(data));
            setFreeplacesNumber(countFreePlaces(data));
            localStorage.setItem('trainNumber', JSON.stringify(data.train._name));
            
            // Vérifie si le train traqué est le même, sinon purge les sieges épinglés
            trackedTrain !== data.train._name && dispatchPinnedSeats({ type: 'MAJ_FROM_LOCAL_STORAGE', pinnedSeats: [] });

            if (freeplacesNumber === 0)
                setStatusMessage("Plus de places disponibles ! 😢");
            if (data.isFreePlacement)
                setStatusMessage("Les places de ce train sont libres ! 🥳");  
        });
    }, [statusMessage, freeplacesNumber]);

    useEffect(() => {
        localStorage.setItem('pinnedSeats', JSON.stringify(pinnedSeatsState.pinnedSeats));
    }, [pinnedSeatsState.pinnedSeats]);


    const sortSeats = (data: FreeplacesDTO): FreeplacesDTO => ({
        ...data,
        carriages: data.carriages.map(carriage => ({
            ...carriage,
            seats: [...carriage.seats].sort((a, b) => parseInt(a.seatNumber) - parseInt(b.seatNumber))
        }))
    });

    const countFreePlaces = (data: FreeplacesDTO): number => {
        return data.carriages.reduce((acc, carriage) => {
            return acc + carriage.nbFreeST;
        }, 0);
    }

    const getFreeplacesData = async () => {
        try {
            return await getFreeplaces();
        } catch (error) {
            console.error(error);
            setErrorMessage("Plus aucun train aujourd'hui ! 😴");
        }
    };

    const pinSeat = (carriage: Carriage, seat: Seat) => {
        dispatchPinnedSeats({ type: 'PIN_SEAT', carriageNumber: carriage.carriageNumber, seatNumber: parseInt(seat.seatNumber) });
    };

    const unpinSeat = (carriage: Carriage, seat: Seat) => {
        dispatchPinnedSeats({ type: 'UNPIN_SEAT', carriageNumber: carriage.carriageNumber, seatNumber: parseInt(seat.seatNumber) });
    };

    const handlePinnedSeat = (carriage: Carriage, seat: Seat) => {
        dispatchPinnedSeats({
            type: 'IS_PINNED',
            carriageNumber: carriage.carriageNumber,
            seatNumber: parseInt(seat.seatNumber),
            callback: (isPinned: boolean) => {
                isPinned ? unpinSeat(carriage, seat) : pinSeat(carriage, seat);
            }
        });

    }

    return (
        errorMessage !== "" ?
            <div className="message__container">
                <div className="message">{errorMessage}</div>
            </div>
            : freeplacesData &&
            <div id="freeplaces">
                { (!freeplacesData.isFreePlacement && freeplacesNumber !== 0)  &&
                    <div>
                        <PinnedSeatsBar pinnedSeats={pinnedSeatsState.pinnedSeats}/>
                        <div className="freeplaces__content">
                            { freeplacesData?.carriages.map((carriage: Carriage) => (
                                carriage.nbFreeST > 0 &&
                                <div className="car__content" key={carriage.carriageNumber}>
                                    <div className="car-number">
                                        {carriage.carriageNumber}
                                    </div>
                                    <ul className={`freeplaces__list ${carriage.isFirstClass ? 'first_class' : 'second_class'}`}>
                                        { carriage.seats.map((seat: Seat) => (
                                            seat.inventoryClass === 'ST' &&
                                                <li className={`freeplace_number ${pinnedSeatsState.pinnedSeats.some((pinnedCarriage) =>
                                                    pinnedCarriage.carriageNumber === carriage.carriageNumber &&
                                                    pinnedCarriage.seats.includes(parseInt(seat.seatNumber))) ? 'pinned' : ''}`} key={seat.seatNumber} onClick={() => handlePinnedSeat(carriage, seat)}>
                                                    <div className={`place_location ${parseInt(seat.seatNumber) < 101 ? 'ground_floor' : 'first_floor'}`}></div>
                                                    {seat.seatNumber}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                {statusMessage !== "" &&
                    <div className="message__container">
                        <div className="message">{statusMessage}</div>
                    </div>
                }
                <TrainInfoBar trainNumber={freeplacesData.train._name}
                              departureStation={freeplacesData.train.departureStation._name}
                              departureDate={dateToFRDay(freeplacesData.train._scheduleDate)}
                              travelTime={convertSecondToHours(freeplacesData.train._durationSec)}
                              departureTime={extractTimeFromISOString(freeplacesData.train.departureStation._timestamp)}
                              arrivalStation={freeplacesData.train.arrivalStation._name}
                />
            </div>
    )
}
