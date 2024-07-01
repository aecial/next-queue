import React from "react";
import DepartmentsList from "../components/DepartmentsList";
import { cookies } from "next/headers";
const page = () => {
  const officeId = Number(cookies()?.get("officeId")?.value);
  console.log(officeId);
  return (
    <div>
      <DepartmentsList officeId={officeId} />
    </div>
  );
};

export default page;
