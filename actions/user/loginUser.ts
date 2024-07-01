"use server";
import prisma from "@lib/PrismaProvider";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      office: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  console.log(user);
  cookies().set("userId", JSON.stringify(user?.id));
  cookies().set("username", JSON.stringify(user?.username));
  cookies().set("officeId", JSON.stringify(user?.office?.id));
  cookies().set("officeName", JSON.stringify(user?.office?.name));
  if (user?.office === null) {
    redirect("/admin");
  } else {
    redirect("/window");
  }
};
