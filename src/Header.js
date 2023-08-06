function Header(props) {
  return (
    <>
      <button onClick={props.bags}>Bags</button>
      <button onClick={props.shoes}>Shoes</button>
      <button onClick={props.jeans}>Jeans</button>
    </>
  );
}

export default Header;
