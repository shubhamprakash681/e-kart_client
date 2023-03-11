import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { BiMoon, BiSun } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { MdLocalMall } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "../UserMenu/UserMenu";
import Avatar from "../Avatar/Avatar";

const NavMenu = ({ theme, small = false }) => {
  const dispatch = useDispatch();
  const { uiTheme, cartOpen, windowSize } = useSelector(
    (state) => state.uiReducer
  );
  const { user, cart } = useSelector((state) => state.userReducer);

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [userMenuTheme, setUserMenuTheme] = useState("");
  const userMenuRef = useRef();

  useEffect(() => {
    const userMenuMouseDownHandler = (e) => {
      if (userMenuRef.current) {
        if (!userMenuRef.current.contains(e.target)) {
          setOpenUserMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", userMenuMouseDownHandler);

    return () => {
      document.removeEventListener("mousedown", userMenuMouseDownHandler);
    };
  }, [dispatch]);

  useEffect(() => {
    uiTheme === "dark" && setUserMenuTheme("light");
    uiTheme === "light" && setUserMenuTheme("dark");
  }, [dispatch, uiTheme]);

  return (
    <>
      {uiTheme === "dark" ? (
        <button
          className="btn-ghost"
          onClick={() => {
            dispatch({ type: "CHANGE_UI_THEME", payload: "light" });
          }}
        >
          <BiSun size={"25px"} />
        </button>
      ) : (
        <button
          className="btn-ghost"
          onClick={() => {
            dispatch({ type: "CHANGE_UI_THEME", payload: "dark" });
          }}
        >
          <BiMoon size={"25px"} />
        </button>
      )}
      <Link className={small ? "btn-ghost" : "link"} to={"/"}>
        <span className={`${theme}-col-only`}>Home</span>
      </Link>
      <Link className={small ? "btn-ghost" : "link"} to={"/products"}>
        <span className={`${theme}-col-only`}>Products</span>
      </Link>
      <Link className={small ? "btn-ghost" : "link"} to={"/"}>
        <span className={`${theme}-col-only`}>Contact</span>
      </Link>
      <Link className={small ? "btn-ghost" : "link"} to={"/"}>
        <span className={`${theme}-col-only`}>About</span>
      </Link>
      <button
        className={small ? `btn-ghost ${uiTheme}` : `link ${uiTheme}`}
        id="nav-cart-btn"
        onClick={(e) => {
          if (windowSize.innerWidth <= 1020) {
            if (cartOpen) {
              dispatch({ type: "CLOSE_CART" });
            } else {
              dispatch({ type: "OPEN_CART" });
            }
          }
        }}
      >
        <span
          onClick={(e) => {
            if (windowSize.innerWidth > 1020) {
              if (cartOpen) {
                dispatch({ type: "CLOSE_CART" });
              } else {
                dispatch({ type: "OPEN_CART" });
              }
            }
          }}
          className={`${theme} nav-right-ic-cont`}
        >
          <MdLocalMall size={"35px"} />
        </span>
        {cart && (
          <span className={`cart-count ${theme}-col-only`}>{cart.length}</span>
        )}
      </button>

      <button
        className={small ? "btn-ghost" : "link"}
        to={"/"}
        onClick={() => setOpenUserMenu(!openUserMenu)}
      >
        <span className={`${theme} nav-right-ic-cont`}>
          {user && user.user.avatar.url ? (
            <Avatar imgURI={user.user.avatar.url} size={"35px"} />
          ) : (
            <RxAvatar size={"35px"} />
          )}
        </span>
      </button>

      {openUserMenu && (
        <UserMenu theme={userMenuTheme} userMenuRef={userMenuRef} />
      )}
    </>
  );
};

export default NavMenu;
