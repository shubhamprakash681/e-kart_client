import React from "react";
import { BsTruck } from "react-icons/bs";
import { BsCheck2Circle } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";

const OrderFLow = ({
  shipping = false,
  confirmOrder = false,
  payment = false,
}) => {
  return (
    <>
      <div className="order-flow-cont">
        <div className={`${shipping ? "order-flow-active" : ""}`}>
          <div>
            <BsTruck size={"1.4rem"} />
          </div>
          Shipping Details
        </div>

        <span></span>
        <div className={`${confirmOrder ? "order-flow-active" : ""}`}>
          <div>
            <BsCheck2Circle size={"1.4rem"} />
          </div>
          Confirm Order
        </div>

        <span></span>
        <div className={`${payment ? "order-flow-active" : ""}`}>
          <div>
            <MdOutlinePayment size={"1.4rem"} />
          </div>
          Payment
        </div>
      </div>
    </>
  );
};

export default OrderFLow;
