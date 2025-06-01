import { NextResponse } from "next/server";
import { createCardDto } from "./dto";
import { prisma } from "@/core/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const columnId = searchParams.get("columnId");

    // if (!columnId) {
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

    const where = columnId ? { columnId } : {};
    const cards = await prisma.card.findMany({
      where,

      orderBy: [
        { columnId: "asc" }, // Сортування за boardId
        { order: "asc" }, // Потім за порядком
      ],
    });
    return NextResponse.json(cards);
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
  const validateBody = createCardDto.safeParse(bodyRaw);

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

  const { title, columnId } = validateBody.data;

  const lastCard = await prisma.card.findFirst({
    where: {
      columnId,
    },
    orderBy: {
      order: "desc",
    },
  });

  const newCard = await prisma.card.create({
    data: {
      title,
      columnId,
      order: lastCard ? lastCard.order + 1 : 0,
    },
  });

  return NextResponse.json({ newCard });
}
