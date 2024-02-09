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
  const { userId } = auth();
  if (!userId) {
    return <div>Not authorized</div>;
  }

  const hotel = await getHotelById(params.hotelId);

  if (!hotel || hotel.userId !== userId) {
    return <div>Access denied...</div>;
  }

  return (
    <div>
      <AddHotelForm hotel={hotel} />
    </div>
  );
};

export default page;
