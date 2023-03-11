import React, { useRef } from "react";
import { BsCreditCard2Back, BsCalendarEvent } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { makePayment } from "../../actions/paymentActions";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { uiTheme } = useSelector((state) => state.uiReducer);
  const { orderSummary, shippingDetails } = useSelector(
    (state) => state.currentOrderReducer
  );
  const { cart } = useSelector((state) => state.userReducer);
  const { user } = useSelector((state) => state.userReducer);

  const paymentBtnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      makePayment(
        paymentBtnRef,
        navigate,
        user.user,
        shippingDetails,
        cart,
        stripe,
        elements,
        CardNumberElement
      )
    );
  };

  return (
    <>
      <div className="payment-det-form-cnt">
        <div>
          <form className="form-conatiner" onSubmit={submitHandler}>
            <span className="form-header form-header-user">Card Details</span>

            <div className="auth-input-container">
              <span>
                <BsCreditCard2Back size={"1.4rem"} />
              </span>
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      color: uiTheme === "light" ? "#000" : "#fff",
                    },
                  },
                }}
                className={"payment-inputs"}
              />
            </div>

            <div className="auth-input-container">
              <span>
                <BsCalendarEvent size={"1.4rem"} />
              </span>
              <CardExpiryElement
                options={{
                  style: {
                    base: {
                      color: uiTheme === "light" ? "#000" : "#fff",
                    },
                  },
                }}
                className={"payment-inputs"}
              />
            </div>

            <div className="auth-input-container">
              <span>
                <MdPassword size={"1.4rem"} />
              </span>
              <CardCvcElement
                options={{
                  style: {
                    base: {
                      color: uiTheme === "light" ? "#000" : "#fff",
                    },
                  },
                }}
                className={"payment-inputs"}
              />
            </div>

            <button ref={paymentBtnRef} type="submit" className="btn-solid">
              Continue to pay ₹{orderSummary.total}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
