import prisma from "@lib/PrismaProvider";
export const GET = async (req: Request, res: Response) => {
  const offices = await prisma.office.findMany({
    include: {
      department: true,
    },
  });
  return Response.json({ offices });
};
