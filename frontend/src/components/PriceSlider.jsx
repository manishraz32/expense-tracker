import React, { useState, useEffect } from "react";
import { Range } from "react-range";

const PriceSlider = ({ min, max, setTransactionFilter }) => {
  const [values, setValues] = useState([min, max]);

  // Effect to update the values when min or max change
  useEffect(() => {
    setValues([min, max]);
  }, [min, max]);

  const handleRangeChange = (newValues) => {
    setValues(newValues);
    setTransactionFilter((prev) => ({
      ...prev,
      minAmount: newValues[0],
      maxAmount: newValues[1],
    }));
  };

  return (
    <div>
      <Range
        step={1}
        min={min}
        max={max}
        values={values}
        onChange={handleRangeChange} // Pass the new values directly
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-2 bg-gray-300 rounded"
            style={{
              background: `linear-gradient(to right, #22c55e ${((values[0] / max) * 100)}%, #22c55e ${((values[1] / max) * 100)}%)`,
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
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-medium">₹{values[0]}</span>
        <span className="text-gray-700 font-medium">₹{values[1]}</span>
      </div>
    </div>
  );
};

export default PriceSlider;
