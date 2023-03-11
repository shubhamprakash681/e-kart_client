import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./order.scss";
import OrderFLow from "./OrderFLow";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineLocationCity } from "react-icons/md";
import { BiLocationPlus } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { GoGlobe } from "react-icons/go";
import { FaWalking } from "react-icons/fa";
import { allStates } from "../../assets/Order/states";
import { useNavigate } from "react-router-dom";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uiTheme } = useSelector((state) => state.uiReducer);

  const shippingDetails_loc_storage = JSON.parse(
    localStorage.getItem("e-kart-shipping-details")
  );
  const [shippingDetails, setShippingDetails] = useState({
    address:
      shippingDetails_loc_storage && shippingDetails_loc_storage.address
        ? shippingDetails_loc_storage.address
        : "",
    city:
      shippingDetails_loc_storage && shippingDetails_loc_storage.city
        ? shippingDetails_loc_storage.city
        : "",
    pinCode:
      shippingDetails_loc_storage && shippingDetails_loc_storage.pinCode
        ? shippingDetails_loc_storage.pinCode
        : "",
    phoneNo:
      shippingDetails_loc_storage && shippingDetails_loc_storage.phoneNo
        ? shippingDetails_loc_storage.phoneNo
        : "",
    country:
      shippingDetails_loc_storage && shippingDetails_loc_storage.country
        ? shippingDetails_loc_storage.country
        : "",
    state:
      shippingDetails_loc_storage && shippingDetails_loc_storage.state
        ? shippingDetails_loc_storage.state
        : "",
  });

  const changeHandler = (e) => {
    const label = e.target.name;
    const value = e.target.value;

    setShippingDetails({ ...shippingDetails, [label]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch({
      type: "UPDATE_SHIPPING_DETAIL",
      payload: shippingDetails,
    });

    navigate("/order/confirm");
  };

  return (
    <>
      {/* {console.log(shippingDetails)} */}
      <div className="shipping-container">
        <OrderFLow shipping />

        <div className="shipping-form-cont">
          <form className="form-conatiner" onSubmit={submitHandler}>
            <span className="form-header form-header-user">
              Shipping Details
            </span>

            <div className={`auth-input-container`}>
              <span>
                <AiOutlineHome size={"1.4rem"} />
              </span>
              <input
                value={shippingDetails.address}
                type="text"
                name="address"
                id="address"
                className={`${uiTheme}`}
                required
                placeholder={"Address"}
                onChange={changeHandler}
              />
            </div>

            <div className={`auth-input-container`}>
              <span>
                <MdOutlineLocationCity size={"1.4rem"} />
              </span>
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                id="city"
                className={`${uiTheme}`}
                required
                placeholder={"City"}
                onChange={changeHandler}
              />
            </div>

            <div className={`auth-input-container`}>
              <span>
                <BiLocationPlus size={"1.4rem"} />
              </span>
              <input
                type="text"
                name="pinCode"
                id="pinCode"
                value={shippingDetails.pinCode}
                className={`${uiTheme}`}
                required
                placeholder={"Pin Code"}
                onChange={changeHandler}
              />
            </div>

            <div className={`auth-input-container`}>
              <span>
                <BsTelephone size={"1.4rem"} />
              </span>
              <input
                type={"tel"}
                name="phoneNo"
                value={shippingDetails.phoneNo}
                id="phoneno"
                className={`${uiTheme}`}
                required
                placeholder={"Phone Number"}
                onChange={changeHandler}
              />
            </div>

            <div className={`auth-input-container`}>
              <span>
                <GoGlobe size={"1.4rem"} />
              </span>
              <select
                name="country"
                id="country"
                value={shippingDetails.country}
                className={`${uiTheme} cus-select`}
                required
                placeholder={"Country"}
                onChange={changeHandler}
              >
                <option value={""} className={"cus-select-options"}>
                  Country
                </option>
                <option value={"IN"} className={"cus-select-options"}>
                  India
                </option>
              </select>
            </div>

            <div className={`auth-input-container`}>
              <span>
                <FaWalking size={"1.4rem"} />
              </span>
              <select
                name="state"
                id="state"
                value={shippingDetails.state}
                className={`${uiTheme} cus-select`}
                required
                placeholder={"State"}
                onChange={changeHandler}
              >
                {allStates.map((it, index) => (
                  <option
                    value={it.value}
                    className={"cus-select-options"}
                    key={index}
                  >
                    {it.label}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-outline">
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingPage;
