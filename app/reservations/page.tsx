import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import ReservationClient from "./ReservationClient";

const ReservationPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return(
            <ClientOnly>
                <EmptyState 
                    title="Unaithorize"
                    subTitle="Please log in "
                />
            </ClientOnly>
        )
    }

    const reservation = await getReservations({
        authorId: currentUser.id,
    })

    if(reservation.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No bookings found"
                    subTitle="Ypur crib aint got no one yet"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <ReservationClient 
                reservations={reservation}
                currentUser={currentUser}
            />

        </ClientOnly>
    )

}

export default ReservationPage