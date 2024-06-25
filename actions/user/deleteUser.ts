"use server";
import prisma from "@lib/PrismaProvider";
import { revalidatePath } from "next/cache";

export const deleteUser = async (formData: FormData) => {
  try {
    const id = formData.get("id");
    const del = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    console.log(del);
    revalidatePath("/admin/user-manager");
  } catch (error) {
    console.log(error);
  }
};
