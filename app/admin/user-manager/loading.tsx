import BigLoader from "@/app/components/BigLoader";
import React from "react";

const loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <BigLoader />
    </div>
  );
};

export default loading;
