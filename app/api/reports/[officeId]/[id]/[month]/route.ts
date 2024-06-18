import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/PrismaProvider";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string; month: number } }
) => {
  const reports = Number(params.id);
  const month = Number(params.month);
  console.log(reports);
  if (isNaN(reports)) {
    return NextResponse.json({ error: "Invalid Id" }, { status: 400 });
  }

  try {
    const since = await prisma.$queryRaw`
     SELECT createdAt
     FROM service
     WHERE departmentId = ${reports}
     AND MONTH(createdAt) = ${month} ORDER BY id ASC LIMIT 1`;

    const reportCount = await prisma.service.count({
      where: {
        departmentId: reports,
        createdAt: {
          gte: new Date(`${new Date().getFullYear()}-${month}-01`),
          lt: new Date(`${new Date().getFullYear()}-${month + 1}-01`),
        },
      },
    });
    const reportAverage = await prisma.service.aggregate({
      where: {
        departmentId: reports,
        createdAt: {
          gte: new Date(`${new Date().getFullYear()}-${month}-01`),
          lt: new Date(`${new Date().getFullYear()}-${month + 1}-01`),
        },
      },
      _avg: {
        service_time: true,
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

// app.get("/api/report/:id/:month", async (req, res) => {
//     const id = Number(req.params.id);
//     const month = Number(req.params.month);
//     const since = await prisma.$queryRaw`
//     SELECT *
//     FROM service
//     WHERE departmentId = ${id}
//     AND MONTH(createdAt) = ${month} ORDER BY id ASC LIMIT 1
//   `;
