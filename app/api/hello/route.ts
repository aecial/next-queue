export const GET = async (req: Request, res: Response) => {
  return Response.json({ data: "Hemwo!" });
};
export const POST = async (req: Request, res: Response) => {
  return Response.json({ data: "Hemwo from POST!" });
};
