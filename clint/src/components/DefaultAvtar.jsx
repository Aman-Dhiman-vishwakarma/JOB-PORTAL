import React from "react";

const DefaultAvtar = ({name}) => {
  return (
    <div className="cursor-pointer h-10 min-w-10 text-2xl font-semibold bg-[#f83002] rounded-full flex items-center justify-center">
      <span className="text-white">{name[0].toUpperCase()}</span>
    </div>
  );
};

export default DefaultAvtar;
