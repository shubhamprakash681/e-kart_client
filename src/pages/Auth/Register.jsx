import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BiFace, BiLowVision, BiLockOpen, BiLock } from "react-icons/bi";
import { AiOutlineMail, AiOutlineEye } from "react-icons/ai";
import Avatar from "../../components/Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../actions/userActions";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uiTheme } = useSelector((state) => state.uiReducer);
  const { isAuthenticatedUSer } = useSelector((state) => state.userReducer);

  const [pswdVisible, setPswdVisible] = useState(false);
  const [cnfPswdVisible, setCnfPswdVisible] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    pswd: "",
    cnfPswd: "",
    avatar: null,
    avatarBlob: null,
  });

  const registerHandler = (e) => {
    e.preventDefault();

    if (data.pswd && data.cnfPswd) {
      if (data.pswd === data.cnfPswd) {
        dispatch(register({ ...data }));
      } else {
        toast.error("Password and Confirm password must be same", {
          toastId: "pswd-cnf mismatch",
          position: "bottom-center",
        });
      }
    }
  };

  const changeHandler = (e) => {
    const title = e.target.name;
    let value = e.target.value;

    if (title === "avatar") {
      value = e.target.files[0];
      setData({
        ...data,
        [title]: value,
        avatarBlob: URL.createObjectURL(value),
      });
    } else {
      setData({ ...data, [title]: value });
    }
  };

  useEffect(() => {
    isAuthenticatedUSer && navigate("/");
  }, [isAuthenticatedUSer, navigate]);

  return (
    <>
      {/* {console.log(data)} */}
      <div className={`auth-form-container ${uiTheme}-sec`}>
        <form
          onSubmit={registerHandler}
          className={`form-conatiner ${uiTheme} login-form `}
        >
          <span className="form-header">Sign up</span>

          <div className={`auth-input-container`}>
            <span>
              <BiFace size={"1.4rem"} />
            </span>
            <input
              type="text"
              name="name"
              id="name"
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
              className={`${uiTheme}`}
              placeholder={"Email"}
              onChange={changeHandler}
            />
          </div>

          <div className={`auth-input-container`}>
            <span>
              <BiLockOpen size={"1.4rem"} />
            </span>
            <input
              type={pswdVisible ? "text" : "password"}
              name="pswd"
              id="pswd"
              required
              className={`${uiTheme}`}
              placeholder={"Password"}
              onChange={changeHandler}
            />

            <span className="btn-ghost">
              {pswdVisible ? (
                <BiLowVision
                  size={"1.4rem"}
                  onClick={() => setPswdVisible(false)}
                />
              ) : (
                <AiOutlineEye
                  size={"1.4rem"}
                  onClick={() => setPswdVisible(true)}
                />
              )}
            </span>
          </div>

          <div className={`auth-input-container`}>
            <span>
              <BiLock size={"1.4rem"} />
            </span>
            <input
              type={cnfPswdVisible ? "text" : "password"}
              name="cnfPswd"
              id="cnfPswd"
              className={`${uiTheme}`}
              required
              placeholder={"Confirm Password"}
              onChange={changeHandler}
            />

            <span className="btn-ghost">
              {cnfPswdVisible ? (
                <BiLowVision
                  size={"1.4rem"}
                  onClick={() => setCnfPswdVisible(false)}
                />
              ) : (
                <AiOutlineEye
                  size={"1.4rem"}
                  onClick={() => setCnfPswdVisible(true)}
                />
              )}
            </span>
          </div>

          <div className={`auth-input-container`}>
            <span>
              {/* insert user avatar here */}
              <Avatar
                imgURI={
                  data.avatarBlob
                    ? data.avatarBlob
                    : "https://res.cloudinary.com/dfoi3evcp/image/upload/v1678523355/e-kart/assets/man_fhanrx_fxzh2f.png"
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
              required
              title="Profile Pic"
              onChange={changeHandler}
            />
          </div>

          <span className="change-auth-type">
            Already registered?{" "}
            <Link className="link" to={"/login"}>
              <button className="btn-link">Login</button>
            </Link>
          </span>

          <button type="submit" className="btn-solid form-sub-btn ">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
