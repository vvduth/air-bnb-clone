import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";
const PropertiesPage =async () => {
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

    const listings = await getListings({
        userId: currentUser.id, 
    });

    if( listings.length === 0) {
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
            <PropertiesClient 
                listings= {listings}
                currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage