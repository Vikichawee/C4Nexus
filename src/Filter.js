import React, { useState } from "react";

function Filter(props) {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [color, setColor] = useState("");

  function buttonClick() {
    props.onApplyFilter({ minPrice, maxPrice, color });
  }

  return (
    <>
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />

      <button onClick={buttonClick}>Apply</button>
    </>
  );
}

export default Filter;
