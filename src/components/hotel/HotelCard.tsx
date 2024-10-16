"use client";
import React from "react";
import { HotelWithRooms } from "./AddHotelForm";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AminityItem from "../ui/AminityItem";
import { Dumbbell, MapPin, Waves } from "lucide-react";
import useLocation from "@/hooks/useLocation";
import { Button } from "../ui/button";

const HotelCard = ({ hotel }: { hotel: HotelWithRooms }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isHotelDetails = pathname.includes("hotel-details");

  const { getCountryByCode } = useLocation();
  const country = getCountryByCode(hotel.country);

  return (
    <div
      onClick={() => {
        !isHotelDetails && router.push(`/hotel-details/${hotel.id}`);
      }}
      className={cn(
        `cursor-pointer col-span-1 transition hover:scale-105 `,
        isHotelDetails && "cursor-default"
      )}
    >
      <div className="flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
        <div className="flex-1 aspect-square overflow-hidden relative h-[250px] w-full rounded-s-lg">
          <Image
            src={hotel.image}
            alt={hotel.title}
            fill
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between gap-1 h-[250px] p-1 py-2 text-sm">
          <h1 className="font-semibold text-lg">{hotel.title}</h1>
          <div className="text-primary/90">
            {hotel.description.substring(0, 45)}...
          </div>
          <div className="text-primary/90">
            <AminityItem>
              <MapPin className="size-4" />
              {hotel.city}, {country?.name}
            </AminityItem>
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
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {hotel?.rooms[0]?.roomPrice && (
                <>
                  <div className="font-semibold font-base">
                    ${hotel?.rooms[0]?.roomPrice}
                  </div>
                  <div className="font-xs"> /24h</div>
                </>
              )}
            </div>
            {isHotelDetails && (
              <Button
                variant="ghost"
                onClick={() => router.push(`/hotel/${hotel.id}`)}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
