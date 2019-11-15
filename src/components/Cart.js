import React from "react";
import "../styles/Cart.css";

const Cart = ({ cart, setCart, Link, FontAwesome, cartIcon, circleXIcon }) => {
  const getCartTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].quantity * cart[i].price;
    }
    return total;
  };

  return (
    <div className="cart-container">
      {cart.map((item, i) => {
        return (
          <div
            key={`cart-item-wrapper-container-${i}`}
            className="cart-item-wrapper-container"
          >
            <div className="cart-item-delete-container">
              <button
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
                className="cart-item-delete"
              >
                X
              </button>
            </div>
            <div className="cart-item-container">
              <p className="cart-item-info-label">Product</p>
              <p className="cart-item-info-label">Price</p>
              <p className="cart-item-info-label">Quantity</p>
              <p className="cart-item-info-label">Total price</p>
              <div className="cart-item-info-container">
                <img className="cart-item-img" src={item.src} alt="" />
                <p className="cart-item-name">{item.name}</p>
              </div>
              <p className="cart-item-price">{`${item.price.toFixed(2)}$`}</p>
              <div className="cart-item-quantity-container">
                <p
                  className="cart-item-quantity-plus-minus"
                  onClick={() => {
                    if (item.quantity > 1) {
                      const array = [...cart];
                      array.map(el => {
                        if (el.id === item.id) {
                          el.quantity = item.quantity - 1;
                        }
                        return el;
                      });
                      setCart(array);
                    }
                  }}
                >
                  -
                </p>
                <p className="cart-item-quantity">{item.quantity}</p>
                <p
                  className="cart-item-quantity-plus-minus"
                  onClick={() => {
                    const array = [...cart];
                    array.map(el => {
                      if (el.id === item.id) {
                        el.quantity = item.quantity + 1;
                      }
                      return el;
                    });
                    setCart(array);
                  }}
                >
                  +
                </p>
              </div>
              <p className="cart-item-total-price">{`${(
                item.quantity * item.price
              ).toFixed(2)}$`}</p>
            </div>
          </div>
        );
      })}
      {cart.length > 0 && (
        <div className="cart-buttons-container">
          <Link to="/categories" className="cart-continue-shopping">
            Continue Shopping
          </Link>
          <button
            onClick={() => {
              setCart([]);
            }}
            className="cart-clear-all"
          >
            Clear Cart
          </button>
        </div>
      )}
      {cart.length > 0 && (
        <div className="cart-totals-container">
          <p className="cart-totals-title">Cart Totals</p>
          <div className="cart-total-container">
            <p className="cart-total-label">Total</p>
            <p className="cart-total-value">{`${getCartTotal().toFixed(
              2
            )}$`}</p>
          </div>
          <button className="cart-checkout">Proceed to checkout</button>
        </div>
      )}
      {cart.length === 0 && (
        <div className="cart-empty-container">
          <FontAwesome className="cart-icon" icon={cartIcon} />
          <FontAwesome className="x-icon" icon={circleXIcon} />
          <p className="cart-empty">Your shopping cart is empty</p>
          <Link className="cart-empty-continue-shopping" to="/categories">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
