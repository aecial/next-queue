import React from "react";
import AdminCard from "../components/AdminCard";
const adminPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-4xl">Admin Functions</h1>
      <div className="flex gap-10">
        <AdminCard
          title="User Manager"
          link={"/user-manager"}
          imageLink={"/employees.svg"}
        />
        <AdminCard
          title="Window Manager"
          link={"/window-manager"}
          imageLink="/addDept.svg"
        />
        <AdminCard
          title="Reporting"
          link={"/report"}
          imageLink="/viewReport.svg"
        />
      </div>
    </div>
  );
};

export default adminPage;
