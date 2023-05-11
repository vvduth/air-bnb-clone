"use client";
import React, { useCallback, useState } from "react";
import { SafeListing, SafeUser, safeReservations } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import { Listing } from "@prisma/client";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}
const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  listings,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeletingId(id); 
    axios.delete(`/api/listings/${id}`).then(() => {
        toast.success("Deleted the crib")
        router.refresh()
    }).catch((error) => {
        toast.error(error?.response?.data?.error)
    }).finally(() => {
        setDeletingId('')
    })
  },[
    router
  ])
  return (
    <Container>
      <Heading
        title="Properties"
        subTitle="List of your properties!"
      />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 
        md:grid-cols-3 lg:grid-cols-4 
            xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((booking) => (
            <ListingCard 
                key={booking.id}
                data={booking}
                actionId={booking.id}
                onAction={onCancel}
                disabled={deletingId === booking.id}
                actionLabel="Delete this place"
                currentUser={currentUser}
            /> 
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
