import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../actions/orderActions";
import Loader from "../../components/Loader/Loader";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { loading, myOrders } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <>
      <div className="all-orders-cont">
        {loading ? (
          <Loader />
        ) : (
          <>
            {myOrders && myOrders.orders && myOrders.orders.length > 0 ? (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Order Id</th>
                      <th>Status</th>
                      <th>Items count</th>
                      <th>Amount</th>
                      <th>View</th>
                    </tr>
                  </thead>

                  <tbody>
                    {myOrders.orders.map((order, index) => (
                      <tr key={index}>
                        <td>{order._id}</td>
                        <td>
                          <span className={`status capitalize status-green`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td>{order.orderItems.length}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          <Link to={`/me/orders/${order._id}`} className="link">
                            <button className="btn-ghost">View</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                <div className="all-order-empty">
                  <div>
                    <h3>You havent placed any order yet</h3>
                    <span>When you do, their status will appear here</span>
                    <div>
                      <Link to={"/products"} className="link">
                        <button className="btn-solid">Eplore Products</button>
                      </Link>
                    </div>
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

export default AllOrders;
