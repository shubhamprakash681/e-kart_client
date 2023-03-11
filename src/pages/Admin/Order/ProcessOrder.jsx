import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOrderDetailsAdmin,
  processOrder,
} from "../../../actions/Admin/adminOrderActions";
import Loader from "../../../components/Loader/Loader";
import OrderProdCard from "../../Order/OrderProdCard";

const statusClass = {
  processing: "status-red",
  shipped: "status-orange",
  delivered: "status-green",
};

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getOrderDetailsAdmin(params.id));
  }, [dispatch, params.id]);

  const { loading, order } = useSelector(
    (state) => state.adminReducer.currentOrderDetails
  );

  const [status, setStatus] = useState("");

  useEffect(() => {
    order && setStatus(order.orderStatus);
  }, [dispatch, order]);

  const submitHandler = (e) => {
    dispatch(processOrder(params.id, status));
  };

  return (
    <>
      <div className="order-det-cont">
        {loading ? (
          <Loader />
        ) : (
          <>
            {order && (
              <>
                <div className="order-det-id-cont">
                  <div className="order-id">Order #{order._id}</div>
                  <span
                    className={`order-status ${statusClass[order.orderStatus]}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div className="conf-ord-det-l-shipping">
                  <h2>Shipping Info</h2>

                  <div>
                    <span>Name: </span>
                    <span>{order.user.name}</span>
                  </div>

                  <div>
                    <span>Phone: </span>
                    <span>+91 {order.shippingDetails.phoneNo}</span>
                  </div>

                  <div>
                    <span>Address: </span>
                    <span className="conf-order-shipping-address">
                      {order.shippingDetails.address},{" "}
                      {order.shippingDetails.city},{" "}
                      {order.shippingDetails.state},{" "}
                      {order.shippingDetails.pinCode}, {"India"}
                    </span>
                  </div>
                </div>

                <div className="conf-ord-det-l-shipping">
                  <h2>Payment</h2>

                  <div>
                    {order.paymentInfo.status === "succeeded" ? (
                      <span className="status status-green">PAID</span>
                    ) : (
                      <span className="status status-red">FAILED</span>
                    )}
                  </div>

                  <div>
                    <span>Amount: </span>
                    <span>{order.totalPrice}</span>
                  </div>
                </div>

                <div className="conf-ord-det-l-shipping">
                  <h2>Process Order</h2>

                  <div className="process-option">
                    <select
                      name="status"
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option className="status-red" value="processing">
                        Processing
                      </option>
                      <option className="status-orange" value="shipped">
                        Ship Products
                      </option>
                      <option className="status-green" value="delivered">
                        Deliver
                      </option>
                    </select>

                    <button className="btn-solid" onClick={submitHandler}>
                      Submit
                    </button>
                  </div>
                </div>

                <div className="conf-ord-det-l-prods">
                  <h2>Order Items</h2>

                  <div>
                    {order.orderItems.map((item, index) => (
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

export default ProcessOrder;
