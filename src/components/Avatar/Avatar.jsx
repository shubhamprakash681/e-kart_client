import React from "react";
import "./avatar.scss";

const Avatar = ({ imgURI, size = "100px" }) => {
  return (
    <div className="avatar-container">
      <img src={imgURI} alt="avatar" width={size} height={size} />
    </div>
  );
};

export default Avatar;
