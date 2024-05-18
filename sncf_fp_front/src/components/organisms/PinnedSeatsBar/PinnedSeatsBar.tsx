
import {PinnedSeatState, PinnedSeats} from "../../../interfaces/PinnedSeats.ts";

export default function PinnedSeatsBar(pinnedSeats: PinnedSeatState) {
    return (
        pinnedSeats.pinnedSeats.length > 0 &&
        <div id="pinnedSeats">
            {
            pinnedSeats.pinnedSeats.map((carriagePinned: PinnedSeats) => (
                <div className="carriage_pinned_section" key={carriagePinned.carriageNumber}>
                    <div className="carriage_pinned_number">{carriagePinned.carriageNumber}</div>
                    {
                        carriagePinned.seats.map((seat: number) => (
                            <div className={`pinned_seat`} key={seat}>
                                <div className={`${seat < 80 ? 'ground_floor' : 'first_floor'}`}></div>
                                {seat}
                            </div>
                        ))
                    }
                </div>
            ))
            }
        </div>
    )
}
