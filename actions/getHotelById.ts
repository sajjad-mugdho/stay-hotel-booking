import prismaDB from "@/lib/prisma";

export const getHotelById = async (hotelId: string) => {
  try {
    const hotel = await prismaDB.hotel.findUnique({
      where: {
        id: hotelId,
      },
      include: {
        rooms: true,
      },
    });

    if (!hotel) return null;

    return hotel || null;
  } catch (error: any) {
    console.log(error);
  }
};
