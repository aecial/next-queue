import WindowContainer from "@/app/components/WindowContainer";
import prisma from "@lib/PrismaProvider";
import NotFound from "./not-found";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    return <NotFound title={"Window"} link={"/window"} />;
  }

  const response = await prisma.department.findFirst({
    where: {
      id: id,
    },
  });

  if (!response) {
    return <NotFound title={"Window"} link={"/window"} />;
  }

  return <WindowContainer id={id} />;
};

export default Page;
