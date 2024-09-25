import React from 'react';

const CustomProgressBar = ({ value }) => {
  return (
    <div className="relative w-full h-8 rounded-[4px]">
      {/* Progress Bar Background */}
      <div className="w-full h-full bg-[#e5ebee] rounded-[4px]">
        {/* Progress Bar Fill */}
        <div
          className="h-full bg-green-650 rounded-[4px] transition-all duration-500"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      {/* Progress Value Text */}
      <div className="absolute top-0 bottom-0 left-4  flex items-center justify-start text-white font-bold">
        {`${Math.round(value)}%`}
      </div>
    </div>
  );
};

export default CustomProgressBar;
