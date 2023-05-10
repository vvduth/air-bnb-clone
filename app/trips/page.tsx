import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import TripsClient from "./TripsClient";

const TripsPage =async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="Unauthrized"
                    subTitle="System error, you aint logged in"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id, 
    });

    if( reservations.length === 0) {
        return (
            <ClientOnly >
                <EmptyState 
                    title="No booking found"
                    subTitle="Seems like you aint book nothign yet"
                /> 
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient 
                reservations= {reservations}
                currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage