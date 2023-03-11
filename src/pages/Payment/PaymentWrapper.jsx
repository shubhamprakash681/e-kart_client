import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import OrderFLow from "../Order/OrderFLow";
import Payment from "./Payment";

const PaymentWrapper = () => {
  const stripeKey = process.env.REACT_APP_URI_STRIPE_PUBLISH_KEY;

  return (
    <>
      <div className="payment-page-cont">
        <OrderFLow payment />

        {stripeKey && (
          <Elements stripe={loadStripe(stripeKey)}>
            <Payment />
          </Elements>
        )}
      </div>
    </>
  );
};

export default PaymentWrapper;
