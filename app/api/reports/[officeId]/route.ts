import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/PrismaProvider";

export const GET = async (
  req: NextRequest,
  { params }: { params: { officeId: string } }
) => {
  const reports = Number(params.officeId);
  console.log(reports);
  if (isNaN(reports)) {
    return NextResponse.json({ error: "Invalid OfficeId" }, { status: 400 });
  }

  try {
    const since = await prisma.service.findFirst({
      where: {
        department: {
          officeId: Number(reports),
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const reportCount = await prisma.service.count({
      where: {
        department: {
          officeId: Number(reports),
        },
      },
    });

    const reportAverage = await prisma.service.aggregate({
      _avg: {
        service_time: true,
      },
      where: {
        department: {
          officeId: Number(reports),
        },
      },
    });
    if (!reports) {
      return NextResponse.json({ error: "reports not found" }, { status: 404 });
    }

    return NextResponse.json({ since, reportCount, reportAverage });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
