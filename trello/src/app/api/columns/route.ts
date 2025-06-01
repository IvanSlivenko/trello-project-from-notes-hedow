import { NextResponse } from "next/server";
import { createColumnDto } from "./dto";
import { prisma } from "@/core/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const boardId = searchParams.get("boardId");

    // if (!boardId) {
    //   return NextResponse.json(
    //     [
    //       {
    //         code: "missing_query_param",
    //         field: "boardId",
    //         message: " Query param boardId is reguired",
    //       },
    //     ],
    //     { status: 500 }
    //   );
    // }

    const where = boardId ? { boardId } : {};
    const columns = await prisma.column.findMany({
      where,

      orderBy: [
        { boardId: "asc" }, // Сортування за boardId
        { order: "asc" }, // Потім за порядком
      ],
    });
    return NextResponse.json(columns);
  } catch (error) {
    console.error("Error fetching columns:", error);
    return NextResponse.json(
      { error: "Failed to fetch columns" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = createColumnDto.safeParse(bodyRaw);

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

  const { title, boardId, width } = validateBody.data;

  const lastColumn = await prisma.column.findFirst({
    where: {
      boardId,
    },
    orderBy: {
      order: "desc",
    },
  });

  const newColumn = await prisma.column.create({
    data: {
      title,
      boardId,
      width,
      order: lastColumn ? lastColumn.order + 1 : 0,
    },
  });

  return NextResponse.json({ newColumn });
}
