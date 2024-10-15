import React from "react";
import { HotelWithRooms } from "./AddHotelForm";

const HotelCard = ({ hotel }: { hotel: HotelWithRooms }) => {
  return <div>{hotel.title}</div>;
};

export default HotelCard;
