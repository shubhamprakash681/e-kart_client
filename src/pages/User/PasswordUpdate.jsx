import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsKey } from "react-icons/bs";
import { BiLowVision, BiLock, BiLockOpen } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { updatePassword } from "../../actions/userActions";
import Loader from "../../components/Loader/Loader";

const PasswordUpdate = () => {
  const dispatch = useDispatch();
  const { uiTheme } = useSelector((state) => state.uiReducer);
  const { pswdResetLoading } = useSelector((state) => state.userReducer);

  const [currPswdVisible, setCurrPswdVisible] = useState(false);
  const [pswdVisible, setPswdVisible] = useState(false);
  const [cnfPswdVisible, setCnfPswdVisible] = useState(false);

  const [data, setData] = useState({
    currPswd: null,
    pswd: null,
    cnfPswd: null,
  });

  const changeHandler = (e) => {
    const title = e.target.name;
    const value = e.target.value;

    setData({ ...data, [title]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (data.pswd && data.cnfPswd) {
      dispatch(updatePassword(data.currPswd, data.pswd, data.cnfPswd));
    }
  };

  return (
    <>
      {/* {console.log(data)} */}
      <div className={`user-cont ${uiTheme}`}>
        {pswdResetLoading ? (
          <Loader />
        ) : (
          <form
            onSubmit={submitHandler}
            className={`form-conatiner ${uiTheme} login-form`}
          >
            <span className="form-header form-header-user">
              Change Password
            </span>

            <div className={`auth-input-container`}>
              <span>
                <BsKey size={"1.4rem"} />
              </span>
              <input
                type={currPswdVisible ? "text" : "password"}
                name="currPswd"
                id="currPswd"
                required
                className={`${uiTheme}`}
                placeholder={"Current Password"}
                onChange={changeHandler}
              />

              <span className="btn-ghost">
                {currPswdVisible ? (
                  <BiLowVision
                    size={"1.4rem"}
                    onClick={() => setCurrPswdVisible(false)}
                  />
                ) : (
                  <AiOutlineEye
                    size={"1.4rem"}
                    onClick={() => setCurrPswdVisible(true)}
                  />
                )}
              </span>
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

            <button type="submit" className="btn-solid form-sub-btn ">
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default PasswordUpdate;
