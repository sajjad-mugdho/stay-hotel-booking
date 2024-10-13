import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId } = auth();

    console.log(body);

    if (!userId) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    const room = await prismaDB.room.create({
      data: {
        ...body,
        userId,
      },
    });

    console.log(room);

    return NextResponse.json(room);
  } catch (error) {
    console.log("Error api/Room POST", error);
    return new NextResponse("something went wrong while creation user", {
      status: 404,
    });
  }
}
