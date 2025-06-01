import { NextResponse } from "next/server";
import { updateColumnsOrderDto } from "../dto";
import { prisma } from "@/core/prisma";

export async function PUT(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = updateColumnsOrderDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, {
      status: 400,
    });
  }

  const queries = validateBody.data.map(({ id, order }) =>
    prisma.column.update({
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
    return NextResponse.json({ message: "Columns updated" }, { status: 200 });


  } catch (error) {

    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update columns" },
      { status: 500 }
    );

  }
}
