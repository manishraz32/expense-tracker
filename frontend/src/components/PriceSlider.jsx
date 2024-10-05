import React, { useState } from "react";
import { Range } from "react-range";

const PriceSlider = () => {
  const [values, setValues] = useState([0, 50000]);

  return (
    <div className="">
      <Range
        step={1000}
        min={0}
        max={50000}
        values={values}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-2 bg-gray-300 rounded"
            style={{
              background: `linear-gradient(to right, #22c55e ${((values[0] / 50000) * 100)}%, #22c55e ${((values[1] / 50000) * 100)}%)`,
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-4 h-4 bg-green-500 rounded-full cursor-pointer"
          />
        )}
      />
       <div className="flex justify-between items-center mb-1">
        <span className="text-gray-700 font-medium">₹{values[0]}</span>
        <span className="text-gray-700 font-medium">₹{values[1]}</span>
      </div>
    </div>
  );
};

export default PriceSlider;
