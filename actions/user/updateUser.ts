"use server";
import prisma from "@lib/PrismaProvider";
import { revalidatePath } from "next/cache";

export const updateUser = async (formData: FormData) => {
  try {
    const idValue = formData.get("id");
    const officeValue = formData.get("officeId");
    const passValue = formData.get("password");

    if (idValue !== null && officeValue !== null) {
      const id = Number(idValue);
      const officeId = Number(officeValue);

      if (!isNaN(id) && !isNaN(officeId)) {
        const username = formData.get("username") as string | null;
        if (passValue === undefined || passValue === null || passValue === "") {
          const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
              username: username ?? undefined,
              officeId: officeId,
            },
          });
          console.log("Update User successful:", updatedUser);
          revalidatePath("/admin/user-manager");
        } else {
          const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
              username: username ?? undefined,
              password: String(passValue) ?? undefined,
              officeId: officeId,
            },
          });
          console.log("Update User successful:", updatedUser);
          revalidatePath("/admin/user-manager");
        }
      } else {
        console.error("Invalid ID or officeId: Not a number");
      }
    } else {
      console.error("ID or officeId is null");
    }
  } catch (error) {
    console.error("Error updating User:", error);
  }
};
