"use client";
import React, { useCallback, useState } from "react";
import { SafeUser, safeReservations } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  reservations: safeReservations[];
  currentUser?: SafeUser | null;
}
const TripsClient: React.FC<TripsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeletingId(id); 
    axios.delete(`/api/reservations/${id}`).then(() => {
        toast.success("Cancelled, no refund dumbass")
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
        title="Trips"
        subTitle="Where you have been and where you about to go!"
      />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 
        md:grid-cols-3 lg:grid-cols-4 
            xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {reservations.map((booking) => (
            <ListingCard 
                key={booking.id}
                data={booking.listing}
                reservation={booking}
                actionId={booking.id}
                onAction={onCancel}
                disabled={deletingId === booking.id}
                actionLabel="Cancel booking"
                currentUser={currentUser}
            /> 
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
