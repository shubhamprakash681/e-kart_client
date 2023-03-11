import React from "react";
import ReactStars from "react-rating-stars-component";
import Avatar from "../Avatar/Avatar";
import "./reviewCard.scss";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteProductReview } from "../../actions/Admin/adminProductActions";

const ReviewCard = ({ data, showDelete = false, productId = null }) => {
  const dispatch = useDispatch();

  const reviewDeleteHandler = () => {
    dispatch(deleteProductReview(data._id, productId));
  };

  return (
    <>
      <div className="rev-card-cont">
        {showDelete && (
          <div className="rev-delete-box">
            <span
              title="Delete this Review"
              className="btn-ghost status-red"
              onClick={reviewDeleteHandler}
            >
              <MdOutlineDeleteOutline size={"1.4rem"} />
            </span>
          </div>
        )}

        <div className="rev-av-con">
          <Avatar imgURI={data.userAvatar} size={"75px"} />

          <div>
            <h3>{data.name}</h3>
          </div>
        </div>

        <div className="rev-rating">
          <ReactStars
            value={data.rating}
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
        </div>

        {data.comment && <div className="review-comment">{data.comment}</div>}
      </div>
    </>
  );
};

export default ReviewCard;
