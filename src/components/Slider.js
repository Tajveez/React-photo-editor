import React from "react";

function Slider({ option, changeValue }) {
  return (
    <div className="slider-container">
      <input
        min={option.range.min}
        max={option.range.max}
        value={option.value}
        onChange={changeValue}
        type="range"
        className="slider"
      />
    </div>
  );
}

export default Slider;
