import prisma from "@lib/PrismaProvider";
export const GET = async (req: Request, res: Response) => {
  const offices = await prisma.office.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return Response.json({ offices });
};
