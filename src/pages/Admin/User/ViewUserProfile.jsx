import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetailsAdmin } from "../../../actions/Admin/adminUserActions";
import Avatar from "../../../components/Avatar/Avatar";
import Loader from "../../../components/Loader/Loader";

const ViewUserProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [joiningDate, setJoiningDate] = useState(null);

  const { loading, user } = useSelector(
    (state) => state.adminReducer.userDetail
  );

  useEffect(() => {
    dispatch(getUserDetailsAdmin(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (user) {
      const jd = new Date(user.joiningDate);
      const day = jd.getDate();
      const month = jd.getMonth();
      const yr = jd.getFullYear();

      setJoiningDate(`${day}/${month}/${yr}`);
    }
  }, [dispatch, user, params.id]);

  return (
    <div className="user-prof-cont">
      {loading ? (
        <Loader />
      ) : (
        <>
          {user && (
            <>
              <div className="user-prof-det">
                <h1>Profile</h1>
                <Avatar imgURI={user.avatar.url} size={"200px"} />

                <div className="det-box">
                  <div className="user-prof-com">
                    <h2>Name: </h2>
                    <span>{user.name}</span>
                  </div>

                  <div className="user-prof-com">
                    <h2>Email: </h2>
                    <span>{user.email}</span>
                  </div>

                  <div className="user-prof-com">
                    <h2>Joined On: </h2>
                    <span>{joiningDate}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ViewUserProfile;
