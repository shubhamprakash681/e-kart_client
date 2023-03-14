import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProductDetail } from "../../actions/productActions";
import Loader from "../../components/Loader/Loader";
import ReviewCard from "../../components/Products/ReviewCard";
import CreateReviewModal from "./CreateReviewModal";
import ProductDescriptionCard from "./ProductDescriptionCard";
import "./productDetails.scss";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { uiTheme } = useSelector((state) => state.uiReducer);
  const { loading, productDet } = useSelector((state) => state.prodDetail);
  const { cart } = useSelector((state) => state.userReducer);

  const params = useParams();

  const [isProdAvailableInCart, setIsProdAvailableInCart] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(1);

  const [openCreateRevModal, setOpenCreateRevModal] = useState(false);

  useEffect(() => {
    dispatch(getProductDetail(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (productDet) {
      const res = cart.find((item) => item.product._id === productDet._id);
      if (!res) {
        setIsProdAvailableInCart(false);
      } else {
        setIsProdAvailableInCart(true);
      }
    }
  }, [dispatch, params.id, cart, productDet]);

  const cartCountInc = (e) => {
    if (cartItemCount + 1 <= productDet.stock) {
      setCartItemCount(cartItemCount + 1);
    }
  };
  const cartCountDec = (e) => {
    if (cartItemCount > 1) {
      setCartItemCount(cartItemCount - 1);
    }
  };

  const addToCart = (e) => {
    dispatch({
      type: "ADD_CART_SUC_FAIL",
      payload: {
        product: productDet,
        count: cartItemCount,
      },
    });

    toast.success("Item added to cart", {
      toastId: `${productDet._id}-added-to-cart`,
      position: "bottom-center",
    });
  };

  return (
    <>
      {loading ? (
        <>
          <div className="home-loader-cont">
            <Loader />
          </div>
        </>
      ) : (
        <>
          {/* {console.log(productDet)} */}
          {productDet && (
            <div className="prod-det-page">
              <div className={`prod-det ${uiTheme}-sec`}>
                <div>
                  <Carousel
                    autoPlay
                    interval={4000}
                    transitionTime={2000}
                    infiniteLoop
                    showArrows={false}
                    emulateTouch
                    showThumbs={false}
                    width={"400px"}
                  >
                    {productDet.images.map((img, index) => (
                      <div key={index}>
                        <img src={img.url} alt="img" />
                      </div>
                    ))}
                  </Carousel>
                </div>

                <div className="prod-det-right-cont">
                  <div>
                    <div>
                      <h2>{productDet.name}</h2>
                      <span>Product # {productDet._id}</span>
                    </div>

                    <div className="prod-det-rating sep-border">
                      <ReactStars
                        value={productDet.rating}
                        edit={false}
                        count={5}
                        // onChange={ratingChanged}
                        size={22}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ff5100"
                      />
                      <span>{productDet.numberOfReviews} Reviews</span>
                    </div>

                    <div className="prod-det-p-c">
                      <h1>₹ {productDet.price}</h1>
                      <div>
                        <span className="add-cart-count">
                          <span
                            className="add-cart-count-btn"
                            onClick={cartCountDec}
                          >
                            -
                          </span>
                          <span>{cartItemCount}</span>
                          <span
                            className="add-cart-count-btn"
                            onClick={cartCountInc}
                          >
                            +
                          </span>
                        </span>
                        {isProdAvailableInCart ? (
                          <span className="added-to-cart-label">
                            Added to cart
                          </span>
                        ) : (
                          <button
                            className="btn-solid add-cart-btn "
                            onClick={addToCart}
                          >
                            Add to cart
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="sep-border status-cont">
                      {"Status: "}
                      {productDet.stock && productDet.stock > 0 ? (
                        <>
                          {productDet.stock > 10 ? (
                            <>
                              <span className="stock-st-instock">In Stock</span>
                            </>
                          ) : (
                            <>
                              <span className="stock-st-less">
                                Hurry! Only {productDet.stock} items left
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <span className="stock-st-outstock">
                            Product out of stock
                          </span>
                        </>
                      )}
                    </div>

                    <div className="prod-det-des">
                      <button
                        onClick={() => setOpenCreateRevModal(true)}
                        className="btn-outline"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="prod-det-des-cont">
                <div className="prod-det-rev-lab-con">
                  <span className="prod-det-rev-lab">Product Description</span>
                </div>

                {productDet.productDescription &&
                  productDet.productDescription.map((des, index) => (
                    <ProductDescriptionCard
                      key={index}
                      description={des}
                      isReverse={index % 2 !== 0}
                    />
                  ))}
              </div>

              <div className="prod-det-rev-cont">
                <div className="prod-det-rev-lab-con">
                  <span className="prod-det-rev-lab">Product Reviews</span>
                </div>

                <div className="prod-rev-box">
                  {productDet.reviews.length > 0 ? (
                    <>
                      {productDet.reviews.map((rev, index) => (
                        <ReviewCard key={index} data={rev} />
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="prod-det-empty-rev">
                        This Product has not been reviewed yet.
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {openCreateRevModal && (
            <CreateReviewModal setOpenCreateRevModal={setOpenCreateRevModal} />
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
