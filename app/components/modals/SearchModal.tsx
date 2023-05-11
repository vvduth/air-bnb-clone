"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../Input/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Calendar from "../Input/Calendar";
import Heading from "../Heading";
import Counter from "../Input/Counter";
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [steps, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((val) => val - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((val) => val + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (steps !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    steps,
    searchModal,
    location,
    router,
    guestCount,
    bathroomCount,
    roomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (steps === STEPS.INFO) {
      return "Search for them cribs!";
    }
    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [steps]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to visit?"
        subTitle="Find you perfect roof!"
      />
      <CountrySelect
        value={location}
        onChange={(val) => {
          setLocation(val as CountrySelectValue);
        }}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );
  if (steps === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When wil your trip start:"
          subTitle="Make sure everyone is free!"
        />

        <Calendar
          value={dateRange}
          onChange={(val) => setDateRange(val.selection)}
        />
      </div>
    );
  }

  if (steps === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More info" subTitle="Find your perfect place" />
        <Counter
          title="Guest"
          subTitle="How many guests are coming?"
          value={guestCount}
          onChange={(val) => setGuestCount(val)}
        />
        <Counter
          title="Rooms"
          subTitle="How many rooms you want?"
          value={roomCount}
          onChange={(val) => setRoomCount(val)}
        />

        <Counter
          title="Bathroom"
          subTitle="How many bathroom meet your need??"
          value={bathroomCount}
          onChange={(val) => setBathroomCount(val)}
        />
      </div>
    );
  }

  return (
    <Modal
      body={bodyContent}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Add your preferences"
      secondaryAction={steps === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      actionLabel={actionLabel}
    />
  );
};

export default SearchModal;
