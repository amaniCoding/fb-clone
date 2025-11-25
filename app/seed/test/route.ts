import prisma from "@/app/libs/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const res = await prisma.commentReaction.findMany({
      where: {
        id: "00709d12-8bbc-4beb-a7ca-77bd71b928b6",
      },
      select: {
        id: true,
        reactionType: true,
      },
    });

    return Response.json({
      result: res,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
