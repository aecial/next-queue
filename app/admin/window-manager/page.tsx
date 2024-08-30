import WindowManagerNavigations from "@/app/components/WindowManagerNavigations";
import WindowTable from "@/app/components/WindowTable";
import prisma from "@lib/PrismaProvider";
import { revalidatePath } from "next/cache";

const windowManager = async () => {
  const windows = await prisma.department.findMany({
    include: {
      office: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      officeId: "asc",
    },
  });

  return (
    <div className="w-screen min-h-[calc(100vh-4rem)] p-2">
      <h1 className="text-4xl text-center">Window Manager</h1>
      <div>
        <WindowManagerNavigations />
        <WindowTable windows={windows} />
      </div>
    </div>
  );
};

export default windowManager;
