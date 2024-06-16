import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/PrismaProvider";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const dept = Number(params.id);
  console.log(dept);
  if (isNaN(dept)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const department = await prisma.department.findUnique({
      where: {
        id: dept,
      },
    });

    if (!dept) {
      return NextResponse.json({ error: "dept not found" }, { status: 404 });
    }

    return NextResponse.json({ department });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
