import HotelList from "@/components/hotel/HotelList";
import { getHotelsByUserId } from "../../../actions/getHotelsByUserId";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "My Hotels",
  description: "View and manage your hotel properties",
  keywords: ["hotels", "properties", "management", "user hotels"],
};

const MyHotels = async (props: Props) => {
  const hotels = await getHotelsByUserId();

  if (!hotels) return <div>No hotels found</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold">Here are your properties</h2>
      <HotelList hotels={hotels} />
    </div>
  );
};

export default MyHotels;
