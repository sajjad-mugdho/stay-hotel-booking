import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    const data = {
      ...body,
      userId,
    };
    console.log("Body:::::", data);
    const hotel = await prismaDB.hotel.create({
      data: {
        ...body,
        userId,
      },
    });

    return NextResponse.json(hotel);
  } catch (error) {
    console.log("Error api/hotel POST", error);
    return new NextResponse("Itarnal server error", { status: 500 });
  }
}
