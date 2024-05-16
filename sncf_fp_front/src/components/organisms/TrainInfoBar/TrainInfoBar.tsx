type TrainInfoBarProps = {
    trainNumber: string;
    departureStation: string;
    departureDate: string;
    travelTime: string;
    departureTime: string;
    arrivalStation: string;
}

export default function TrainInfoBar(trainInfoBarProps: TrainInfoBarProps) {
    return (
        <>
            <div id={"train-info-bar"}>
                <div className="train-b-1">
                    <p className="semi-b-title train-number">{trainInfoBarProps.trainNumber}</p>
                    <p className="departure-station">{trainInfoBarProps.departureStation}</p>
                </div>
                <div className="train-b-2">
                    <p className="departure-date">{trainInfoBarProps.departureDate}</p>
                    <p className="travel-time">{trainInfoBarProps.travelTime}</p>
                </div>
                <div className="train-b-3">
                    <p className="semi-b-title train-departure">{trainInfoBarProps.departureTime}</p>
                    <p className="arrival-station">{trainInfoBarProps.arrivalStation}</p>
                </div>
                <div className="bg-blur-bar"></div>
            </div>
        </>
    )
}
