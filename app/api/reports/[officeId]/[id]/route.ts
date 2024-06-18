import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/PrismaProvider";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const reports = Number(params.id);
  console.log(reports);
  if (isNaN(reports)) {
    return NextResponse.json({ error: "Invalid Id" }, { status: 400 });
  }

  try {
    const since = await prisma.service.findFirst({
      where: {
        department: {
          id: Number(reports),
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const reportCount = await prisma.service.count({
      where: {
        department: {
          id: Number(reports),
        },
      },
    });

    const reportAverage = await prisma.service.aggregate({
      _avg: {
        service_time: true,
      },
      where: {
        department: {
          id: Number(reports),
        },
      },
    });
    const months =
      await prisma.$queryRaw`SELECT DISTINCT MONTH(createdAt) AS month
  FROM service WHERE departmentId = ${reports};`;
    if (!reports) {
      return NextResponse.json({ error: "reports not found" }, { status: 404 });
    }

    return NextResponse.json({ since, reportCount, reportAverage, months });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
