import React from "react";
import { Link } from "react-router-dom";
import "./banner.scss";

const Banner = ({ viewFetProdBtnHandler }) => {
  return (
    <>
      <div className="banner-container">
        <div className="banner-item-cont">
          <div className="banner-tagline">
            <h1>Shop smarter with E-Kart</h1>
            <div>-Your one-stop online store</div>
          </div>
          <div className="banner-btn-box">
            <button onClick={viewFetProdBtnHandler} className="btn-solid">
              View Featured Products
            </button>
            <Link to="/products" className="link">
              <button className="btn-outline">Explore All Products</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
