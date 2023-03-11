import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProdDetail_cart } from "../../actions/productActions";
import { accentColor } from "../../assets/ui";

const CartItem = ({ itemDetails }) => {
  const { uiTheme } = useSelector((state) => state.uiReducer);
  const { cart } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const incCount = async (e) => {
    const id = itemDetails.product._id;
    let newCart = [];

    dispatch(getProdDetail_cart(id))
      .then((data) => {
        if (itemDetails.count + 1 <= data.product.stock) {
          cart.forEach((item) => {
            if (item.product._id === id) {
              newCart.push({
                product: item.product,
                count: item.count + 1,
              });
            } else {
              newCart.push(item);
            }
          });

          dispatch({
            type: "UPDATE_CART",
            payload: newCart,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const decCont = (e) => {
    const id = itemDetails.product._id;
    let newCart = [];

    if (itemDetails.count > 1) {
      cart.forEach((item) => {
        if (item.product._id === id) {
          newCart.push({
            product: item.product,
            count: item.count - 1,
          });
        } else {
          newCart.push(item);
        }
      });

      dispatch({
        type: "UPDATE_CART",
        payload: newCart,
      });
    }
  };

  const removeFromCart = (e) => {
    let newCart = cart.filter(
      (item) => item.product._id !== itemDetails.product._id
    );

    dispatch({
      type: "UPDATE_CART",
      payload: newCart,
    });
  };

  return (
    <>
      {/* {console.log(itemDetails)} */}
      {itemDetails && (
        <div className={`cart-item-cont ${uiTheme}`}>
          <div className="cart-prod-img">
            <img src={itemDetails.product.images[0].url} alt="img" />
          </div>

          <div className="cart-prod-des-con">
            <div>{itemDetails.product.name}</div>
            <div className="cart-prod-price">
              Rs. {itemDetails.product.price}
            </div>
            <div className="cart-prod-btn-cont">
              <span id="cart-prod-btn" className={`cart-prod-count`}>
                <button className={`${uiTheme}`} onClick={decCont}>
                  -
                </button>
                <span>{itemDetails.count}</span>
                <button className={`${uiTheme}`} onClick={incCount}>
                  +
                </button>
              </span>
              <span id="cart-prod-rem" onClick={removeFromCart}>
                <button>
                  <AiOutlineCloseCircle
                    size={"1.6rem"}
                    color={`${accentColor}`}
                  />
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
