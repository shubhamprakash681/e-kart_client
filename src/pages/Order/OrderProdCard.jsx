import React from "react";
import { accentColor } from "../../assets/ui";

const OrderProdCard = ({ data }) => {
  return (
    <>
      {/* {console.log(data)} */}
      <div className="ord-prod-card-cont">
        <img src={data.product.images[0].url} alt="img" />

        <div>
          <span>{data.product.name}</span>
          <span>
            {data.count}*{data.product.price}
          </span>
          <span
            style={{
              color: accentColor,
            }}
          >
            Rs. {Number(Number(data.count) * Number(data.product.price))}
          </span>
        </div>
      </div>
    </>
  );
};

export default OrderProdCard;
