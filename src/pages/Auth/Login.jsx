import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./auth.scss";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { BiLowVision } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import Loader from "../../components/Loader/Loader";

const Login = () => {
  const { uiTheme } = useSelector((state) => state.uiReducer);
  const { loading, isAuthenticatedUSer } = useSelector(
    (state) => state.userReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pswdVisible, setPswdVisible] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    pswd: "",
  });

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(login({ ...loginData }));
  };

  const changeHandler = (e) => {
    const title = e.target.name;
    const value = e.target.value;

    setLoginData({ ...loginData, [title]: value });
  };

  useEffect(() => {
    isAuthenticatedUSer && navigate("/");
  }, [isAuthenticatedUSer, navigate]);

  return (
    <>
      {/* {console.log(loginData)} */}
      <div className={`auth-form-container ${uiTheme}-sec`}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <form
              onSubmit={loginHandler}
              className={`form-conatiner ${uiTheme} login-form `}
            >
              <span className="form-header">Login</span>

              <div className={`auth-input-container`}>
                <span>
                  <AiOutlineMail size={"1.4rem"} />
                </span>
                <input
                  value={loginData.email}
                  type="email"
                  name="email"
                  id="email"
                  className={`${uiTheme}`}
                  required
                  placeholder={"Email"}
                  onChange={changeHandler}
                />
              </div>

              <div className={`auth-input-container`}>
                <span>
                  <AiOutlineLock size={"1.4rem"} />
                </span>
                <input
                  type={pswdVisible ? "text" : "password"}
                  name="pswd"
                  value={loginData.pswd}
                  id="pswd"
                  className={`${uiTheme}`}
                  required
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

              <Link className="fgt-pswd-btn link" to={"/password/forgot"}>
                <button className="btn-ghost">Forgot Password?</button>
              </Link>

              <span className="change-auth-type">
                New User?{" "}
                <Link className="link" to={"/register"}>
                  <button className="btn-link">Register</button>
                </Link>
              </span>

              <button type="submit" className="btn-solid form-sub-btn ">
                Login
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
