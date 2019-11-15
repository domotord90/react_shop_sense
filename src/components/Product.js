import React, { useState } from "react";
import "../styles/Product.css";
import CartModal from "./CartModal";
import useModal from "../assets/useModal";

const Product = ({
  currentProduct,
  setCurrentProduct,
  Link,
  cart,
  setCart,
  FontAwesome,
  checkMark,
  failure
}) => {
  const [quantity, setQuantity] = useState(1);

  const { isShowing, toggle } = useModal();

  const quantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const quantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    const tempProduct = { ...currentProduct, quantity: quantity };
    setCurrentProduct(tempProduct);
    toggle();
  };

  return (
    <div className="current-product-container">
      <img
        className="product-img"
        src={currentProduct.src}
        alt={`${currentProduct.name}`}
      />
      <div className="product-info-container">
        <p className="product-id">{`Product ID: ${currentProduct.id}`}</p>
        <p className="product-name">{`${currentProduct.name}`}</p>
        <p className="product-price">{`${currentProduct.price}$`}</p>
        <p className="product-long-desc">{`${currentProduct.long_desc}`}</p>
        <div className="product-quantity-container">
          <p className="product-quantity-label">Quantity</p>
          <p onClick={quantityDecrease}>-</p>
          <p className="product-quantity">{quantity}</p>
          <p onClick={quantityIncrease}>+</p>
        </div>
        <button className="product-cart-button" onClick={addToCart}>
          Add to cart
        </button>
        <Link className="product-more" to="/categories">
          See more products
        </Link>
      </div>
      <CartModal
        currentProduct={currentProduct}
        isShowing={isShowing}
        hide={toggle}
        cart={cart}
        setCart={setCart}
        FontAwesome={FontAwesome}
        checkMark={checkMark}
        failure={failure}
        Link={Link}
      />
    </div>
  );
};

export default Product;
