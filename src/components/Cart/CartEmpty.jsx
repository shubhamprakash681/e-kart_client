import React from "react";
import EmptyCartSVG from "../../assets/cart/cart_empty.svg";

const CartEmpty = () => {
  return (
    <div className="cart-empty-cont">
      <div>
        <img src={EmptyCartSVG} alt="cart empty" />
        <h3>Empty</h3>
      </div>
    </div>
  );
};

export default CartEmpty;
