import React from "react";
import BigLoader from "../components/BigLoader";

const loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <BigLoader />
    </div>
  );
};

export default loading;
