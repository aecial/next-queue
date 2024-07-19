"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const logoutUser = async () => {
  const cookieOptions = {
    expires: new Date(0), // Set expiration to a past date
    path: "/", // Ensure the cookie is unset across the entire site
  };

  cookies().set("userId", "", cookieOptions);
  cookies().set("username", "", cookieOptions);
  cookies().set("officeId", "", cookieOptions);
  cookies().set("officeName", "", cookieOptions);

  redirect("/login"); // Redirect the user to the login page
};
