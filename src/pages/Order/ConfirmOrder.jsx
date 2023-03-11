import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderFLow from "./OrderFLow";
import OrderProdCard from "./OrderProdCard";
import OrderSummary from "./OrderSummary";
import { allStates } from "../../assets/Order/states";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => state.userReducer);
  const { shippingDetails } = useSelector((state) => state.currentOrderReducer);

  const [shippingState, setShippingState] = useState(null);

  useEffect(() => {
    const stateOption = allStates.filter(
      (state) => state.value === shippingDetails.state
    );

    setShippingState(stateOption[0]);
  }, [dispatch, shippingDetails]);

  useEffect(() => {
    let subtotal = 0;
    let shippingCharge = 0;

    cart.forEach((it) => (subtotal += it.product.price * it.count));

    let gst = Math.ceil(0.18 * subtotal);

    dispatch({
      type: "UPDATE_ORDER_SUMMARY",
      payload: {
        subtotal,
        shippingCharge,
        gst,
        total: Number(subtotal + gst + shippingCharge),
      },
    });
  }, [dispatch, cart]);

  return (
    <>
      <div className="conf-order-cont">
        <OrderFLow confirmOrder />

        <div className="conf-ord-det">
          <div className="conf-ord-det-l">
            <div className="conf-ord-det-l-shipping">
              <h2>Shipping Info</h2>

              <div>
                <span>Name: </span>
                <span>{user.user.name}</span>
              </div>

              <div>
                <span>Phone: </span>
                <span>+91 {shippingDetails.phoneNo}</span>
              </div>

              <div>
                <span>Address: </span>
                <span className="conf-order-shipping-address">
                  {shippingDetails.address && shippingDetails.address},{" "}
                  {shippingDetails.city && shippingDetails.city},{" "}
                  {shippingState && shippingState.label},{" "}
                  {shippingDetails.pinCode && shippingDetails.pinCode},{" "}
                  {"India"}
                </span>
              </div>
            </div>

            <div className="conf-ord-det-l-prods">
              <h2>Product Details</h2>

              <div>
                {cart.map((cartItem, index) => (
                  <OrderProdCard key={index} data={cartItem} />
                ))}
              </div>
            </div>
          </div>

          <div className="conf-ord-det-r">
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
