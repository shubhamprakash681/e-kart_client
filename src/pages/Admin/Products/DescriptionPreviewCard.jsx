import React from "react";
import { MdOutlineDelete } from "react-icons/md";

const DescriptionPreviewCard = ({
  title = "Description Title",
  image,
  description = "Description",
  data,
  setData,
}) => {
  const deleteDescriptionHandler = (e) => {
    let desMod = [...data.productDescription].filter(
      (des) => des.title !== title
    );

    setData((currData) => {
      return {
        ...currData,
        productDescription: desMod,
      };
    });
  };

  return (
    <>
      <div className="des-prev-card-con">
        <div className="des-prev-head">
          <h3>{title}</h3>
          {image && <img src={image} alt="img" />}
          <button
            className="btn-ghost des-prev-del-btn"
            onClick={deleteDescriptionHandler}
          >
            <MdOutlineDelete />
          </button>
        </div>
        <div className="des-prev-des">{description}</div>
      </div>
    </>
  );
};

export default DescriptionPreviewCard;
