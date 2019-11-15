import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import Categories from "./Categories";
import Shop from "./Shop";
import Product from "./Product";
import Cart from "./Cart";
import Dashboard from "./Dashboard";
import SideBar from "./SideBar";
import CartSideBar from "./CartSideBar";
import Footer from "./Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faShoppingCart,
  faBars,
  faTimes,
  faArrowCircleLeft,
  faArrowCircleRight,
  faCopyright,
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faTimesCircle as farTimesCircle } from "@fortawesome/free-regular-svg-icons";

import { products } from "../assets/products";

import "../styles/App.css";

const App = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isCartMenuClicked, setIsCartMenuClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([...products]);
  const [pageStart, setPageStart] = useState(0);
  const [pageLimit, setPageLimit] = useState(3);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [sorting, setSorting] = useState("alphAsc");
  const [cart, setCart] = useState([]);

  const menuClick = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  const cartMenuClick = () => {
    setIsCartMenuClicked(!isCartMenuClicked);
  };

  return (
    <Router>
      <div className="app-main-container">
        <div className="header-navigation-container">
          <Header FontAwesome={FontAwesomeIcon} shoppingBag={faShoppingBag} />
          <div className="navigation-container">
            <FontAwesomeIcon
              className="app-cart-icon"
              onClick={cartMenuClick}
              icon={faShoppingCart}
            />
            <div className="cart-counter">{cart.length}</div>
            <FontAwesomeIcon
              className="menu-icon"
              onClick={menuClick}
              icon={faBars}
            />
          </div>
        </div>
        <div className="header-navigation-container-non-mobile">
          <Header FontAwesome={FontAwesomeIcon} shoppingBag={faShoppingBag} />
          <ul className="home-links-container">
            <li>
              <Link className="header-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="header-link" to="/categories">
                Shop
              </Link>
            </li>
          </ul>
          <div className="navigation-container">
            <FontAwesomeIcon
              className="app-cart-icon"
              onClick={cartMenuClick}
              icon={faShoppingCart}
            />
            <div className="cart-counter">{cart.length}</div>
          </div>
        </div>
        <div className="content-container">
          <SideBar
            isMenuClicked={isMenuClicked}
            setIsMenuClicked={setIsMenuClicked}
            FontAwesome={FontAwesomeIcon}
            menu={faBars}
            closeMenu={faTimes}
            Link={Link}
          />

          <Switch>
            <Route exact path="/">
              <Home
                Link={Link}
                FontAwesome={FontAwesomeIcon}
                arrowLeft={faArrowCircleLeft}
                arrowRight={faArrowCircleRight}
              />
            </Route>
            <Route path="/categories">
              <Categories
                categories={categories}
                setCategories={setCategories}
                useHistory={useHistory}
                setCurrentProducts={setCurrentProducts}
              />
            </Route>
            <Route path="/shop">
              <Shop
                currentProducts={currentProducts}
                setCurrentProducts={setCurrentProducts}
                pageStart={pageStart}
                setPageStart={setPageStart}
                pageLimit={pageLimit}
                setPageLimit={setPageLimit}
                setCurrentProduct={setCurrentProduct}
                useHistory={useHistory}
                sorting={sorting}
                setSorting={setSorting}
              />
            </Route>
            <Route path="/product">
              <Product
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct}
                Link={Link}
                cart={cart}
                setCart={setCart}
                FontAwesome={FontAwesomeIcon}
                checkMark={faCheckCircle}
                failure={faTimesCircle}
              />
            </Route>
            <Route path="/cart">
              <Cart
                cart={cart}
                setCart={setCart}
                Link={Link}
                FontAwesome={FontAwesomeIcon}
                cartIcon={faShoppingCart}
                circleXIcon={farTimesCircle}
              />
            </Route>
          </Switch>
          <CartSideBar
            isMenuClicked={isCartMenuClicked}
            setIsMenuClicked={setIsCartMenuClicked}
            FontAwesome={FontAwesomeIcon}
            closeMenu={faTimes}
            Link={Link}
            cart={cart}
            setCart={setCart}
          />
        </div>
        <Footer
          FontAwesome={FontAwesomeIcon}
          facebook={faFacebook}
          twitter={faTwitter}
          copyright={faCopyright}
        />
      </div>
    </Router>
  );
};

export default App;
