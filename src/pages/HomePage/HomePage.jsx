import React, { useRef } from "react";
import Banner from "../../components/layout/Banner/Banner";
import Product from "../../components/Products/Products";

const HomePage = () => {
  const featuredProductsRef = useRef(null);

  const viewFetProdBtnHandler = (e) => {
    featuredProductsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <>
      <Banner viewFetProdBtnHandler={viewFetProdBtnHandler} />
      <Product featuredProductsRef={featuredProductsRef} />
    </>
  );
};

export default HomePage;
