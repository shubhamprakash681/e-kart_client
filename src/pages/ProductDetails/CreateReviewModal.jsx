import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { submitProdReview } from "../../actions/productActions";

const CreateReviewModal = ({ setOpenCreateRevModal }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    rating: null,
    comment: null,
  });

  const submitHandler = (e) => {
    dispatch(submitProdReview(params.id, data.rating, data.comment));

    setOpenCreateRevModal(false);
  };

  return (
    <>
      {/* {console.log(data)} */}
      <div className="create-rev-modal-cont">
        <div className={`create-rev-modal-inner`}>
          <h3>Review this product</h3>

          <ReactStars
            // value={productDet.rating}
            count={5}
            onChange={(e) => setData({ ...data, rating: e })}
            size={22}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ff5100"
          />

          <textarea
            id="rev-sub"
            name="review"
            rows={"6"}
            onChange={(e) => setData({ ...data, comment: e.target.value })}
          />

          <div className="create-rev-mod-bottom">
            <button
              className="btn-ghost create-rev-mod-close-btn"
              onClick={() => setOpenCreateRevModal(false)}
            >
              Close
            </button>
            <button className="btn-solid" onClick={submitHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReviewModal;
