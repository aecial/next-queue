import prisma from "@lib/PrismaProvider";
export const GET = async (req: Request, res: Response) => {
  const departments = await prisma.department.findMany({
    select: {
      id: true,
      name: true,
      officeId: true,
    },
  });
  return Response.json({ departments });
};
export const POST = async (req: Request, res: Response) => {
  return Response.json({ data: "Hemwo from POST!" });
};
