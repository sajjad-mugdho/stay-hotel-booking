// "use client";
import { HotelAddSchema, HotelAddSchemaType } from "@/schema/addHotelSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hotel, Room } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";

export type HotelWithRooms = Hotel & {
  rooms: Room[];
};

interface AddHotelFromProps {
  hotel: HotelWithRooms | null;
}

const AddHotelForm = ({ hotel }: AddHotelFromProps) => {
  const form = useForm<HotelAddSchemaType>({
    resolver: zodResolver(HotelAddSchema),
    defaultValues: {},
  });
  return <div>Hotel add </div>;
};

export default AddHotelForm;
