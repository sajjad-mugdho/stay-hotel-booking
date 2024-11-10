import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export const getBookingsByHotelOwnersId = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const bookings = await prismaDB.booking.findMany({
      where: {
        userId,
      },
      include: {
        room: true,
        Hotel: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!bookings) return null;

    return bookings || null;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error fetching bookings by Owner", error);
  }
};
