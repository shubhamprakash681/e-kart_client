import React from "react";
import { Link } from "react-router-dom";
import "./route-unavailable.scss";
import notFoundSVG from "../../../assets/images/pageNotFound.svg";

const NotFound = () => {
  return (
    <>
      <div className="not-found-container">
        <div className="not-found-inner">
          <img src={notFoundSVG} alt="404" />

          <h1>Page Not Found</h1>
          <Link className="link" to={"/"}>
            <button className="btn-outline">Back to Home</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
