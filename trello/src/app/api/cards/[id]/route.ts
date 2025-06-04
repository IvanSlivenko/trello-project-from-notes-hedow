import { updateCardDto } from "./../dto";
import { prisma } from "@/core/prisma";
import { NextResponse } from "next/server";


interface CardRouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, { params }: CardRouteContext) {
  try {
    const { id } = params;
    const bodyRaw = await req.json();
    const validateBody = updateCardDto.safeParse(bodyRaw);

    if (!validateBody.success) {
      return NextResponse.json(validateBody.error.issues, {
        status: 400,
      });
    }

    
    const findCard = await prisma.card.update({
      where: {
        id,
      },
      data: validateBody.data,
    });

    if (!findCard) {
      return NextResponse.json([
        {
          code: "not_found",
          message: "Card not found",
        },
      ]);
    }

    return NextResponse.json(findCard);
  } catch (error) {
    console.error("Error updated card:", error);
    return NextResponse.json(
      { error: "Failed to updated card" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: CardRouteContext) {
  const { id } = params;

  const findCard = await prisma.card.findUnique({
    where: {
      id,
    },
  });

  if (!findCard) {
    return NextResponse.json([
      {
        code: "not_found",
        message: "Card not found",
      },
    ]);
  }
  await prisma.card.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(
    { message: "card deleted successfully" },
    { status: 200 }
  );
}