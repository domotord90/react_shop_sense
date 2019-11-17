import React, { useEffect } from "react";
import "../styles/Shop.css";

const Shop = ({
  currentProducts,
  setCurrentProducts,
  pageStart,
  setPageStart,
  pageLimit,
  setPageLimit,
  useHistory,
  setCurrentProduct,
  sorting,
  setSorting
}) => {
  const nextProducts = () => {
    setPageStart(pageStart + pageLimit);
  };

  const prevProducts = () => {
    setPageStart(pageStart - pageLimit);
  };

  const history = useHistory();

  const sortingFunction = value => {
    const array = [...currentProducts];
    switch (value) {
      case "alphAsc":
        array.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        break;
      case "alphDesc":
        array.sort((b, a) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        break;
      case "priceDesc":
        array.sort((a, b) => {
          const priceA = a.price;
          const priceB = b.price;

          return priceB - priceA;
        });
        break;
      case "priceAsc":
        array.sort((a, b) => {
          const priceA = a.price;
          const priceB = b.price;

          return priceA - priceB;
        });
        break;
      default:
        break;
    }
    setCurrentProducts(array);
  };

  useEffect(() => {
    sortingFunction(sorting);
    // eslint-disable-next-line
  }, [sorting]);

  const sortingOnChange = e => {
    const { value } = e.target;
    setSorting(value);
    setPageStart(0);
  };

  const pageLimitOnChange = e => {
    const { value } = e.target;
    setPageLimit(parseInt(value));
    setPageStart(0);
  };

  return (
    <div className="shop-main-container">
      <div className="category-sorting-container">
        <p className="sort-by-label">Sort by</p>
        <select className="sort-by" value={sorting} onChange={sortingOnChange}>
          <option value="alphAsc">Alphabetically, A-Z</option>
          <option value="alphDesc">Alphabetically, Z-A</option>
          <option value="priceDesc">Price, high to low</option>
          <option value="priceAsc">Price, low to high</option>
        </select>
      </div>
      <div className="products-container">
        {currentProducts
          .slice(pageStart, pageStart + pageLimit)
          .map((item, i) => {
            return (
              <div key={`product-container-${i}`} className="product-container">
                <img
                  className="product-img"
                  src={item.src}
                  alt={`${item.name}`}
                />
                <p className="product-name">{item.name}</p>
                <p className="product-price">{item.price}$</p>
                <p className="product-short-desc">{item.short_desc}</p>
                <button
                  className="product-button"
                  onClick={() => {
                    setCurrentProduct(item);
                    history.push("/product");
                  }}
                >
                  Select
                </button>
              </div>
            );
          })}
      </div>
      <p className="results">{`Showing ${pageStart + 1}-${
        pageStart + pageLimit > currentProducts.length
          ? currentProducts.length
          : pageStart + pageLimit
      } out of ${currentProducts.length} results`}</p>
      <div className="nav-products-container">
        {pageStart - pageLimit >= 0 && (
          <button className="nav-products-button" onClick={prevProducts}>
            Prev
          </button>
        )}
        {3 < currentProducts.length && (
          <select
            onChange={pageLimitOnChange}
            value={pageLimit}
            className="page-limit"
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        )}
        {pageStart + pageLimit <= currentProducts.length - 1 && (
          <button className="nav-products-button" onClick={nextProducts}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Shop;
