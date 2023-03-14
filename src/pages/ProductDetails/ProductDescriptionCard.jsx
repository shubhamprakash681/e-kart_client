import React from "react";

const ProductDescriptionCard = ({ description, isReverse = false }) => {
  return (
    <>
      <div className="prod-des-card-cont">
        <h2>{description.title}</h2>

        <div className={isReverse ? "des-reverse" : ""}>
          {description.image && <img src={description.image.url} alt="img" />}

          <div className="prod-det-des-card-des">{description.description}</div>
        </div>
      </div>
    </>
  );
};

export default ProductDescriptionCard;
