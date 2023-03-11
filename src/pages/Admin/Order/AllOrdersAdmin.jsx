import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getAllOrdersAdmin,
} from "../../../actions/Admin/adminOrderActions";
import Loader from "../../../components/Loader/Loader";
import "./adminOrder.scss";
import noOrder from "../../../assets/images/noProduct.svg";
import { Link } from "react-router-dom";

const AllOrdersAdmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersAdmin());
  }, [dispatch]);

  const { loading, orders } = useSelector(
    (state) => state.adminReducer.allOrders
  );

  const statusClass = {
    processing: "status-red",
    shipped: "status-orange",
    delivered: "status-green",
  };

  return (
    <>
      <div className="all-orders-admin-cont">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1>All Orders</h1>

            {orders && orders.length > 0 ? (
              <>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Order Id</th>
                        <th>Status</th>
                        <th>Item Count</th>
                        <th>Order Amount</th>
                        <th>Process Order</th>
                        <th>Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td>{order._id}</td>
                          <td>
                            <span
                              className={`${
                                statusClass[order.orderStatus]
                              } status capitalize`}
                            >
                              {order.orderStatus}
                            </span>
                          </td>

                          <td>{order.orderItems.length}</td>
                          <td>{order.itemsPrice}</td>
                          <td>
                            <Link
                              className="link"
                              to={`/admin/order/process/${order._id}`}
                            >
                              <button className="btn-ghost">Process</button>
                            </Link>
                          </td>

                          <td>
                            <button
                              className="btn-ghost status-red"
                              onClick={(e) => dispatch(deleteOrder(order._id))}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="empty-store">
                  <img src={noOrder} alt="no-prod" />
                  <h3>No Orders as of now</h3>
                  <Link className="link" to={"/admin/product/create"}>
                    <button className="btn-solid">Add Product</button>
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllOrdersAdmin;
