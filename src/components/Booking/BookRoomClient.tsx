"use client";
import React, { use, useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import useBookRooms from "@/hooks/useBookRooms";
import RoomCard from "../Room/Modal/RoomCard";
import { Elements } from "@stripe/react-stripe-js";
import RoomPaymentForm from "./RoomPaymentForm";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const BookRoomClient = (props: Props) => {
  const { bookingRoomData, clientSecret } = useBookRooms();
  const { theme } = useTheme();
  const router = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret!,
    appearance: {
      theme: theme === "dark" ? "night" : "stripe",
      labels: "floating",
    },
  };

  const handlePaymentSuccess = (value: boolean) => {
    setPaymentSuccess(value);
  };

  if (!paymentSuccess && (!bookingRoomData || !clientSecret))
    return (
      <div className="flex items-center flex-col gap-4">
        <div className="text-rose-500 text-lg">
          Oops! This page could not be properly loaded...
        </div>
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            onClick={() => {
              router.push("/");
            }}
          >
            Go Home
          </Button>
          <Button
            onClick={() => {
              router.push("/my-booking");
            }}
          >
            View My Booking
          </Button>
        </div>
      </div>
    );

  if (paymentSuccess) {
    return (
      <div className="flex items-center flex-col gap-4">
        <div className="text-teal-500 text-center">Payment Success</div>
        <Button
          onClick={() => {
            router.push("/my-booking");
          }}
        >
          View Booking
        </Button>
      </div>
    );
  }
  return (
    <div className="max-w-[700px] mx-auto">
      {bookingRoomData && clientSecret && (
        <div>
          <h3 className="text-2xl font-semibold mb-6">
            {" "}
            Complete payment to reserve this room
          </h3>
          <div className="mb-6">
            <RoomCard room={bookingRoomData.room} />
          </div>
          <Elements options={options} stripe={stripePromise}>
            <RoomPaymentForm
              clientSecret={clientSecret}
              handlePaymentSuccess={handlePaymentSuccess}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default BookRoomClient;
