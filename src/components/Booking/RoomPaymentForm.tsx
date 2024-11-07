"use client";

import useBookRooms from "@/hooks/useBookRooms";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import moment from "moment";
import { Button } from "../ui/button-2";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type Props = {
  clientSecret: string;
  handlePaymentSuccess: (value: boolean) => void;
};

const RoomPaymentForm = ({ clientSecret, handlePaymentSuccess }: Props) => {
  const { bookingRoomData, reset: resetBookRoom } = useBookRooms();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const { startDate, endDate, BreakfastIncluded, totalPrice, room } =
    bookingRoomData || {};
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
    handlePaymentSuccess(false);
    setIsLoading(false);
  }, [stripe]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements || !bookingRoomData) return;

    // make payment
    try {
      // Date overlaps

      stripe
        .confirmPayment({
          elements,
          redirect: "if_required",
        })
        .then((result) => {
          if (!result.error) {
            axios
              .patch(`/api/booking/${result.paymentIntent.id}`)
              .then((response) => {
                toast({
                  variant: "success",
                  title: "Room Reserve Success",
                  description: "Your payment was successful",
                });
                handlePaymentSuccess(true);
                setIsLoading(false);
                resetBookRoom();
                router.refresh();
              })
              .catch((error) => {
                console.error(error);
                setIsLoading(false);
              });
          } else {
            setIsLoading(false);
          }
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="payment-form">
        <h2 className="text-lg font-semibold">Billing Address</h2>
        <AddressElement
          options={{
            mode: "billing",
            allowedCountries: ["US", "CA", "GB", "AU", "DE", "FR", "IT", "BD"],
          }}
        />

        <h2 className="text-lg mt-4 font-semibold">Payment Information</h2>
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />

        <div className="flex flex-col mb-1 gap-1">
          <Separator />
          <div className="flex flex-col my-1  gap-1">
            <h2 className="text-lg mt-1 font-semibold">Your Booking Summery</h2>
            <div className="">
              You will check-in on {moment(startDate).format("MMMM Do YYYY")} at
              5PM{" "}
            </div>
            <div className="">
              You will check-Out on {moment(endDate).format("MMMM Do YYYY")} at
              5PM{" "}
            </div>
            {BreakfastIncluded && (
              <div>You will be served breakfast at 8AM in the morning</div>
            )}
          </div>
          <Separator />
          <div className="font-bold text-lg">
            {BreakfastIncluded && (
              <>
                <div className="mb-2">${BreakfastIncluded} for breakfast</div>
              </>
            )}
            <div className="">Total Price: ${totalPrice}</div>
            {BreakfastIncluded && (
              <div className="">BreakFastPrice: ${room?.breakFastPrice}</div>
            )}
          </div>

          {isLoading && (
            <Alert>
              <AlertTitle>Processing Payment,</AlertTitle>
              <AlertDescription>please stay on this page</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="mt-4"
            disabled={!stripe || !elements}
            isLoading={isLoading}
          >
            Pay Now
          </Button>
        </div>
      </form>
    </>
  );
};

export default RoomPaymentForm;
