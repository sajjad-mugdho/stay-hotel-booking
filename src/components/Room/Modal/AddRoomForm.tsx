"use client";

import { RoomAddSchema, RoomAddSchemaType } from "@/schema/addRoomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hotel, Room } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";

type RoomProps = {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room?: Room;
  handleDialogOpen: () => void;
};

const AddRoom = ({ hotel, room, handleDialogOpen }: RoomProps) => {
  const form = useForm<RoomAddSchemaType>({
    resolver: zodResolver(RoomAddSchema),
    defaultValues: room || {
      title: "",
      description: "",
      bedCount: 0,
      bedRoomCount: 0,
      guestCount: 0,
      kingBed: 0,
      queenBed: 0,
      image: "",
      roomPrice: 0,
      breakFastPrice: 0,
      roomService: false,
      tv: false,
      airCondition: false,
      heating: false,
      oceanView: false,
      mountainView: false,
      forestView: false,
      soundProof: false,
    },
  });
  return <div className="">ADD Rooms</div>;
};

export default AddRoom;
