import React from "react";

import "../styles/Header.css";

const Header = ({ FontAwesome, shoppingBag }) => {
  return (
    <div className="header-container">
      <FontAwesome icon={shoppingBag} />
      <p className="header-title">shop sense</p>
    </div>
  );
};

export default Header;
