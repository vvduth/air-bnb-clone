import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFaveListings from "../actions/getFavListings";
import FavClient from "./FavClient";

const FavListingPage = async () => {
    const listings = await getFaveListings() ; 
    const currentUser = await getCurrentUser() ; 

    if (listings.length === 0 ) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No fav found"
                    subTitle="You have not liked any properties"
                />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <FavClient 
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default FavListingPage