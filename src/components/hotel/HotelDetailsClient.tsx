"use client";
import { Booking } from "@prisma/client";
import { HotelWithRooms } from "./AddHotelForm";
import useLocation from "@/hooks/useLocation";
import Image from "next/image";
import AminityItem from "../ui/AminityItem";
import {
  Car,
  Clapperboard,
  Coffee,
  Dumbbell,
  MapPin,
  Utensils,
  Waves,
  Wine,
} from "lucide-react";
import { FaSpa, FaSwimmer } from "react-icons/fa";
import { MdDryCleaning } from "react-icons/md";
import RoomCard from "../Room/Modal/RoomCard";

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
              <FaSwimmer size={18} />
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
              <FaSpa className="size-4" />
              Spa
            </AminityItem>
          )}
          {hotel.bar && (
            <AminityItem>
              <Wine className="size-4" />
              Bar
            </AminityItem>
          )}
          {hotel.laundry && (
            <AminityItem>
              <MdDryCleaning className="size-4" />
              Laundry
            </AminityItem>
          )}
          {hotel.restaurant && (
            <AminityItem>
              <Utensils className="size-4" />
              Restaurant
            </AminityItem>
          )}
          {hotel.freeParking && (
            <AminityItem>
              <Car className="size-4" />
              Free Parking
            </AminityItem>
          )}
          {hotel.movieNight && (
            <AminityItem>
              <Clapperboard className="size-4" />
              Movie Night
            </AminityItem>
          )}
          {hotel.coffeeShop && (
            <AminityItem>
              <Coffee className="size-4" />
              Pool
            </AminityItem>
          )}
          {/* {hotel.swimmingPool && (
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
          )} */}
        </div>
      </div>
      <div className="">
        {!!hotel.rooms.length && (
          <>
            <h1 className="text-lg my-4">Hotel Rooms</h1>
            <div className="grid grid-cols-3 md:grid-cols-2">
              {hotel.rooms.map((room) => (
                <RoomCard key={room.id} room={room} hotel={hotel} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HotelDetailsClient;
