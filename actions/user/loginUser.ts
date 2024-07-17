"use server";
import prisma from "@lib/PrismaProvider";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      password: true, // Assuming you have the hashed password stored in the database
      office: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    redirect("/login");
    return;
  }

  console.log(user);
  cookies().set("userId", encodeURIComponent(JSON.stringify(user.id)));
  cookies().set("username", encodeURIComponent(JSON.stringify(user.username)));
  cookies().set(
    "officeId",
    encodeURIComponent(JSON.stringify(user.office?.id))
  );
  cookies().set(
    "officeName",
    encodeURIComponent(JSON.stringify(user.office?.name))
  );

  if (!user.office) {
    redirect("/admin");
  } else {
    redirect("/window");
  }
};
