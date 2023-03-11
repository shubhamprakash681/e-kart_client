import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiFace } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import "./user.scss";
import Avatar from "../../components/Avatar/Avatar";
import { updateProfile } from "../../actions/userActions";
import Loader from "../../components/Loader/Loader";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { uiTheme } = useSelector((state) => state.uiReducer);
  const { user, isAuthenticatedUSer, loading } = useSelector(
    (state) => state.userReducer
  );

  const [data, setData] = useState({
    name: isAuthenticatedUSer ? user.user.name : "",
    email: isAuthenticatedUSer ? user.user.email : "",
    avatarURL: isAuthenticatedUSer ? user.user.avatar.url : "",
    avatar: null,
  });

  const changeHandler = (e) => {
    const title = e.target.name;
    let value = e.target.value;

    if (title === "avatar") {
      value = e.target.files[0];

      setData({
        ...data,
        [title]: value,
        avatarURL: URL.createObjectURL(value),
      });
    } else {
      setData({ ...data, [title]: value });
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ ...data }));
  };

  return (
    <>
      {/* {console.log(data)} */}
      <div className={`user-cont ${uiTheme}`}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <form
              className={`form-conatiner ${uiTheme} login-form`}
              onSubmit={updateHandler}
            >
              <span className="form-header form-header-user">
                Update Profile
              </span>

              <div className={`auth-input-container`}>
                <span>
                  <BiFace size={"1.4rem"} />
                </span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={data.name}
                  className={`${uiTheme}`}
                  required
                  placeholder={"Name"}
                  onChange={changeHandler}
                />
              </div>

              <div className={`auth-input-container`}>
                <span>
                  <AiOutlineMail size={"1.4rem"} />
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={data.email}
                  className={`${uiTheme}`}
                  placeholder={"Email"}
                  onChange={changeHandler}
                />
              </div>
              <div className={`auth-input-container`}>
                <span>
                  {/* insert user avatar here */}
                  <Avatar
                    imgURI={
                      data.avatarURL
                        ? data.avatarURL
                        : "https://res.cloudinary.com/dfoi3evcp/image/upload/v1671681038/samples/people/boy-snow-hoodie.jpg"
                    }
                    size={"40px"}
                  />
                </span>
                <input
                  className="custom-file-input"
                  placeholder="Avatar"
                  type="file"
                  accept="image/*"
                  name="avatar"
                  id="avatar"
                  title="Profile Pic"
                  onChange={changeHandler}
                />
              </div>

              <button type="submit" className="btn-solid form-sub-btn ">
                Update Profile
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default UpdateProfile;
