import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Category.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios.get("https://test-api.edfa3ly.io/category");
      console.log(result.data);
      setCategories(result.data);
    })();
  }, []);

  return (
    <div className="container text-center head">
      <Link className="home-link" to="/">
        <h2>Our E-commerce store</h2>
      </Link>

      <p>choose one of our categories from below</p>
      <div className=" category">
        {categories.map((category) => (
          <Link
            className="category-link"
            to={`/product/${category.id}`}
            key={category.id}
          >
            <div className="card">
              <img
                src={category.image}
                className="card-img-top"
                alt={category.name}
              />
              <div className="card-body">
                <h5 className=" card-title">{category.name}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default Category;
