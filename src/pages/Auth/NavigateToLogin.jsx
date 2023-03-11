import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavigateToLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    navigate("/login");
  }, [dispatch, navigate]);

  return <></>;
};

export default NavigateToLogin;
