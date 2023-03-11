import React, { useState } from "react";
import "./dashboard.scss";
import Sidebar from "./Sidebar";
import { BsArrowRight } from "react-icons/bs";

const OpenSidebarBtn = ({ setOpenSidebar }) => {
  return (
    <>
      <span
        className="btn-solid"
        id="dash-side-open-btn"
        onClick={() => setOpenSidebar(true)}
      >
        <BsArrowRight />
      </span>
    </>
  );
};

const Dashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <div className={`dashboard-constainer`}>
        {openSidebar ? (
          <Sidebar setOpenSidebar={setOpenSidebar} />
        ) : (
          <>
            <OpenSidebarBtn setOpenSidebar={setOpenSidebar} />

            <div className={`dash-content-holder`}>HI</div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
