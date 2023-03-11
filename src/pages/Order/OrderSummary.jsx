import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { orderSummary } = useSelector((state) => state.currentOrderReducer);
  const navigate = useNavigate();

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      {orderSummary && (
        <>
          <div>
            <span>Subtotal: </span>
            <span>₹ {orderSummary.subtotal}</span>
          </div>

          <div>
            <span>Shipping Charges: </span>
            <span>₹ {orderSummary.shippingCharge}</span>
          </div>

          <div>
            <span>GST: </span>
            <span>₹ {orderSummary.gst}</span>
          </div>

          <div className="ord-sum-sep"></div>

          <div className="ord-sum-bot">
            <span>Total: </span>
            <span>₹ {orderSummary.total}</span>
          </div>
          <button
            className="btn-solid"
            onClick={() => {
              orderSummary && navigate("/payment");
            }}
          >
            Contine to payment
          </button>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
