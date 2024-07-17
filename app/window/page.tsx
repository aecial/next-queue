import React from "react";
import DepartmentsList from "../components/DepartmentsList";
import { cookies } from "next/headers";

const page = () => {
  // Retrieve the officeId cookie and convert it to a number
  const officeIdCookie = cookies().get("officeId");
  const officeId = officeIdCookie ? Number(officeIdCookie.value) : null;
  console.log(officeId);

  // Retrieve and decode the officeName cookie
  const officeNameCookie = cookies().get("officeName");
  const officeName = officeNameCookie
    ? JSON.parse(decodeURIComponent(officeNameCookie.value))
    : null;
  console.log(officeName);

  return (
    <div>
      {officeId !== null ? (
        <DepartmentsList officeId={officeId} />
      ) : (
        <p>Office ID is not available</p>
      )}
    </div>
  );
};

export default page;
