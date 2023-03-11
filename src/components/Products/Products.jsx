import React from "react";
import "./product.scss";
import { useSelector } from "react-redux";
import ProductBox from "./ProductBox";

const Product = ({ featuredProductsRef }) => {
  const { uiTheme } = useSelector((state) => state.uiReducer);

  return (
    <>
      <div ref={featuredProductsRef} className={`product-container ${uiTheme}`}>
        <ProductBox />
      </div>
    </>
  );
};

export default Product;
