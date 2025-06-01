import { updateColumnDto } from "./../dto";
import { prisma } from "@/core/prisma";
import { NextResponse } from "next/server";

interface ColumnRouteContext {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, { params }: ColumnRouteContext) {
  try {
    const { id } = params;
    const bodyRaw = await req.json();
    const validateBody = updateColumnDto.safeParse(bodyRaw);

    if (!validateBody.success) {
      return NextResponse.json(validateBody.error.issues, {
        status: 400,
      });
    }

    
    const findColumn = await prisma.column.update({
      where: {
        id,
      },
      data: validateBody.data,
    });

    if (!findColumn) {
      return NextResponse.json([
        {
          code: "not_found",
          message: "Column not found",
        },
      ]);
    }

    return NextResponse.json(findColumn);
  } catch (error) {
    console.error("Error updated columns:", error);
    return NextResponse.json(
      { error: "Failed to updated columns" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: ColumnRouteContext) {
  const { id } = params;

  const findColumn = await prisma.column.findUnique({
    where: {
      id,
    },
  });

  if (!findColumn) {
    return NextResponse.json([
      {
        code: "not_found",
        message: "Column not found",
      },
    ]);
  }
  await prisma.column.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(
    { message: "column deleted successfully" },
    { status: 200 }
  );
}
