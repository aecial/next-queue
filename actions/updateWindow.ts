"use server";
import prisma from "@lib/PrismaProvider";
import { revalidatePath } from "next/cache";

export const updateWindow = async (formData: FormData) => {
  try {
    const idValue = formData.get("id");
    const officeValue = formData.get("officeId");

    if (idValue !== null && officeValue !== null) {
      const id = Number(idValue);
      const officeId = Number(officeValue);

      if (!isNaN(id) && !isNaN(officeId)) {
        const name = formData.get("name") as string | null;
        const description = formData.get("description") as string | null;

        const updatedWindow = await prisma.department.update({
          where: { id: id },
          data: {
            name: name ?? undefined,
            description: description ?? undefined,
            officeId: officeId,
          },
        });

        console.log("Update successful:", updatedWindow);
        revalidatePath("/admin/window-manager");
      } else {
        console.error("Invalid ID or officeId: Not a number");
      }
    } else {
      console.error("ID or officeId is null");
    }
  } catch (error) {
    console.error("Error updating window:", error);
  }
};
