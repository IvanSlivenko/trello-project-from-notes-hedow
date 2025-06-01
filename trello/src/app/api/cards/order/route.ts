import { NextResponse } from "next/server";
import { updateCardOrderDto } from "../dto";
import { prisma } from "@/core/prisma";

export async function PUT(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = updateCardOrderDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, {
      status: 400,
    });
  }

  const queries = validateBody.data.map(({ id, order }) =>
    prisma.card.update({
      where: {
        id,
      },
      data: {
        order,
      },
    })
  );

  try {

    await prisma.$transaction(queries);
    return NextResponse.json({ message: "Cards updated" }, { status: 200 });


  } catch (error) {

    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update cards" },
      { status: 500 }
    );

  }
}
