"use client";
import React, { use, useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import useBookRooms from "@/hooks/useBookRooms";
import RoomCard from "../Room/Modal/RoomCard";
import { Elements } from "@stripe/react-stripe-js";
import RoomPaymentForm from "./RoomPaymentForm";
import { useTheme } from "next-themes";

type Props = {};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const BookRoomClient = (props: Props) => {
  const { bookingRoomData, clientSecret } = useBookRooms();
  const { theme } = useTheme();
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
