import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../../actions/userActions";
import Loader from "../../components/Loader/Loader";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { uiTheme } = useSelector((state) => state.uiReducer);
  const { pswdResetLoading } = useSelector((state) => state.userReducer);

  const [email, setEmail] = useState(null);

  const fgtPswdHand = (e) => {
    e.preventDefault();

    dispatch(getPasswordResetToken(email));
  };

  return (
    <>
      {/* {console.log(email)} */}
      <div className={`user-cont ${uiTheme}-sec`}>
        {pswdResetLoading ? (
          <Loader />
        ) : (
          <form
            onSubmit={fgtPswdHand}
            className={`form-conatiner ${uiTheme} login-form`}
          >
            <div className="fgt-form-header auth-input-container">
              <Link to={"/login"}>
                <button className="btn-ghost">
                  <AiOutlineArrowLeft size={"1.4rem"} />
                </button>
              </Link>
              <span className="form-header form-header-user">
                Password Recovery
              </span>
            </div>

            <div className={`auth-input-container`}>
              <span>
                <AiOutlineMail size={"1.4rem"} />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                className={`${uiTheme}`}
                required
                placeholder={"Email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-solid form-sub-btn ">
              Get Reset Link
            </button>
          </form>
        )}
      </div>
    </>
  );
};
