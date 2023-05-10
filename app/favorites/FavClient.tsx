import React from "react";
import { SafeListing, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}
const FavClient: React.FC<FavClientProps> = ({ listings, currentUser }) => {
  return (
    <Container>
      <Heading title="Your favorites" subTitle="All the places you love" />
      <div className="mt-10 grid grid-cols-1 
      sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
            <ListingCard 
                key={listing.id}
                currentUser={currentUser}
                data={listing}
            />
        ))}
      </div>
    </Container>
  );
};

export default FavClient;
