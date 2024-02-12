import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    const body = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.hotelId) {
      return new NextResponse("Hotel not found", { status: 404 });
    }

    const hotel = await prismaDB.hotel.update({
      where: {
        id: params.hotelId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(hotel);
  } catch (error) {
    console.log("Error api/hotel/hotelId PATCH", error);
    return new NextResponse("Itarnal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.hotelId) {
      return new NextResponse("Hotel not found", { status: 404 });
    }

    const hotel = await prismaDB.hotel.delete({
      where: {
        id: params.hotelId,
      },
    });

    return NextResponse.json(hotel);
  } catch (error) {
    console.log("Error api/hotel/hotelId Delete", error);
    return new NextResponse("Itarnal server error", { status: 500 });
  }
}
