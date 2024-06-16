import React from "react";

const OfficesSkeleton = () => {
  return (
    <>
      <div className="flex justify-center items-center mb-10">
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
        <div className="skeleton rounded-none h-2 w-56"></div>
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="skeleton w-44 h-14"></div>
        <div className="skeleton w-44 h-14"></div>
        <div className="skeleton w-44 h-14"></div>
        <div className="skeleton w-44 h-14"></div>
        <div className="skeleton w-44 h-14"></div>
        <div className="skeleton w-44 h-14"></div>
      </div>
    </>
  );
};

export default OfficesSkeleton;
