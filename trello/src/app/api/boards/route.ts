import { NextResponse } from "next/server";
import { createBoardDto } from "./dto";
import { prisma } from "@/core/prisma";

export async function GET(req: Request) {
  try {
    const boards = await prisma.board.findMany();
    return NextResponse.json(boards);
  } catch (error) {
    console.error("Error fetching boards:", error);
    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = createBoardDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(
      {
        body: validateBody.error.issues,
      },
      {
        status: 400,
      }
    );
  }

  const { title } =  validateBody.data;

  const newBoard = await prisma.board.create ({
    data: {
        title,
    },
  })

  return NextResponse.json({newBoard});
}


