import React, { useState } from "react";
import Button from "@mui/material/Button";
import FilledInput from "@mui/material/FilledInput";

import "./Grid.css";

function Filter(props) {
  // State variables for filter values

  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [color, setColor] = useState("");
  // Apply filter button click handler

  function buttonClick() {
    props.onApplyFilter({ minPrice, maxPrice, color });
  }
  const style = {
    color: "#ffffff",
    backgroundColor: "rgba(165, 222, 242, 0.2)", // Updated background color with opacity
    border: "none", // Remove border
    padding: "8px",
    marginBottom: "5px", // Add some spacing
  };

  return (
    // Filter form with input fields and apply button

    <div style={{ margin: "10px" }} className="filter">
      <FilledInput
        style={style}
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <FilledInput
        style={style}
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />
      <FilledInput
        style={style}
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />

      <Button
        style={{ backgroundColor: "#6a7b76" }}
        variant="contained"
        onClick={buttonClick}
      >
        Apply
      </Button>
    </div>
  );
}

export default Filter;
