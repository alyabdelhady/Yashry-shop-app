import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { TwoThumbInputRange } from "react-two-thumb-input-range";
import "./Products.css";
import Category from "./../Category/Category";
function Products() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [price, setPrice] = useState([0, 1000]);
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColor] = useState([]);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState(null);
  const onValueSChange = (values) => {
    setPrice(values);
  };
  const handlePriceMin = (e) => {
    e.preventDefault();
    setPrice([e.target.value, price[1]]);
  };

  const handlePriceMax = (e) => {
    e.preventDefault();
    setPrice([price[0], e.target.value]);
  };
  const onCheckBox = (color) => {
    let selectedArray = selectedColors;
    if (selectedColors.indexOf(color) > -1) {
      selectedColors.splice(selectedColors.indexOf(color), 1);
    } else {
      selectedArray.push(color);
    }
    setSelectedColor(selectedArray);
    console.log(selectedColors);
  };

  const handleColor = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const result = await axios.get("https://test-api.edfa3ly.io/product");
      setProducts(result.data);
      const array = result.data.map((element) => element.color);
      const colorsSet = new Set(array);
      setColors(Array.from(colorsSet));
      // console.log(colors);
    })();
  }, [colors]);

  return (
    <div className="container-fluid products-list">
      <div className="row">
        <div className="col-lg-4">
          <div className="price-filter">
            <h6>Price range</h6>
            <div className="price-part1">
              <input
                type="number"
                placeholder="From"
                value={price[0]}
                onChange={handlePriceMin}
              />
              <input
                type="number"
                placeholder="To"
                value={price[1]}
                onChange={handlePriceMax}
              />
            </div>
            <div className="price-part2">
              <TwoThumbInputRange
                className="range"
                onChange={onValueSChange}
                values={price}
                min={0}
                max={1000}
              />
            </div>

            <button className="clear-price" onClick={() => setPrice([0, 1000])}>
              Clear &times;
            </button>
          </div>

          <div className="color-filter">
            <h6>Color</h6>
            <input
              type="search"
              onChange={handleColor}
              placeholder="Enter color"
            />
            <div>
              {colors
                .filter((color) => {
                  if (color.toLowerCase().includes(search.toLowerCase())) {
                    return color;
                  } else {
                    return null;
                  }
                })
                .map((color, i) => (
                  <div key={i}>
                    <input
                      type="checkbox"
                      value={color}
                      onClick={() => {
                        onCheckBox(color);
                      }}
                    />
                    <label>{color}</label>
                  </div>
                ))}
            </div>
          </div>
          <div className="rating-filter">
            <h6>Rating</h6>
            <div className="rate">
              {[1, 2, 3, 4, 5].map((elem, i) => (
                <div key={i} onClick={() => setRating(elem)}>
                  <span style={{ color: "gold" }}>
                    <i className={elem > 0 ? "fas fa-star" : "far fa-star"}></i>
                  </span>
                  <span style={{ color: "gold" }}>
                    <i className={elem > 1 ? "fas fa-star" : "far fa-star"}></i>
                  </span>
                  <span style={{ color: "gold" }}>
                    <i className={elem > 2 ? "fas fa-star" : "far fa-star"}></i>
                  </span>
                  <span style={{ color: "gold" }}>
                    <i className={elem > 3 ? "fas fa-star" : "far fa-star"}></i>
                  </span>
                  <span style={{ color: "gold" }}>
                    <i className={elem > 4 ? "fas fa-star" : "far fa-star"}></i>
                  </span>
                </div>
              ))}
              <button className="clear-rating" onClick={() => setRating(null)}>
                Clear &times;
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="row">
            {products
              .filter((product) => {
                if (
                  product.categoryId == id &&
                  (price[0] ? product.price > price[0] : true) &&
                  (price[1] ? product.price <= price[1] : true) &&
                  (selectedColors.length > 0
                    ? selectedColors.indexOf(product.color) > -1
                    : true) &&
                  (rating ? product.rating === rating : true)
                ) {
                  return product;
                }
              })
              .map((product) => (
                <div className="col-lg-6" key={product.id}>
                  <div className="card">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h4 className=" card-title">{product.name}</h4>
                      <hr />
                      <h5 style={{ color: `${product.color}` }}>
                        <i className="fas fa-circle"></i>
                        <span> {product.color}</span>
                      </h5>
                      <div className="price-rating">
                        <h6>
                          {product.price} <span>{product.currency}</span>
                        </h6>
                        <h6>
                          {[0, 1, 2, 3, 4].map((elem, i) =>
                            product.rating > elem ? (
                              <span key={i} style={{ color: "gold" }}>
                                <i className="fas fa-star"></i>
                              </span>
                            ) : (
                              <span key={i} style={{ color: "gold" }}>
                                <i className="far fa-star"></i>
                              </span>
                            )
                          )}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
