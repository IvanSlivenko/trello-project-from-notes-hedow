import { updateBoardDto } from "./../dto";
import { prisma } from "@/core/prisma";
import { NextResponse } from "next/server";

interface BoardRouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, { params }: BoardRouteContext) {
  try {
    const { id } = params;
    const bodyRaw = await req.json();
    const validateBody = updateBoardDto.safeParse(bodyRaw);

    if (!validateBody.success) {
      return NextResponse.json(validateBody.error.issues, {
        status: 400,
      });
    }

    const findBoard = await prisma.board.findUnique({
      where: {
        id,
      },
    });
    if (!findBoard) {
      return NextResponse.json({
        code: "Node founde",
        message: "Board node founde",
      });
    }

    const updateBoard = await prisma.board.update({
      where: {
        id,
      },
      data: validateBody.data,
    });

    return NextResponse.json(updateBoard);
  } catch (error) {
    console.error("Error updated boards:", error);
    return NextResponse.json(
      { error: "Failed to updated boards" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: BoardRouteContext) {
  const { id } = params;

  const findBoard = await prisma.board.findUnique({
    where: {
      id,
    },
  });

  if (!findBoard) {
    return NextResponse.json([
      {
        code: "not_found",
        message: "Board not found",
      },
    ]);
  }
  await prisma.board.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(
    { message: "Board deleted successfully" },
    { status: 200 }
  );
}
