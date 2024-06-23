"use server";
import prisma from "@lib/PrismaProvider";
import { revalidatePath } from "next/cache";

export const addUser = async (formData: FormData) => {
  try {
    const name = formData.get("username");
    const password = formData.get("password");
    const officeId = formData.get("officeId");
    const add = await prisma.user.create({
      data: {
        username: String(name),
        password: String(password),
        officeId: Number(officeId),
      },
    });
    console.log(add);
    revalidatePath("/admin/user-manager");
  } catch (error) {
    console.log(error);
  }
};
