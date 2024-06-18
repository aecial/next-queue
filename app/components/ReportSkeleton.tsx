import React from "react";

const ReportSkeleton = () => {
  return (
    <>
      <div className="w-[40%] flex flex-col items-center gap-5 mb-10">
        <div className="skeleton w-[320px] h-[70px]"></div>
      </div>
      <div className="stats shadow w-[40%] h-[15%]">
        <div className="stat place-items-center skeleton h-[120px]"></div>
      </div>
    </>
  );
};

export default ReportSkeleton;
