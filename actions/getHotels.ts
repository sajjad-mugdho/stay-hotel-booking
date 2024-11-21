import prismaDB from "@/lib/prisma";

interface SearchParams {
  title?: string;
  country?: string;
  state?: string;
  city?: string;
}

export const getHotels = async (searchParams: SearchParams) => {
  const { title, country, state, city } = searchParams;

  try {
    const hotels = await prismaDB.hotel.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
        country,
        state,
        city,
      },
      include: { rooms: true },
    });

    return hotels;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
