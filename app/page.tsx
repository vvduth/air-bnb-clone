import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
export const dynamic = 'force-dynamic'
const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  searchParams: IListingsParams
}

const Home =async  ({searchParams}: HomeProps) => {
  const listings = await getListings(searchParams); 
  const currentUser = await getCurrentUser();
  const isEmpty = (listings.length === 0);

  if (isEmpty) {
    return (
      <ClientOnly >
        <EmptyState showReset />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div
          className="pt-24 grid grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 lg:grid-cols-4 
        xl:grid-cols-5 2xl:grid-cols-6 gap-8"
        >
          {listings.map((listing) => (
            <ListingCard 
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}


export default Home