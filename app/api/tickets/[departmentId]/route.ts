import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/PrismaProvider";

export const GET = async (
  req: NextRequest,
  { params }: { params: { departmentId: string } }
) => {
  const deptId = Number(params.departmentId);
  console.log(deptId);
  if (isNaN(deptId)) {
    return NextResponse.json(
      { error: "Invalid departmentId" },
      { status: 400 }
    );
  }

  try {
    const tickets = await prisma.tickets.findMany({
      where: {
        departmentId: deptId,
      },
    });

    if (!deptId) {
      return NextResponse.json({ error: "deptId not found" }, { status: 404 });
    }

    return NextResponse.json({ tickets });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
