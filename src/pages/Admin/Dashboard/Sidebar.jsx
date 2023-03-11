import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { RiProductHuntLine } from "react-icons/ri";
import { BsChevronDown, BsPlus, BsListTask } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { useSelector } from "react-redux";

const Sidebar = ({ setOpenSidebar }) => {
  const { uiTheme } = useSelector((state) => state.uiReducer);

  const [productExpand, setProductExpand] = useState(false);
  const [ordersExpand, setOrdersExpand] = useState(false);

  const clickHandler = () => {
    setOpenSidebar(false);
  };

  return (
    <>
      <span
        className="btn-solid"
        id="dash-side-close-btn"
        onClick={() => setOpenSidebar(false)}
      >
        <RxCross2 size={"1.4rem"} />
      </span>

      <div className="dash-side-cont">
        <Link className="link" to={"/admin/dashboard"} onClick={clickHandler}>
          <MdOutlineSpaceDashboard className={`${uiTheme}-col-only`} />
          <span className={`${uiTheme}-col-only`}>Dashboard</span>
        </Link>

        <span onClick={() => setProductExpand(!productExpand)}>
          {productExpand ? <BsChevronDown /> : <RiProductHuntLine />}
          <span>Products</span>
        </span>

        {productExpand && (
          <>
            <Link className="link dash-side-sub-menus" to={"/admin/products"}>
              <RiProductHuntLine className={`${uiTheme}-col-only`} />
              <span className={`${uiTheme}-col-only`}>All Products</span>
            </Link>

            <Link
              className="link dash-side-sub-menus"
              to={"/admin/product/create"}
            >
              <BsPlus className={`${uiTheme}-col-only`} />
              <span className={`${uiTheme}-col-only`}>Create</span>
            </Link>
          </>
        )}

        <span onClick={() => setOrdersExpand(!ordersExpand)}>
          {ordersExpand ? <BsChevronDown /> : <BsListTask />}
          <span>Orders</span>
        </span>

        {ordersExpand && (
          <>
            <Link className="link dash-side-sub-menus" to={"/admin/orders"}>
              <FaTasks className={`${uiTheme}-col-only`} />
              <span className={`${uiTheme}-col-only`}>All Orders</span>
            </Link>
          </>
        )}

        <Link className="link" to={"/admin/users"}>
          <HiOutlineUsers className={`${uiTheme}-col-only`} />
          <span className={`${uiTheme}-col-only`}>Users</span>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
