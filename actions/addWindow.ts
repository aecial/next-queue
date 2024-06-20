"use server";
import prisma from "@lib/PrismaProvider";
import { revalidatePath } from "next/cache";

export const addWindow = async (formData: FormData) => {
  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const officeId = formData.get("officeId");
    const add = await prisma.department.create({
      data: {
        name: String(name),
        description: String(description),
        officeId: Number(officeId),
        now_serving: String(""),
      },
    });
    console.log(add);
    revalidatePath("/admin/window-manager");
  } catch (error) {
    console.log(error);
  }
};
