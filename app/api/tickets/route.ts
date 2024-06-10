import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/PrismaProvider";
export const GET = async (req: NextRequest, res: NextRequest) => {
  const tickets = await prisma.tickets.findMany();
  return NextResponse.json({ tickets });
};
export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  const { name, departmentId } = body as { name: string; departmentId: number };
  return NextResponse.json({ data: { name, departmentId } });
};
