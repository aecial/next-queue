import React from "react";

const OfficesSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="skeleton w-44 h-14"></div>
      <div className="skeleton w-44 h-14"></div>
      <div className="skeleton w-44 h-14"></div>
      <div className="skeleton w-44 h-14"></div>
      <div className="skeleton w-44 h-14"></div>
      <div className="skeleton w-44 h-14"></div>
    </div>
  );
};

export default OfficesSkeleton;
