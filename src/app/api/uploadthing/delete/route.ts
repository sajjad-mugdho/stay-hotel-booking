// C:\next-level\stay-hotel-app\src\app\api\uploadthing\delete\route.ts

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

// Export named function for the POST method
export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Not authorized", { status: 401 });
  }

  const { imageKey } = await req.json();
  console.log(imageKey);

  try {
    const res = await utapi.deleteFiles(imageKey);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error by deleting", error);
    return new NextResponse("Not authorized", { status: 401 });
  }
}
