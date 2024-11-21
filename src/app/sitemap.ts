import { Hotel } from "@prisma/client";
import { getHotels } from "../../actions/getHotels";

export default async function sitemap() {
  const hotels = await getHotels({});
  const hotelPage = hotels?.map((hotel: Hotel) => {
    return {
      url: `https://stay-hotel.vercel.app/hotel-details/${hotel.id}`,
      lastModified: hotel.updatedAt,
    };
  });
  return [
    {
      url: "https://stay-hotel.vercel.app/",
      lastModified: new Date().toISOString(),
    },
    ...hotelPage,
  ];
}
