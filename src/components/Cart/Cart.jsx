import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cart.scss";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { uiTheme } = useSelector((state) => state.uiReducer);
  const { cart } = useSelector((state) => state.userReducer);
  const [subTotal, setSubTotal] = useState(
    (Math.round(0 * 100) / 100).toFixed(2)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartRef = useRef();

  const clearCart = (e) => {
    dispatch({
      type: "UPDATE_CART",
      payload: [],
    });
  };

  useEffect(() => {
    const handler = (e) => {
      if (cartRef.current) {
        if (!cartRef.current.contains(e.target)) {
          dispatch({ type: "CLOSE_CART" });
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [dispatch]);

  useEffect(() => {
    let priceSum = 0;
    cart.forEach((item) => {
      priceSum += item.product.price * item.count;
    });

    setSubTotal(Math.round((priceSum * 100) / 100).toFixed(2));
  }, [dispatch, cart]);

  return (
    <>
      <div ref={cartRef} className={`cart-container ${uiTheme}`}>
        <div className="cart-header">
          <button
            className="btn-ghost"
            onClick={(e) => dispatch({ type: "CLOSE_CART" })}
          >
            <BsArrowLeft size={"1.4rem"} />
          </button>

          <h2>Cart</h2>

          <button className="btn-outline" onClick={clearCart}>
            Clear{" "}
            <AiOutlineCloseCircle
              style={{
                marginLeft: "7px",
              }}
              size={"1.2rem"}
            />{" "}
          </button>
        </div>

        <div className="cart-items-cont">
          {cart.length === 0 ? (
            <CartEmpty />
          ) : (
            cart.map((item, index) => (
              <CartItem key={index} itemDetails={item} />
            ))
          )}
        </div>

        <div className="cart-lower">
          <div className="cart-subt-box">
            <span>Subtotal: </span>
            <span>Rs. {subTotal}</span>{" "}
          </div>
          <div className="cart-checkout-box">
            <button
              className="btn-solid"
              onClick={() => {
                dispatch({
                  type: "CLOSE_CART",
                });
                navigate("/shipping");
              }}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
