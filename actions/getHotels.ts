import prismaDB from "@/lib/prisma";

export const getHotels = async (searchParams: {
  title: string;
  country: string;
  city: string;
  state: string;
}) => {
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
