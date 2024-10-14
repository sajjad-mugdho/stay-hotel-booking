import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId } = auth();

    const { hotelId, ...roomData } = body;

    if (!userId) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    const room = await prismaDB.room.create({
      data: {
        ...roomData,
        userId,
        Hotel: {
          connect: {
            id: hotelId,
          },
        },
      },
    });

    console.log(room);

    return NextResponse.json(room);
  } catch (error) {
    console.log("Error api/Room POST", error);
    return new NextResponse("something went wrong while creation Room", {
      status: 404,
    });
  }
}
