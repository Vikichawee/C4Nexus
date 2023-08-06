import { useEffect, useState } from "react";
import data from "./data.json";

function ProjectTile(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data[props.index]);
  }, [props.index]);

  return (
    <div>
      <h2>{items.image}</h2>
      <h2>{items.name}</h2>
      <h2>{items.description}</h2>
      <h2>{items.price}</h2>
      <h2>{items.rating}</h2>
      <h2>{items.color}</h2>
      <h2>{items.category}</h2>
    </div>
  );
}

export default ProjectTile;
