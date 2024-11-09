import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export const getHotelsByUserId = async () => {
  const { userId } = auth();
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const hotel = await prismaDB.hotel.findMany({
      where: {
        userId,
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
