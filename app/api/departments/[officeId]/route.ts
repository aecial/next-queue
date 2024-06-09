import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/PrismaProvider";

export const GET = async (
  req: NextRequest,
  { params }: { params: { officeId: string } }
) => {
  const depts = Number(params.officeId);
  console.log(depts);
  if (isNaN(depts)) {
    return NextResponse.json({ error: "Invalid OfficeId" }, { status: 400 });
  }

  try {
    const departments = await prisma.department.findMany({
      where: {
        officeId: depts,
      },
    });

    if (!depts) {
      return NextResponse.json({ error: "depts not found" }, { status: 404 });
    }

    return NextResponse.json({ departments });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
