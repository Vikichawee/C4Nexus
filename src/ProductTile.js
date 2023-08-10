import { useEffect, useState } from "react";
import data from "./data.json";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function ProjectTile(props) {
  // State to hold product details
  const [items, setItems] = useState([]);

  // Load product details based on index prop

  useEffect(() => {
    setItems(data[props.index]);
  }, [props.index]);

  return (
    // Card to display product details

    <Card
      className="tile"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
    >
      <img
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        src={items.image}
        alt={items.name}
      />
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {items.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {items.description}
        </Typography>
        <Typography variant="body1" color="primary">
          {items.price} EUR
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProjectTile;
