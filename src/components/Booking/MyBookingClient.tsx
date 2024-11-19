"use client";

import AminityItem from "@/components/ui/AminityItem";
import { Button } from "@/components/ui/button";
import { Button as Button2 } from "@/components/ui/button-2";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Booking, Hotel, Room } from "@prisma/client";
import {
  AirVentIcon,
  Bed,
  BedDouble,
  Castle,
  Heater,
  Home,
  Loader2,
  MapPin,
  PencilLineIcon,
  Trash,
  Trees,
  Tv,
  Users,
  UtensilsCrossed,
  VolumeXIcon,
  Wand,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import axios from "axios";
import { toast } from "@/components/ui/use-toast";

import { addDays, differenceInCalendarDays, eachDayOfInterval } from "date-fns";

import { useAuth } from "@clerk/nextjs";
import useBookRooms from "@/hooks/useBookRooms";
import useLocation from "@/hooks/useLocation";
import moment from "moment";

interface MyBookingClientProps {
  booking: Booking & { room: Room | null } & { hotel: Hotel | null };
}

const MyBookingClient: React.FC<MyBookingClientProps> = ({ booking }) => {
  const { room, hotel } = booking;
  const {
    bookingRoomData,
    setRoomData,
    paymentIntentId,
    setPaymentIntentId,
    clientSecret,
    setClientSecret,
  } = useBookRooms();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { getCountryByCode, getStateByCode } = useLocation();
  const { userId } = useAuth();
  const router = useRouter();

  if (!room || !hotel) return <div className="">No Data Found</div>;

  const country = getCountryByCode(hotel.country!);
  const state = getStateByCode(hotel.country!, hotel.state!);

  if (!room || !hotel) return <div className="">No Data Found</div>;

  const startDate = moment(booking.startDate).format("MMM Do YY");
  const endDate = moment(booking.endDate).format("MMM Do YY");

  const dayCounts = differenceInCalendarDays(
    booking.endDate,
    booking.startDate
  );

  const handleBooking = async () => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You need to login to book a room",
      });
      return;
    }

    if (!hotel?.userId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong, please try again later",
      });
      return;
    }

    try {
      setIsLoading(true);
      const bookingRoomData = {
        room,
        totalPrice: booking.totalPrice,
        includeBreakFast: booking.breakFastIncluded,
        startDate: booking.startDate,
        endDate: booking.endDate,
      };
      setRoomData(bookingRoomData);

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: {
            hotelId: hotel?.id,
            hotelOwnerId: hotel?.userId,
            roomId: room?.id,
            totalPrice: bookingRoomData.totalPrice,
            includeBreakFast: bookingRoomData.includeBreakFast,
            startDate: bookingRoomData.startDate,
            endDate: bookingRoomData.endDate,
          },
          payment_intent_id: paymentIntentId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          variant: "success",
          title: "Success",
          description: "Room has been booked",
        });
        setPaymentIntentId(result.paymentIntent.id);
        setClientSecret(result.paymentIntent.client_secret);

        router.push("/book-room"); // Redirect to the payment page
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to book room. Please try again.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Booking error: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{hotel.title}</CardTitle>
        <CardDescription>
          {" "}
          <AminityItem>
            <MapPin className="size-4" />
            {state?.name}, {hotel.city} {country?.name}
          </AminityItem>
        </CardDescription>
        <CardTitle>{room.title}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="aspect-square overflow-hidden relative h-[250px] rounded-lg">
          <Image
            fill
            src={room.image}
            alt={room.title}
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 content-start text-sm">
          <AminityItem>
            <Bed className="w-4 h-4" />
            {room.bedCount} Bed{"(s)"}{" "}
          </AminityItem>
          <AminityItem>
            <Users className="w-4 h-4" />
            {room.guestCount} Guest{"(s)"}{" "}
          </AminityItem>
          {/* <AminityItem>
            <Bed className="w-4 h-4" />
            {room?.bathroomCount} Bed{"(s)"}{" "}
          </AminityItem> */}

          {!!room?.kingBed && (
            <AminityItem>
              <BedDouble className="w-4 h-4" />
              {room.kingBed} King Bed{"(s)"}
            </AminityItem>
          )}
          {!!room?.queenBed && (
            <AminityItem>
              <Bed className="w-4 h-4" />
              {room.queenBed} Queen Bed{"(s)"}
            </AminityItem>
          )}
          {room.roomService && (
            <AminityItem>
              <UtensilsCrossed className="w-4 h-4" />
              Room Service
            </AminityItem>
          )}
          {room.tv && (
            <AminityItem>
              <Tv className="w-4 h-4" />
              TV
            </AminityItem>
          )}
          {room.freeWifi && (
            <AminityItem>
              <Wifi className="w-4 h-4" />
              TV
            </AminityItem>
          )}
          {room.heating && (
            <AminityItem>
              <Heater className="w-4 h-4" />
              TV
            </AminityItem>
          )}
          {room.balcony && (
            <AminityItem>
              <Home className="w-4 h-4" />
              Balcony
            </AminityItem>
          )}
          {room.oceanView && (
            <AminityItem>
              <Castle className="w-4 h-4" />
              Ocean View
            </AminityItem>
          )}
          {room.forestView && (
            <AminityItem>
              <Trees className="w-4 h-4" />
              Forest View
            </AminityItem>
          )}
          {room.mountainView && (
            <AminityItem>
              <Trees className="w-4 h-4" />
              Mountain View
            </AminityItem>
          )}
          {!!room.airCondition && (
            <AminityItem>
              <AirVentIcon className="w-4 h-4" />
              Air Condition
            </AminityItem>
          )}
          {!!room.soundProof && (
            <AminityItem>
              <VolumeXIcon className="w-4 h-4" />
              Sound Proof
            </AminityItem>
          )}
        </div>
        <Separator />
        <div className="flex gap-4 justify-between">
          <div>
            Room Price: <span className="font-bold"> ${room.roomPrice}</span>
            <span className="text-sm"> /24hrs</span>
          </div>
          {!!room.breakFastPrice && (
            <div className="">
              Break Fast Price
              <span className="font-bold"> ${room.breakFastPrice}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <CardTitle>Booking Details</CardTitle>
          <div className="text-primary/90">
            <div className="">
              Room booked by {booking.username} for {dayCounts} days -{" "}
              {moment(booking.startDate).fromNow()}
            </div>
            <div className="">Check In: {startDate} at 5PM </div>
            <div className="">Check Out: {endDate} at 5PM </div>
            {booking.breakFastIncluded && (
              <div className=""> Breakfast will be served </div>
            )}
            {booking.paymentStatus ? (
              <div className="text-teal-500">
                Paid: ${booking.totalPrice} -Room Reserved
              </div>
            ) : (
              <div className="text-red-500">
                <span className="">Not Paid: ${booking.totalPrice} </span> -
                Room Not Reserved
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default MyBookingClient;
