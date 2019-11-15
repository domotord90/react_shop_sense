import React, { useEffect } from "react";
import { products } from "../assets/products";

import "../styles/Categories.css";

const Categories = ({
  categories,
  setCategories,
  useHistory,
  setCurrentProducts
}) => {
  const history = useHistory();

  useEffect(() => {
    const array = [];
    for (let i = 0; i < products.length; i++) {
      if (
        !array.find(e => {
          return e.name === products[i].category;
        })
      ) {
        array.push({ name: products[i].category, quantity: 1 });
      } else {
        const index = array.findIndex(e => {
          return e.name === products[i].category;
        });
        array[index].quantity = array[index].quantity + 1;
      }
    }
    setCategories(array);
  }, [setCategories]);

  return (
    <div className="categories-container">
      <div className="category-container">
        <img
          className="category-img"
          src={require("../images/categories/all.jpg")}
          alt=""
          onClick={() => {
            setCurrentProducts([...products]);
            history.push("shop");
          }}
        />
        <p className="category-name">All</p>
        <p className="category-quantity">{`Products: ${products.length}`}</p>
        <button
          className="category-button"
          onClick={() => {
            setCurrentProducts([...products]);
            history.push("shop");
          }}
        >
          More >
        </button>
      </div>
      {categories.map((item, i) => {
        return (
          <div key={`category-container-${i}`} className="category-container">
            <img
              className="category-img"
              src={require(`../images/categories/${item.name}.jpg`)}
              alt={`item.name`}
              onClick={() => {
                const array = [];

                for (let i = 0; i < products.length; i++) {
                  if (products[i].category === item.name) {
                    array.push(products[i]);
                  }
                }

                setCurrentProducts(array);
                history.push("shop");
              }}
            />
            <p className="category-name">{item.name}</p>
            <p className="category-quantity">{`Products: ${item.quantity}`}</p>
            <button
              onClick={() => {
                const array = [];

                for (let i = 0; i < products.length; i++) {
                  if (products[i].category === item.name) {
                    array.push(products[i]);
                  }
                }

                setCurrentProducts(array);
                history.push("shop");
              }}
              className="category-button"
            >
              More >
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
