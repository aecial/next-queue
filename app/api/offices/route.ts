import prisma from "@lib/PrismaProvider";
export const GET = async (req: Request, res: Response) => {
  const offices = await prisma.office.findMany();
  return Response.json({ offices });
};
export const POST = async (req: Request, res: Response) => {
  return Response.json({ data: "Hemwo from POST!" });
};
