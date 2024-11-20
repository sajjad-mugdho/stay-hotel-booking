import React from "react";
import { getHotelById } from "../../../../actions/getHotelById";
import { auth } from "@clerk/nextjs";
import AddHotelForm, { HotelWithRooms } from "@/components/hotel/AddHotelForm";

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
