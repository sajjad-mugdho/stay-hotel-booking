import React from "react";
import { getHotelById } from "../../../../actions/getHotelById";
import { auth } from "@clerk/nextjs";
import AddHotelForm, { HotelWithRooms } from "@/components/hotel/AddHotelForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel Details",
  description: "View and edit hotel details",
  keywords: ["hotel", "details", "edit", "rooms"],
};

type HotelPageProps = {
  params: {
    hotelId: string;
  };
};

const page = async ({ params }: HotelPageProps) => {
  const hotel = await getHotelById(params.hotelId);
  const { userId } = auth();
  if (!userId) {
    return <div>Not authorized</div>;
  }

  if (hotel && hotel.userId !== userId) {
    return <div>Access denied...</div>;
  }

  return (
    <div>
      <AddHotelForm hotel={hotel} />
    </div>
  );
};

export default page;
