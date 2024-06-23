"use server";
import prisma from "@lib/PrismaProvider";
import { revalidatePath } from "next/cache";

export const deleteWindow = async (formData: FormData) => {
  try {
    const id = formData.get("id");
    const del = await prisma.department.delete({
      where: {
        id: Number(id),
      },
    });
    console.log(del);
    revalidatePath("/admin/window-manager");
  } catch (error) {
    console.log(error);
  }
};
