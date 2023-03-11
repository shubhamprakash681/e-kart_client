import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userActions";
import "./usermenu.scss";

const UserMenu = ({ theme, userMenuRef }) => {
  const { windowSize } = useSelector((state) => state.uiReducer);
  const { isAuthenticatedUSer, user } = useSelector(
    (state) => state.userReducer
  );

  const dispatch = useDispatch();

  return (
    <>
      <div
        ref={userMenuRef}
        className={
          windowSize.innerWidth > 1020
            ? `user-menu-container ${theme}`
            : `${theme} user-menu-container-small`
        }
      >
        {isAuthenticatedUSer ? (
          <>
            {user && user.user.role === "admin" && (
              <>
                <Link className="btn-ghost" to={"/admin/dashboard"}>
                  AdminDashboard
                </Link>
              </>
            )}
            <Link className="btn-ghost" to={"/me/orders"}>
              My Orders
            </Link>

            <Link className="btn-ghost" to={"/me"}>
              Profile
            </Link>

            <button className="btn-ghost" onClick={(e) => dispatch(logout())}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn-ghost" to={"/login"}>
              Login
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default UserMenu;
