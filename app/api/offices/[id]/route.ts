import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/PrismaProvider";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = Number(params.id);
  console.log(id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const office = await prisma.office.findFirst({
      where: {
        id: id,
      },
    });

    if (!office) {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ office });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
