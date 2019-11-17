import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "../styles/CartModal.css";

const CartModal = ({
  currentProduct,
  isShowing,
  hide,
  cart,
  setCart,
  FontAwesome,
  checkMark,
  failure,
  Link
}) => {
  const [legal, setLegal] = useState(true);

  useEffect(() => {
    if (
      isShowing &&
      [...cart].filter(item => {
        return item.id === currentProduct.id;
      }).length === 0
    ) {
      const array = [...cart];
      array.push(currentProduct);
      setCart(array);
    } else if (
      [...cart].filter(item => {
        return item.id === currentProduct.id;
      }).length > 0
    ) {
      setLegal(false);
    }
    // eslint-disable-next-line
  }, [isShowing, setCart, currentProduct]);

  const getCartQuantity = () => {
    let items = 0;
    for (let i = 0; i < cart.length; i++) {
      items += cart[i].quantity;
    }
    return items;
  };

  const getCartTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].quantity * cart[i].price;
    }
    return total;
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="cart-modal-overlay">
            <div
              className="cart-modal-wrapper"
              aria-modal
              aria-hidden
              tabIndex={-1}
              role="dialog"
            >
              <div className="cart-modal">
                <div className="cart-modal-header">
                  <button
                    className="cart-modal-close-button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={hide}
                  >
                    X
                  </button>
                </div>
                {legal ? (
                  <p className="current-product-added">
                    <FontAwesome icon={checkMark} /> Product successfully added
                    to the shopping cart
                  </p>
                ) : (
                  <p className="current-product-not-added">
                    <FontAwesome icon={failure} /> Product is already in the
                    shopping cart
                  </p>
                )}
                <div className="current-product-cart-container">
                  <img
                    className="current-product-cart-img"
                    src={currentProduct.src}
                    alt="Current item"
                  />
                  <div className="current-product-cart-info-container">
                    <p className="current-product-cart-name">{`${currentProduct.name}`}</p>
                    <p className="current-product-cart-quantity">{`Quantity: ${currentProduct.quantity}`}</p>
                    <p className="current-product-cart-price">{`Price: ${currentProduct.price}$`}</p>
                    <p className="current-product-cart-total-price">{`Total price: ${currentProduct.price *
                      currentProduct.quantity}$`}</p>
                  </div>
                </div>
                {legal && (
                  <div className="current-product-cart-item-container">
                    <p className="current-product-cart-item-quantity">{`There ${
                      getCartQuantity() === 1
                        ? `is ${getCartQuantity()} item`
                        : `are ${getCartQuantity()} items`
                    } in your cart.`}</p>
                    <p className="current-product-cart-item-total-price">{`Total price: ${getCartTotalPrice().toFixed(
                      2
                    )}$`}</p>
                  </div>
                )}
                <div className="current-product-cart-item-nav-container">
                  <Link className="product-more" to="/categories">
                    See more products
                  </Link>
                  {legal && (
                    <Link to="cart" className="view-cart">
                      View Cart
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default CartModal;
