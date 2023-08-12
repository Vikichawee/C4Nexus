import React, { useState, useEffect } from "react";
import ProductTile from "./ProductTile";
import data from "./data.json";
import Filter from "./Filter";
import Header from "./Header";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Footer from "./Footer";

import "./Grid.css";

function Grid(props) {
  // State variables
  const [productTileMap, setProductTileMap] = useState([]);
  const forIndex = 12;
  const [counter, setCounter] = useState(forIndex);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    color: "",
  });
  const [sort, setSort] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  // Load initial product tiles
  useEffect(() => {
    const initialTiles = [];
    for (let index = 0; index < forIndex; index++) {
      initialTiles.push(<ProductTile key={index} index={index} />);
    }
    setProductTileMap(initialTiles);
  }, [forIndex]);

  // Load more products
  const loadMore = () => {
    const updatedForIndex = counter + 12;

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
  // Handle reverse button click
  const reverseButtonClick = () => {
    const reversedArray = [...productTileMap].reverse();
    setProductTileMap(reversedArray);
  };
  // Handle ascending price sort
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
  // Handle descending price sort
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
  // Apply filters to product list
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
  // Show products of a specific category
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
  // Handle opening the sort menu
  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Handle closing the sort menu
  const handleSortClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="grid-container">
      <Header
        bags={() => showOnlyCategory("bags")}
        shoes={() => showOnlyCategory("shoes")}
        jeans={() => showOnlyCategory("jeans")}
      />
      <Filter onApplyFilter={applyFilters} />
      <div className="product-grid">{productTileMap}</div>

      <div className="sort">
        <Button
          style={{ backgroundColor: "#6a7b76" }}
          variant="contained"
          className="sortHover"
          onClick={handleSortClick}
        >
          Sort
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleSortClose}
        >
          <MenuItem onClick={reverseButtonClick}>Reverse</MenuItem>
          <MenuItem onClick={priceSortDesc}>Price Desc</MenuItem>
          <MenuItem onClick={priceSortAsc}>Price Asc</MenuItem>
        </Menu>
      </div>
      <div className="loadAndCounter">
        <Button
          style={{ backgroundColor: "#6a7b76" }}
          variant="contained"
          onClick={loadMore}
          className="button"
        >
          More
        </Button>
        <div className="counter">Total items: {counter}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Grid;
