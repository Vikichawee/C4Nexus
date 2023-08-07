import React, { useState, useEffect } from "react";
import ProductTile from "./ProductTile";
import data from "./data.json";
import Filter from "./Filter";
import Header from "./Header";

function Grid(props) {
  const [productTileMap, setProductTileMap] = useState([]);
  const forIndex = 10;
  const [counter, setCounter] = useState(forIndex);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    color: "",
  });
  const [sort, setSort] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const initialTiles = [];
    for (let index = 0; index < forIndex; index++) {
      initialTiles.push(<ProductTile key={index} index={index} />);
    }
    setProductTileMap(initialTiles);
  }, [forIndex]);

  const loadMore = () => {
    const updatedForIndex = counter + 10;

    let categoryData = data;
    if (selectedCategory) {
      categoryData = data.filter((item) => item.category === selectedCategory);
    }

    const update = [];
    const newCounter = Math.min(updatedForIndex, categoryData.length);
    for (let index = counter; index < newCounter; index++) {
      update.push(
        <ProductTile key={index} index={categoryData[index].id - 1} />
      );
    }

    setProductTileMap([...productTileMap, ...update]);
    setCounter(newCounter);
    if (sort === "ASC") {
      priceSortAsc();
    } else if (sort === "DESC") {
      priceSortDesc();
    }
  };

  const reverseButtonClick = () => {
    const reversedArray = [...productTileMap].reverse();
    setProductTileMap(reversedArray);
  };

  const priceSortAsc = () => {
    let sortedTiles = [...productTileMap];

    let categoryData = data;
    if (selectedCategory) {
      categoryData = data.filter((item) => item.category === selectedCategory);
    }

    sortedTiles.sort((a, b) => {
      const priceA = categoryData[a.key].price;
      const priceB = categoryData[b.key].price;
      return priceA - priceB;
    });

    setProductTileMap(sortedTiles);
    setSort("ASC");
  };

  const priceSortDesc = () => {
    let sortedTiles = [...productTileMap];

    let categoryData = data;
    if (selectedCategory) {
      categoryData = data.filter((item) => item.category === selectedCategory);
    }

    sortedTiles.sort((a, b) => {
      const priceA = categoryData[a.key].price;
      const priceB = categoryData[b.key].price;
      return priceB - priceA;
    });

    setProductTileMap(sortedTiles);
    setSort("DESC");
  };

  const applyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
    let filteredTiles = data;

    if (selectedCategory) {
      filteredTiles = filteredTiles.filter(
        (item) => item.category === selectedCategory
      );
    }

    filteredTiles = filteredTiles.filter((item) => {
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

  const showOnlyCategory = (category) => {
    setSelectedCategory(category);

    const categoryData = data.filter((item) => item.category === category);

    const newCounter = Math.min(forIndex, categoryData.length);

    const updatedTiles = categoryData
      .slice(0, newCounter)
      .map((item, index) => <ProductTile key={index} index={item.id - 1} />);

    setProductTileMap(updatedTiles);

    setCounter(newCounter);
  };

  return (
    <div className="grid-container">
      <Header
        bags={() => showOnlyCategory("bags")}
        shoes={() => showOnlyCategory("shoes")}
        jeans={() => showOnlyCategory("jeans")}
      />
      <Filter onApplyFilter={applyFilters} />
      {productTileMap}
      <button onClick={loadMore}>Load More</button>
      <button onClick={reverseButtonClick}>reverse</button>
      <button onClick={priceSortDesc}>PriceDesc</button>
      <button onClick={priceSortAsc}>PriceAsc</button>

      <div>{counter}</div>
    </div>
  );
}

export default Grid;
