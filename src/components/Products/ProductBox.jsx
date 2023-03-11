import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const ProductBox = ({ prodCateg = "Featured Products" }) => {
  const { loading, products } = useSelector(
    (state) => state.allProducts.featuredProducts
  );

  return (
    <>
      <div className="product-box-cont">
        <span>
          <h1>{prodCateg}</h1>
        </span>

        {loading ? (
          <>
            <div className="home-loader-cont">
              <Loader />
            </div>
          </>
        ) : (
          <>
            {products && products.length > 0 ? (
              <>
                <div className="pr-cont">
                  {products &&
                    products.map((prod, index) => (
                      <ProductCard key={index} data={prod} />
                    ))}
                </div>
              </>
            ) : (
              <>
                <div className="fet-prod-empty">
                  <span>No Featured Products Currently</span>
                  <Link className="link" to={"/products"}>
                    <button className="btn-solid">Explore All Products</button>
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProductBox;
