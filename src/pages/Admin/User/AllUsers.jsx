import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import "./users.scss";
import noUser from "../../../assets/images/noUser.svg";
import {
  deleteUser,
  getAllUsersAdmin,
  updateUserRole,
} from "../../../actions/Admin/adminUserActions";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { loading, users } = useSelector(
    (state) => state.adminReducer.allUsers
  );

  useEffect(() => {
    dispatch(getAllUsersAdmin());
  }, [dispatch]);

  const roleClass = {
    admin: "status-green status capitalize",
    user: "status-orange status capitalize",
  };

  return (
    <>
      <div className="all-users-cont">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1>All Users</h1>

            {users && users.length > 0 ? (
              <>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>View Profile</th>
                        <th>Change Role</th>
                        <th>Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={roleClass[user.role]}>
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <Link
                              className="link"
                              to={`/admin/user/${user._id}`}
                            >
                              <button className="btn-outline">View</button>
                            </Link>
                          </td>
                          <td>
                            {user.role === "admin" ? (
                              <button
                                className="btn-ghost status-orange"
                                onClick={() =>
                                  dispatch(updateUserRole(user, "user"))
                                }
                              >
                                Remove Admin Access
                              </button>
                            ) : (
                              <button
                                className="btn-ghost status-red"
                                onClick={() =>
                                  dispatch(updateUserRole(user, "admin"))
                                }
                              >
                                Make Admin
                              </button>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn-ghost status-red"
                              onClick={() => dispatch(deleteUser(user._id))}
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
                <img src={noUser} alt="no-prod" />
                <h3>No user in E-Kart</h3>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllUsers;
