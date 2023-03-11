import React from "react";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { accentColor } from "../../assets/ui";

const OrderSuccessful = () => {
  const { uiTheme } = useSelector((state) => state.uiReducer);
  const { user } = useSelector((state) => state.userReducer);

  return (
    <>
      <div className="order-suc-cont">
        <div className={`${uiTheme} order-suc-inner`}>
          <MdOutlineCheckCircleOutline size={"3rem"} color={accentColor} />

          <div>Hey {user.user.name},</div>

          <h2>Your Order is Placed Successfully!</h2>

          <div>
            We'll send you shipping confirmation email as soon as your order
            ships.
          </div>

          <Link className="link" to={"/me/orders"}>
            <button className="btn-solid">View Orders</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderSuccessful;
