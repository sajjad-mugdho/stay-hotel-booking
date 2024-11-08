import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Payment IntendId required", { status: 404 });
    }

    const booking = await prismaDB.booking.update({
      where: {
        paymentIntentId: params.id,
      },
      data: {
        paymentStatus: true,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.log("Error api/booking/paymentIntendId PATCH", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Booking not found", { status: 404 });
    }

    const booking = await prismaDB.booking.delete({
      where: {
        paymentIntentId: params.id,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.log("Error api/booking/Id Delete", error);
    return new NextResponse(" Internal server error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Hotel Id not found", { status: 404 });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const booking = await prismaDB.booking.findMany({
      where: {
        paymentStatus: true,
        roomId: params.id,
        endDate: {
          gt: yesterday,
        },
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.log("Error api/booking/Id Gets", error);
    return new NextResponse(" Internal server error", { status: 500 });
  }
}
