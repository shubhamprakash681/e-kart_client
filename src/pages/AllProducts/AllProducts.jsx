import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/Products/ProductCard";
import "./allProducts.scss";
import FilterBox from "./FilterBox";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../../components/Loader/Loader";
import ReactPaginate from "react-paginate";

const AllProducts = () => {
  const { windowSize } = useSelector((state) => state.uiReducer);
  const [openFilter, setOpenFilter] = useState(false);

  const { loading, products, totalProductCount, resultsPerPage } = useSelector(
    (state) => state.allProducts
  );

  const [currPage, setCurrPage] = useState(1);

  const handlePageClick = (e) => {
    // console.log(e);
    setCurrPage(Number(e.selected) + 1);
  };

  return (
    <>
      {/* {console.log(Math.ceil(totalProductCount / resultsPerPage))} */}
      <div className="all-product-container">
        {windowSize.innerWidth > 860 ? (
          <FilterBox setOpenFilter={setOpenFilter} currPage={currPage} />
        ) : (
          <>
            {openFilter && (
              <>
                {" "}
                <FilterBox
                  setOpenFilter={setOpenFilter}
                  currPage={currPage}
                />{" "}
                <div></div>{" "}
              </>
            )}
            {!openFilter && (
              <div className="open-fil-btn-div">
                <span onClick={() => setOpenFilter(true)}>
                  <AiOutlineArrowRight size={"2rem"} />{" "}
                </span>
              </div>
            )}
          </>
        )}

        <div className="all-prods-cont">
          <div className="all-prod-cont-top">
            <div className="all-prod-lab">
              <span>Products</span>
            </div>

            {loading ? (
              <>
                <div className="home-loader-cont">
                  <Loader />
                </div>
              </>
            ) : (
              <>
                {products && (
                  <>
                    {products.length > 0 ? (
                      <>
                        <div className="pr-cont all-prods">
                          {products.map((prod, index) => (
                            <ProductCard key={index} data={prod} />
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="no-prod-av">No Product</div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          <div id="all-prod-pag-cont">
            <span
              id="ract-paginate-holder"
              style={{
                overflowX: "auto",
              }}
            >
              <ReactPaginate
                activeClassName="react-paginate-selected-page"
                className="react-custom-paginate"
                pageCount={Math.ceil(totalProductCount / resultsPerPage)}
                nextLabel={"Next"}
                previousLabel={"Previous"}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                renderOnZeroPageCount={null}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
