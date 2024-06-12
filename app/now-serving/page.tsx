import React from "react";
import NowServingContainer from "../components/NowServingContainer";

const page = () => {
  return (
    <div className="h-screen">
      <h1 className="text-4xl text-center pt-10">Now Serving</h1>
      <div className="divider"></div>
      <NowServingContainer />
    </div>
  );
};

export default page;
