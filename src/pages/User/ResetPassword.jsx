import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

import { BiLockOpen, BiLowVision, BiLock } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordThroughToken } from "../../actions/userActions";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { pswdResetLoading, isAuthenticatedUSer } = useSelector(
    (state) => state.userReducer
  );
  const { uiTheme } = useSelector((state) => state.uiReducer);

  const [pswdVisible, setPswdVisible] = useState(false);
  const [cnfPswdVisible, setCnfPswdVisible] = useState(false);

  const [data, setData] = useState({
    password: null,
    confirmPassword: null,
  });

  const resetPswdHandler = (e) => {
    e.preventDefault();

    dispatch(resetPasswordThroughToken(data, params.token));
  };

  const changeHandler = (e) => {
    const title = e.target.name;
    const value = e.target.value;

    setData({ ...data, [title]: value });
  };

  return (
    <>
      {/* {console.log(data)} */}
      {/* {console.log(params)} */}
      {isAuthenticatedUSer && navigate("/")}

      <div className={`user-cont ${uiTheme}-sec`}>
        {pswdResetLoading ? (
          <Loader />
        ) : (
          <form
            onSubmit={resetPswdHandler}
            className={`form-conatiner ${uiTheme} login-form`}
          >
            <div className="fgt-form-header auth-input-container">
              <span className="form-header form-header-user">
                Reset Your Password
              </span>
            </div>

            <div className={`auth-input-container`}>
              <span>
                <BiLockOpen size={"1.4rem"} />
              </span>
              <input
                type={pswdVisible ? "text" : "password"}
                name="password"
                id="password"
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
                name="confirmPassword"
                id="confirmPassword"
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

            <button type="submit" className="btn-solid form-sub-btn ">
              Update Password
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
