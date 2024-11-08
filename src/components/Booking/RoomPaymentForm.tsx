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
import { Booking } from "@prisma/client";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { TerminalIcon } from "lucide-react";

type Props = {
  clientSecret: string;
  handlePaymentSuccess: (value: boolean) => void;
};

type DateRangeType = {
  startDate: string;
  endDate: string;
};

const hasOverlap = (
  dateRange: DateRangeType[],
  startDate: Date,
  endDate: Date
) => {
  const targetInterval = {
    start: startOfDay(new Date(startDate)),
    end: endOfDay(new Date(endDate)),
  };

  for (const range of dateRange) {
    const rangeStart = startOfDay(new Date(range.startDate));
    const rangeEnd = endOfDay(new Date(range.endDate));

    if (
      isWithinInterval(targetInterval.start, {
        start: rangeStart,
        end: rangeEnd,
      }) ||
      isWithinInterval(targetInterval.end, {
        start: rangeStart,
        end: rangeEnd,
      }) ||
      (targetInterval.start < rangeStart && targetInterval.end > rangeEnd)
    ) {
      return true;
    }
    return false;
  }
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
      const bookings = await axios.get(`/api/booking/${room?.id}`);
      const roomBookingDates = bookings.data.map((booking: Booking) => {
        return {
          startDate: booking.startDate,
          endDate: booking.endDate,
        };
      });

      if (!startDate || !endDate) {
        throw new Error("Start date and end date must be defined");
      }

      const overlapFound = hasOverlap(roomBookingDates, startDate, endDate);

      if (overlapFound) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Room Reserve Error",
          description: "Room already booked for this date range",
        });
        return;
      }

      console.log(bookings);

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
            <Alert className="bg-indigo-500  text-white ">
              <TerminalIcon className="w-4 h-4 stroke-white" />
              <AlertTitle>Payment Processing</AlertTitle>
              <AlertDescription>
                Please wait while we process your payment
                <div className="">
                  <div className="w-6 h-6 animate-spin"></div>
                </div>
              </AlertDescription>
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
