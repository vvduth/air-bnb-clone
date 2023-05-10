"use client";
import { toast } from "react-hot-toast";
import React from "react";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { safeReservations, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface ReservationClientProps {
  reservations: safeReservations[];
  currentUser?: SafeUser | null;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Cancelled");
          router.refresh();
        })
        .catch((e) => {
          toast.error("Something went wrong cancelling bookings");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subTitle="Bookings on your properties" />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
      lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {reservations.map((booking) => (
          <ListingCard
            key={booking.id}
            data={booking.listing}
            reservation={booking}
            actionId={booking.id}
            onAction={onCancel}
            disabled={deletingId === booking.id}
            actionLabel="Cancel guest reservations"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
