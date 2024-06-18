import prisma from "@lib/PrismaProvider";
export const GET = async (req: Request, res: Response) => {
  const since = await prisma.service.findFirst({
    select: {
      createdAt: true,
    },
  });
  const reportCount = await prisma.service.count();
  const reportAverage = await prisma.service.aggregate({
    _avg: {
      service_time: true,
    },
  });
  return Response.json({ since, reportCount, reportAverage });
};
