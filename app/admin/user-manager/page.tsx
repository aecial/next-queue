import UsersTable from "@/app/components/UsersTable";
import prisma from "@lib/PrismaProvider";

const userManager = async () => {
  const users = await prisma.user.findMany({
    where: {
      officeId: {
        not: null,
      },
    },
    select: {
      id: true,
      username: true,
      officeId: true,
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
    <div className="w-screen min-h-screen p-2">
      <h1 className="text-4xl text-center">User Manager</h1>
      <div>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default userManager;
