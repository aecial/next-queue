"use server";
import prisma from "@lib/PrismaProvider";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export const addUser = async (formData: FormData) => {
  try {
    const name = formData.get("username");
    const password = formData.get("password");
    const officeId = formData.get("officeId");

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const add = await prisma.user.create({
      data: {
        username: String(name),
        password: hashedPassword,
        officeId: Number(officeId),
      },
    });
    console.log(add);
    revalidatePath("/admin/user-manager");
  } catch (error) {
    console.log(error);
  }
};
