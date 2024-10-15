import React from "react";
import HotelCard from "./HotelCard";
import { HotelWithRooms } from "./AddHotelForm";

const HotelList = ({ hotels }: { hotels: HotelWithRooms[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-8 gap-y-12 mt-4">
      {hotels.map((hotel: HotelWithRooms) => (
        <div key={hotel.id} className="">
          <HotelCard hotel={hotel} />
        </div>
      ))}
    </div>
  );
};

export default HotelList;
