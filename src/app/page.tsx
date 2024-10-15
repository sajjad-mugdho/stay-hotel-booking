import Image from "next/image";
import { getHotels } from "../../actions/getHotels";
import HotelList from "@/components/hotel/HotelList";

interface HomeProps {
  searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const hotels = await getHotels(searchParams);

  console.log("hotels", hotels);

  if (!hotels) {
    return <>No hotels found...</>;
  }
  return (
    <div className="">
      <HotelList hotels={hotels} />
    </div>
  );
}
