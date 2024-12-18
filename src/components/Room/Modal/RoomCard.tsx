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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import AddRoom from "./AddRoomForm";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Toast } from "@/components/ui/toast";
import { DatePickerWithRange } from "./DateRangePicker";
import { DateRange } from "react-day-picker";
import { addDays, differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@clerk/nextjs";
import useBookRooms from "@/hooks/useBookRooms";

interface RoomCardProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room: Room;
  bookings?: Booking[];
}

const RoomCard = ({ room, hotel, bookings }: RoomCardProps) => {
  const {
    bookingRoomData,
    setRoomData,
    paymentIntentId,
    setPaymentIntentId,
    clientSecret,
    setClientSecret,
  } = useBookRooms();
  const pathName = usePathname();
  const router = useRouter();
  const { userId } = useAuth();
  const isHotelDetailsPage = pathName.includes("hotel-details");
  const isBookRoomPage = pathName.includes("book-room");

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const [totalPrice, setTotalPrice] = useState(Number(room.roomPrice));
  const [includeBreakFast, setIncludeBreakFast] = useState(false);
  const [days, setDays] = useState(1);

  useEffect(() => {
    if (date && date.to && date.from) {
      const dayCounts = differenceInCalendarDays(date.to, date.from);
      setDays(dayCounts);

      if (dayCounts && room.roomPrice) {
        if (includeBreakFast && room.breakFastPrice) {
          setTotalPrice(
            (Number(room.roomPrice) + Number(room.breakFastPrice)) * dayCounts
          );
        } else {
          setTotalPrice(Number(room.roomPrice) * dayCounts);
        }
      } else {
        setTotalPrice(Number(room.roomPrice));
      }
    }
  }, [date, includeBreakFast, room.breakFastPrice, room.roomPrice]);

  const disableDates = useMemo(() => {
    let dates: Date[] = [];

    const roomBookings = bookings?.filter(
      (booking) => booking.roomId === room.id && booking.paymentStatus
    );

    roomBookings?.forEach((booking) => {
      const range = eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [bookings]);

  const handleDialogOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleDeleteRoom = async (room: Room) => {
    const imageKey = room.image.substring(room.image.lastIndexOf("/") + 1);
    try {
      setIsLoadingDelete(true);
      await axios.post("/api/uploadthing/delete", { imageKey });
      await axios.delete(`/api/room/${room.id}`);

      toast({
        variant: "success",
        title: "Success",
        description: "Room has been deleted",
      });
      setIsLoadingDelete(false);

      router.refresh();
    } catch (err) {
      console.log(err);
      setIsLoadingDelete(false);
      toast({
        variant: "destructive",
        title: "Error ",
        description: `Room has not been deleted ${err}`,
      });
    }
  };

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

    if (date?.from && date.to) {
      try {
        setIsLoading(true);
        const bookingRoomData = {
          room,
          totalPrice,
          includeBreakFast,
          startDate: date.from,
          endDate: date.to,
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
              totalPrice,
              includeBreakFast,
              startDate: date.from,
              endDate: date.to,
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
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a date range",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
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
        <div className=""></div>
      </CardContent>
      {!isBookRoomPage && (
        <CardFooter>
          {isHotelDetailsPage ? (
            <div className="flex flex-col gap-6">
              <div className="">
                <div className="mb-2">Select the date or spending days.. </div>
                <DatePickerWithRange
                  date={date}
                  setDate={setDate}
                  disabledDates={disableDates}
                />
              </div>
              {Number(room.breakFastPrice) > 0 && (
                <div className="">
                  <div className="mb-2">
                    Do you want to serve breakfast each day
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="breakfast"
                      onCheckedChange={(value) => setIncludeBreakFast(!!value)}
                    />
                    <Label htmlFor="breakfast">Include Breakfast</Label>
                  </div>
                </div>
              )}
              <div className="">
                Total Price: <span>${totalPrice}</span> for{" "}
                <span>{days} Days</span>
              </div>
              <Button2 onClick={() => handleBooking()} isLoading={isLoading}>
                <Wand className="size-4 mx-2" /> Book Now
              </Button2>
            </div>
          ) : (
            <div className="flex w-full justify-between">
              <Button
                onClick={() => handleDeleteRoom(room)}
                type="button"
                variant="ghost"
              >
                {isLoadingDelete ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4" /> deleting...
                  </>
                ) : (
                  <>
                    <Trash className="mr-2 w-4 h-4" /> Delete
                  </>
                )}
              </Button>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                  <Button
                    type="button"
                    variant="ghost"
                    className=" text-white "
                  >
                    <PencilLineIcon className="w-5 h-5 mr-3" />
                    Update Room
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[900px] w-[90%]">
                  <DialogHeader className="px-2">
                    <DialogTitle className="text-center">
                      Update your room details
                    </DialogTitle>
                    <DialogDescription>
                      <AddRoom
                        hotel={hotel}
                        room={room}
                        handleDialogOpen={handleDialogOpen}
                      />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default RoomCard;
