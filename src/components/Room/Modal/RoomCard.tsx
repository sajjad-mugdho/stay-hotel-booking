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
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AddRoom from "./AddRoomForm";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Toast } from "@/components/ui/toast";

interface RoomCardProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room: Room;
  bookings?: Booking[];
}

const RoomCard = ({ room, hotel, bookings = [] }: RoomCardProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const isHotelDetailsPage = pathName.includes("hotel-details");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [open, setOpen] = useState(false);

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
      <CardFooter>
        {isHotelDetailsPage ? (
          <div className="">Hotel Details</div>
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
                <Button type="button" variant="ghost" className=" text-white ">
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
    </Card>
  );
};

export default RoomCard;
