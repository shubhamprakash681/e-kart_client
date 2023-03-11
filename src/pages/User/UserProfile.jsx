import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import Loader from "../../components/Loader/Loader";

const UserProfile = () => {
  const { user, loading } = useSelector((state) => state.userReducer);
  return (
    <>
      <div className="user-prof-cont">
        {loading ? (
          <Loader />
        ) : (
          <>
            {user && (
              <>
                <div className="user-prof-det">
                  <h1>Profile</h1>
                  <Avatar imgURI={user.user.avatar.url} size={"200px"} />

                  <div className="det-box">
                    <div className="user-prof-com">
                      <h2>Name: </h2>
                      <span>{user.user.name}</span>
                    </div>

                    <div className="user-prof-com">
                      <h2>Email: </h2>
                      <span>{user.user.email}</span>
                    </div>

                    <div className="user-prof-com">
                      <h2>Joined On: </h2>
                      <span>{user.user.name}</span>
                    </div>
                  </div>

                  <div className="prof-btn-cont">
                    <Link className="btn-solid link" to={"/me/update"}>
                      Update Profile
                    </Link>
                    <Link className="btn-outline link" to={"/password/update"}>
                      Change Password
                    </Link>
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

export default UserProfile;
