import prismaDB from "@/lib/prisma";

export const getBookingById = async (hotelId: string) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const bookings = await prismaDB.booking.findMany({
      where: {
        endDate: {
          gte: yesterday,
        },
        hotelId,
      },
    });

    return bookings;
  } catch (error) {
    console.error(error);
  }
};
