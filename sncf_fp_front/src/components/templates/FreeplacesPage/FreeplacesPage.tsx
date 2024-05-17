import TrainInfoBar from "../../organisms/TrainInfoBar/TrainInfoBar.tsx";
import useGetFreeplaces from "../../../hooks/useGetFreeplaces.tsx";
import {useEffect, useState} from "react";
import {Carriage, FreeplacesDTO, Seat} from "../../../interfaces/FreeplacesDTO.ts";
import {convertSecondToHours, dateToFRDay, extractTimeFromISOString} from "../../../utils/DateFormatter.ts";

export default function FreeplacesPage() {
    const [freeplacesData, setFreeplacesData] = useState<FreeplacesDTO | undefined>(undefined);
    const [freeplacesNumber, setFreeplacesNumber] = useState<number>(0);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const getFreeplaces = useGetFreeplaces();

    useEffect(() => {
        getFreeplacesData().then((data: any) => {
            setFreeplacesData(sortedSeatsTrainData(data));
            setFreeplacesNumber(countFreePlaces(data));

            if (freeplacesNumber === 0)
                setStatusMessage("Plus de places disponibles ! 😢");
            if (data.isFreePlacement)
                setStatusMessage("Les places de ce train sont libres ! 🥳");
        });
    }, [statusMessage]);

    const sortedSeatsTrainData = (data: FreeplacesDTO): FreeplacesDTO => ({
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

    return (
        errorMessage !== "" ?
            <div className="message__container">
                <div className="message">{errorMessage}</div>
            </div>
            : freeplacesData &&
            <div id="freeplaces">
                { (!freeplacesData.isFreePlacement && freeplacesNumber !== 0)  &&
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
                                            <li className="freeplace_number" key={seat.seatNumber}>
                                                <div className={`place_location ${parseInt(seat.seatNumber) < 50 ? 'ground_floor' : 'first_floor'}`}></div>
                                                {seat.seatNumber}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        ))}
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
