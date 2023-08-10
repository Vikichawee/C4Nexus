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

  return (
    // Filter form with input fields and apply button

    <div className="filter">
      <FilledInput
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <FilledInput
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />
      <FilledInput
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
