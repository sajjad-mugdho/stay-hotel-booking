import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const body = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.roomId) {
      return new NextResponse("Room not found", { status: 404 });
    }
    const { id, ...updateData } = body;
    const room = await prismaDB.room.update({
      where: {
        id: params.roomId,
      },
      data: {
        ...updateData,
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    console.log("Error api/room/roomId PATCH", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.roomId) {
      return new NextResponse("room not found", { status: 404 });
    }

    const room = await prismaDB.room.delete({
      where: {
        id: params.roomId,
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    console.log("Error api/room/roomId Delete", error);
    return new NextResponse(" Internal server error", { status: 500 });
  }
}
