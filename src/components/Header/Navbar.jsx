import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { BiSearch } from "react-icons/bi";

import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import NavMenu from "./NavMenu";
import Cart from "../Cart/Cart";

import LogoFull from "../../assets/images/logo_full.png";
import LogoSmall from "../../assets/images/logo_small.png";

const Navbar = () => {
  const { uiTheme, windowSize, cartOpen } = useSelector(
    (state) => state.uiReducer
  );
  const { searchKeyword } = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchActive, setSearchActive] = useState(false);
  const [hamMenuOn, setHamMenuOn] = useState(false);
  const [hamUiTheme, setHamUiTheme] = useState(null);

  const [searchKey, setSearchKey] = useState(searchKeyword);

  const searchBoxRef = useRef();
  const hamMenuRef = useRef();

  useEffect(() => {
    if (uiTheme === "light") {
      setHamUiTheme("dark");
    } else if (uiTheme === "dark") {
      setHamUiTheme("light");
    }
  }, [uiTheme]);

  useEffect(() => {
    const handler = (e) => {
      if (searchBoxRef.current) {
        if (searchBoxRef.current.contains(e.target)) {
          // console.log("yes");
          setSearchActive(true);
        } else {
          // console.log("no");
          setSearchActive(false);
        }
      }

      if (hamMenuRef.current) {
        if (!hamMenuRef.current.contains(e.target)) {
          setHamMenuOn(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [dispatch]);

  useEffect(() => {
    const searchKeyHandler = (e) => {
      // console.log(e);
      if (e.key === "Enter") {
        // console.log(searchKey.trim());

        if (searchActive) {
          dispatch({
            type: "SET_SEARCH_KEYWORD",
            payload: searchKey.trim(),
          });
          navigate("/products");
        }
      }
    };

    document.addEventListener("keydown", searchKeyHandler);

    return () => {
      document.removeEventListener("keydown", searchKeyHandler);
    };
  });

  return (
    <>
      {/* {console.log("searchKey: ", searchKey)} */}
      <div className={`navbar-container ${uiTheme}`}>
        <Link className="link logo" to={"/"}>
          {windowSize.innerWidth > 1020 ? (
            <img src={LogoFull} alt="E-Kart" />
          ) : (
            <img src={LogoSmall} alt="E-Kart" id="logo-small" />
          )}
        </Link>

        <span
          className={
            searchActive
              ? "nav-srch-cont-lg nav-srch-cont-lg-active"
              : "nav-srch-cont-lg"
          }
        >
          <BiSearch className="search-icon" size={"25px"} />
          <input
            onChange={(e) => setSearchKey(e.target.value)}
            className={`${uiTheme}`}
            ref={searchBoxRef}
            type="search"
            name="search"
            id="search"
            placeholder="What are you looking for?.."
          />
        </span>

        {windowSize.innerWidth > 1020 ? (
          <>
            <span className="nav-right">
              <NavMenu theme={uiTheme} />
            </span>
          </>
        ) : (
          <>
            {!hamMenuOn && (
              <button
                onClick={() => {
                  setHamMenuOn(true);
                }}
                className="btn-outline ham-btn"
              >
                <GiHamburgerMenu size={"25px"} />
              </button>
            )}
            {hamMenuOn && (
              <>
                <button
                  onClick={() => {
                    setHamMenuOn(false);
                  }}
                  className="btn-outline ham-btn"
                >
                  <GrClose size={"25px"} />
                </button>
                <div
                  ref={hamMenuRef}
                  className={
                    uiTheme === "light" ? "ham-menu dark" : "ham-menu light"
                  }
                >
                  <NavMenu theme={hamUiTheme} small={true} />
                </div>
              </>
            )}
          </>
        )}
      </div>

      {cartOpen && <Cart />}
    </>
  );
};

export default Navbar;
