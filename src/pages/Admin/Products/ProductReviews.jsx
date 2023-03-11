import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductReviewsAdmin } from "../../../actions/Admin/adminProductActions";
import Loader from "../../../components/Loader/Loader";
import ReviewCard from "../../../components/Products/ReviewCard";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getProductReviewsAdmin(params.id));
  }, [dispatch, params.id]);

  const { loading, reviews } = useSelector(
    (state) => state.adminReducer.productReviews
  );

  return (
    <>
      <div className="admin-prod-rev-cont">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2>
              User Reviews for Product{" "}
              <Link className="link" to={`/product/${params.id}`}>
                <button className="btn-link">#{params.id}</button>
              </Link>
            </h2>

            {reviews && reviews.reviews && reviews.reviews.length > 0 ? (
              <div className="admin-prod-rev-box">
                {reviews.reviews.map((rev, index) => (
                  <div key={index}>
                    <ReviewCard
                      data={rev}
                      showDelete={true}
                      productId={reviews.productId}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="prod-det-empty-rev admin-prod-rev-empty">
                  <span>This Product has not been reviewed yet</span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProductReviews;
