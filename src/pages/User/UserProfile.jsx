import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import Loader from "../../components/Loader/Loader";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.userReducer);
  const [joiningDate, setJoiningDate] = useState(null);

  useEffect(() => {
    if (user) {
      const jd = new Date(user.user.joiningDate);
      const day = jd.getDate();
      const month = jd.getMonth();
      const yr = jd.getFullYear();

      setJoiningDate(`${day}/${month}/${yr}`);
    }
  }, [dispatch, user]);

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
                      <span>{joiningDate}</span>
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
