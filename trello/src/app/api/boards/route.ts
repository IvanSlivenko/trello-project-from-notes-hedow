import { NextResponse } from "next/server";
import { createBoardDto } from "./dto";
import { prisma } from "@/core/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // заміни "*" на конкретний домен у production
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(req: Request) {
  try {
    const boards = await prisma.board.findMany();

    return NextResponse.json(boards, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching boards:", error);
    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500, headers: corsHeaders  }
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
        status: 400, headers: corsHeaders 
      }
    );
  }

  const { title } =  validateBody.data;

  const newBoard = await prisma.board.create ({
    data: {
        title,
    },
  })

  return NextResponse.json(newBoard, { headers: corsHeaders });
}


