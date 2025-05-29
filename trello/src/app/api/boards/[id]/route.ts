import { NextResponse } from "next/server";
import { updateBoardDto } from "../dto";

export async function PUT(req: Request){
  try {
    const bodyRaw = await req.json();
    const validateBody = updateBoardDto.safeParse(bodyRaw);
    if(! validateBody.success){
      return NextResponse.json(validateBody.error.issues,{
        status: 400,
      });
    }
  } catch (error) {
    console.error("Error fetching boards:", error);
    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 }
    );
  }
}