import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../actions/orderActions";
import Loader from "../../components/Loader/Loader";
import OrderProdCard from "./OrderProdCard";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, currentOrders } = useSelector((state) => state.orderReducer);
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <div className="order-det-cont">
        {loading ? (
          <Loader />
        ) : (
          <>
            {currentOrders && currentOrders.order && (
              <>
                <div className="order-det-id-cont">
                  <div className="order-id">
                    Order #{currentOrders.order._id}
                  </div>
                  <span className="order-status status-orange">
                    {currentOrders.order.orderStatus}
                  </span>
                </div>

                <div className="conf-ord-det-l-shipping">
                  <h2>Shipping Info</h2>

                  <div>
                    <span>Name: </span>
                    <span>{user.user.name}</span>
                  </div>

                  <div>
                    <span>Phone: </span>
                    <span>
                      +91 {currentOrders.order.shippingDetails.phoneNo}
                    </span>
                  </div>

                  <div>
                    <span>Address: </span>
                    <span className="conf-order-shipping-address">
                      {currentOrders.order.shippingDetails.address},{" "}
                      {currentOrders.order.shippingDetails.city},{" "}
                      {currentOrders.order.shippingDetails.state},{" "}
                      {currentOrders.order.shippingDetails.pinCode}, {"India"}
                    </span>
                  </div>
                </div>

                <div className="conf-ord-det-l-shipping">
                  <h2>Payment</h2>

                  <div>
                    {currentOrders.order.paymentInfo.status === "succeeded" ? (
                      <span className="status status-green">PAID</span>
                    ) : (
                      <span className="status status-red">FAILED</span>
                    )}
                  </div>

                  <div>
                    <span>Amount: </span>
                    <span>{currentOrders.order.totalPrice}</span>
                  </div>
                </div>

                <div className="conf-ord-det-l-prods">
                  <h2>Order Items</h2>

                  <div>
                    {currentOrders.order.orderItems.map((item, index) => (
                      <OrderProdCard key={index} data={item} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
