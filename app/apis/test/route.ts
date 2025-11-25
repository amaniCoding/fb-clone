import prisma from "@/app/libs/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const res = await prisma.oUserPost.findUnique({
      where: {
        id: "273b32df-7241-47eb-ba98-af8912d1b373",
      },
      select: {
        id: true,
        comments: {
          where: {
            id: "00709d12-8bbc-4beb-a7ca-77bd71b928b6",
          },
          select: {
            // counts
            _count: {
              select: {
                replies: true,
                reactions: true,
              },
            },
          },
        },
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
