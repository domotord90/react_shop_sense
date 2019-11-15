import React from "react";
import { Transition } from "react-transition-group";

import "../styles/CartSideBar.css";

const DURATION = 300;

const CartSideBar = ({
  isMenuClicked,
  setIsMenuClicked,
  FontAwesome,
  closeMenu,
  Link,
  cart,
  setCart
}) => {
  const menuClick = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  const sidebarStyle = {
    transition: `width ${DURATION}ms`
  };

  const sidebarTransitionStyles = {
    entering: {
      position: "fixed",
      right: "0px",
      width: 0,
      height: "50%",
      overflowY: "auto"
    },
    entered: {
      position: "fixed",
      right: "0px",
      width: "70%",
      height: "50%",
      overflowY: "auto"
    },
    exiting: {
      position: "fixed",
      right: "0px",
      height: "50%",
      width: "70%",
      overflowY: "auto"
    },
    exited: {
      position: "fixed",
      right: "0px",
      width: 0,
      height: "50%",
      overflowY: "auto"
    }
  };

  const linkStyle = {
    transition: `opacity ${DURATION}ms`
  };

  const linkTransitionStyles = {
    entering: { pointerEvents: "none", opacity: 0 },
    entered: { pointerEvents: "auto", opacity: 1 },
    exiting: { pointerEvents: "auto", opacity: 1 },
    exited: { pointerEvents: "none", opacity: 0 }
  };

  const getCartTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].quantity * cart[i].price;
    }
    return total;
  };

  return (
    <div className="cart-side-bar-container">
      <div className="cart-menu-bar-container">
        <Transition in={isMenuClicked} timeout={DURATION}>
          {state => (
            <div
              className={`cart-menu-bar`}
              style={{ ...sidebarStyle, ...sidebarTransitionStyles[state] }}
            >
              <Transition in={isMenuClicked} timeout={DURATION}>
                {state => (
                  <div
                    style={{
                      ...linkStyle,
                      ...linkTransitionStyles[state]
                    }}
                    className="cart-menu-bar-transition"
                  >
                    <p className="cart-sidebar-title">
                      Cart{" "}
                      <FontAwesome
                        className="cart-sidebar-exit"
                        onClick={menuClick}
                        icon={closeMenu}
                      />
                    </p>
                    {cart.length > 0 && (
                      <div className="cart-sidebar-products-container">
                        {cart.map((item, i) => {
                          return (
                            <div
                              key={`cart-sidebar-product-container-${i}`}
                              className="cart-sidebar-product-container"
                            >
                              <img
                                className="cart-sidebar-product-img"
                                src={item.src}
                                alt={`${item.name}`}
                              />
                              <div className="cart-sidebar-product-info-container">
                                <p className="cart-sidebar-product-name">
                                  {item.name}
                                </p>
                                <div className="cart-sidebar-product-quantity-price-container">
                                  <p className="cart-sidebar-product-quantity-price">{`${
                                    item.quantity
                                  }x${item.price.toFixed(2)}$`}</p>
                                </div>
                              </div>
                              <FontAwesome
                                className="cart-sidebar-product-remove"
                                icon={closeMenu}
                                onClick={() => {
                                  const array = [...cart];
                                  let i;
                                  for (i = 0; i < array.length; i++) {
                                    if (array[i].id === item.id) {
                                      break;
                                    }
                                  }
                                  array.splice(i, 1);
                                  setCart(array);
                                }}
                              />
                            </div>
                          );
                        })}
                        <div className="cart-sidebar-total-container">
                          <p className="cart-sidebar-total-label">Total:</p>
                          <p className="cart-sidebar-total-value">{`${getCartTotal().toFixed(
                            2
                          )}$`}</p>
                        </div>
                        <Link className="cart-sidebar-view-cart" to="/cart">
                          View Cart
                        </Link>
                      </div>
                    )}
                    {cart.length === 0 && (
                      <p className="cart-sidebar-no-items">
                        There are no items in your cart
                      </p>
                    )}
                  </div>
                )}
              </Transition>
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
};

export default CartSideBar;
