import { getBookingById } from "../../../../actions/getBookingById";
import { getHotelById } from "../../../../actions/getHotelById";
import HotelDetailsClient from "@/components/hotel/HotelDetailsClient";

interface HotelDetailsProps {
  params: {
    hotelId: string;
  };
}

const HotelDetails = async ({ params }: HotelDetailsProps) => {
  const hotel = await getHotelById(params.hotelId);

  if (!hotel) return <div className="">Hotel is not found...</div>;
  const bookings = await getBookingById(hotel?.id);

  return (
    <>
      <HotelDetailsClient hotel={hotel} bookings={bookings} />
    </>
  );
};

export default HotelDetails;
