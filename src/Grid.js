import React, { useState, useEffect } from "react";
import ProductTile from "./ProductTile";
import data from "./data.json";
import Filter from "./Filter";

function Grid() {
  const [productTileMap, setProductTileMap] = useState([]);
  const [forIndex, setForIndex] = useState(10);
  const [counter, setCounter] = useState(forIndex);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    color: "",
  });

  useEffect(() => {
    const initialTiles = [];
    for (let index = 0; index < forIndex; index++) {
      initialTiles.push(<ProductTile key={index} index={index} />);
    }
    setProductTileMap(initialTiles);
  }, [forIndex]);

  const buttonClick = () => {
    const update = [];
    const updatedForIndex = forIndex + 10;

    for (let index = 0; index < updatedForIndex; index++) {
      update.push(<ProductTile key={index} index={index} />);
    }

    setForIndex(updatedForIndex);
    setCounter(updatedForIndex);
    setProductTileMap(update);
    console.log(data);
  };

  const reverseButtonClick = () => {
    const reversedArray = [...productTileMap].reverse();
    setProductTileMap(reversedArray);
  };

  const priceSortDesc = () => {
    const sortedTiles = [...productTileMap];
    sortedTiles.sort((a, b) => {
      const priceA = data[a.key].price;
      const priceB = data[b.key].price;
      return priceA - priceB;
    });
    setProductTileMap(sortedTiles);
  };

  const priceSortAsc = () => {
    const sortedTiles = [...productTileMap];
    sortedTiles.sort((a, b) => {
      const priceA = data[a.key].price;
      const priceB = data[b.key].price;
      return priceB - priceA;
    });
    setProductTileMap(sortedTiles);
  };

  const applyFilters = (selectedFilters) => {
    // Set the selected filters to the state
    setFilters(selectedFilters);
    // Apply filters to create a new grid
    const filteredTiles = data.filter((item) => {
      const meetsMinPrice = item.price >= selectedFilters.minPrice;
      const meetsMaxPrice = item.price <= selectedFilters.maxPrice;
      const meetsColor =
        selectedFilters.color === "" || item.color === selectedFilters.color;
      return meetsMinPrice && meetsMaxPrice && meetsColor;
    });

    const updatedTiles = filteredTiles.map((item, index) => (
      <ProductTile key={index} index={item.id - 1} />
    ));

    setProductTileMap(updatedTiles);
  };

  return (
    <div className="grid-container">
      <Filter onApplyFilter={applyFilters} />
      {productTileMap}
      <button onClick={buttonClick}>asd</button>
      <button onClick={reverseButtonClick}>reverse</button>
      <button onClick={priceSortDesc}>PriceDesc</button>
      <button onClick={priceSortAsc}>PriceAsc</button>

      <div>{counter}</div>
    </div>
  );
}

export default Grid;
