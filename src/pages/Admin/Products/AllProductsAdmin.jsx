import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsAdmin,
} from "../../../actions/Admin/adminProductActions";
import Loader from "../../../components/Loader/Loader";
import "./allProducts.scss";
import noProduct from "../../../assets/images/noProduct.svg";
import { Link } from "react-router-dom";

const AllProductsAdmin = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.adminReducer);

  useEffect(() => {
    dispatch(getAllProductsAdmin());
  }, [dispatch]);

  return (
    <>
      <div className="admin-all-prod-container">
        {allProducts.loading ? (
          <Loader />
        ) : (
          <>
            <h1>All Products</h1>

            {allProducts.products &&
            allProducts.products.products.length > 0 ? (
              <>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Product Id</th>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Update</th>
                        <th>View Reviews</th>
                        <th>Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      {allProducts.products.products.map((prod, index) => (
                        <tr key={index}>
                          <td>{prod._id}</td>
                          <td>{prod.name}</td>
                          <td>
                            <span
                              className={
                                prod.stock >= 10
                                  ? "status-green prod-stock-status"
                                  : prod.stock >= 5
                                  ? "status-orange prod-stock-status"
                                  : "status-red prod-stock-status"
                              }
                            >
                              {prod.stock}
                            </span>
                          </td>
                          <td>{prod.price}</td>

                          <td>
                            <Link
                              className="link"
                              to={`/admin/product/update/${prod._id}`}
                            >
                              <button className="btn-ghost">Update</button>
                            </Link>
                          </td>

                          <td>
                            <Link
                              className="link"
                              to={`/admin/reviews/${prod._id}`}
                            >
                              <button className="btn-outline">View</button>
                            </Link>
                          </td>

                          <td>
                            <button
                              className="btn-ghost status-red"
                              onClick={(e) => dispatch(deleteProduct(prod._id))}
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
              <div className="empty-store">
                <img src={noProduct} alt="no-prod" />
                <h3>No Products in E-kart's Store</h3>
                <Link className="link" to={"/admin/product/create"}>
                  <button className="btn-solid">Add Product</button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllProductsAdmin;
