import React from "react";

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  textAlign: "center",
  position: "fixed",
  bottom: 0,
  padding: "5px",
  marginTop: "100px",
  width: "100%",
};

export default Footer;
