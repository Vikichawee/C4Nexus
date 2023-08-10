import "./Grid.css";
import Button from "@mui/material/Button";

function Header(props) {
  return (
    // Header component with buttons to filter categories

    <div className="header">
      <Button
        style={{ backgroundColor: "#6a7b76" }}
        variant="contained"
        onClick={props.bags}
      >
        Bags
      </Button>
      <Button
        style={{ backgroundColor: "#6a7b76" }}
        variant="contained"
        onClick={props.shoes}
      >
        Shoes
      </Button>
      <Button
        style={{ backgroundColor: "#6a7b76" }}
        variant="contained"
        onClick={props.jeans}
      >
        Jeans
      </Button>
    </div>
  );
}

export default Header;
