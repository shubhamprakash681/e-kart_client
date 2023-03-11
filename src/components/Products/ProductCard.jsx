import React from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
  const { uiTheme } = useSelector((state) => state.uiReducer);

  return (
    <>
      {/* make product-card-container link */}
      <Link
        to={`/product/${data._id}`}
        className={`product-card-container link`}
      >
        <img src={data.images[0].url} alt="img" />
        <h2 className={`${uiTheme}`}>{data.name}</h2>
        <div>
          <ReactStars
            edit={false}
            count={5}
            size={22}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ff5100"
            value={data.rating}
          />
          <span className={`${uiTheme}`}>{data.numberOfReviews} ratings</span>
        </div>
        <h3 className="price-tag">{`₹ ${data.price}`}</h3>
      </Link>
    </>
  );
};

export default ProductCard;
