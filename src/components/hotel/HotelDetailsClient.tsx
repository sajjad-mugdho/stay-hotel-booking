"use client";
import { Booking } from "@prisma/client";
import { HotelWithRooms } from "./AddHotelForm";
import useLocation from "@/hooks/useLocation";
import Image from "next/image";
import AminityItem from "../ui/AminityItem";
import { Dumbbell, MapPin, Waves } from "lucide-react";

type Props = {
  hotel: HotelWithRooms;
  bookings?: Booking;
};

const HotelDetailsClient = ({ hotel }: Props) => {
  const { getCountryByCode, getStateByCode } = useLocation();
  const country = getCountryByCode(hotel.country);
  const state = getStateByCode(hotel.country, hotel.state);
  return (
    <div className="flex flex-col gap-6 pb-2">
      <div className="aspect-square relative overflow-hidden w-full h-[200px] md:h-[400px] rounded-lg">
        <Image
          src={hotel.image}
          alt={hotel.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="">
        <h3 className="font-semibold text-xl md:text-3xl">{hotel.title}</h3>
        <div className=" mt-4">
          <AminityItem>
            <MapPin className="size-4" />
            {state?.name}, {hotel.city} {country?.name}
          </AminityItem>
        </div>
        <h3 className="text-lg mt-4 mb-2">Location Details</h3>
        <p className="text-base text-primary/90 mb-2">
          {hotel?.locationDescription}
        </p>
        <h3 className="text-lg mt-4 mb-2">About Hotel</h3>
        <p className="text-base text-primary/90 mb-2">{hotel?.description}</p>
        <h3 className="text-lg mt-4 mb-2">Popular Aminity&apos;s</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start text-sm">
          {hotel.swimmingPool && (
            <AminityItem>
              <Waves className="size-4" />
              Pool
            </AminityItem>
          )}
          {hotel.gym && (
            <AminityItem>
              <Dumbbell className="size-4" />
              Gym
            </AminityItem>
          )}
          {hotel.spa && (
            <AminityItem>
              <Waves className="size-4" />
              Pool
            </AminityItem>
          )}
          {hotel.swimmingPool && (
            <AminityItem>
              <Waves className="size-4" />
              Pool
            </AminityItem>
          )}
          {hotel.swimmingPool && (
            <AminityItem>
              <Waves className="size-4" />
              Pool
            </AminityItem>
          )}
          {hotel.swimmingPool && (
            <AminityItem>
              <Waves className="size-4" />
              Pool
            </AminityItem>
          )}
          {hotel.swimmingPool && (
            <AminityItem>
              <Waves className="size-4" />
              Pool
            </AminityItem>
          )}
          {hotel.swimmingPool && (
            <AminityItem>
              <Waves className="size-4" />
              Pool
            </AminityItem>
          )}
          {hotel.swimmingPool && (
            <AminityItem>
              <Waves className="size-4" />
              Pool
            </AminityItem>
          )}
          {hotel.swimmingPool && (
            <AminityItem>
              <Waves className="size-4" />
              Pool
            </AminityItem>
          )}
          {hotel.swimmingPool && (
            <AminityItem>
              <Waves className="size-4" />
              Pool
            </AminityItem>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsClient;
