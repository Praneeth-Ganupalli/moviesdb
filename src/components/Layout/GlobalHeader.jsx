import React, { useRef, useState } from "react";
import "./GlobalHeader.css";
import { useDispatch } from "react-redux";
import { triggerSearch } from "../../store";
import { NavLink,useLocation,useNavigate } from "react-router-dom";
import {MdFavorite} from "react-icons/md";
import {BsPlayBtnFill} from "react-icons/bs"
import {RxHamburgerMenu} from "react-icons/rx"
function GlobalHeader() {
  const searchInputRef = useRef(null);
  const location=useLocation();
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const searchSubmitHandler = (event) => {
    event.preventDefault();
    const searchValue = searchInputRef.current.value;
    if (!searchValue) {
      searchInputRef.current.focus();
      return;
    }
    dispatch(triggerSearch(searchValue));
    searchInputRef.current.value = "";
    searchInputRef.current.blur();
    if(location.pathname!=="/" || location.pathname!=="/browse")
    {
      navigate("/");
    }
    
  };
  const [showHeader,setShowHeader]=useState(false);
  const myCustomClass=showHeader?"custom-collapse":"";
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light box-shadow">
        <NavLink className="navbar-brand ms-3" to="/">
          <h1 className="header-logo-text ms-3">Movieflix</h1>
        </NavLink>
          <span className="custom-toggler"  onClick={()=>{setShowHeader(prevState=>!prevState)}}> <RxHamburgerMenu className="me-4 text-secondary"/></span>
        <div className={`collapse navbar-collapse ${myCustomClass}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
             <NavLink to="/browse" className={(({isActive})=>isActive?"nav-link fw-bold text-secondary":"nav-link text-white fw-bold")} >Browse</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/favs"  className={(({isActive})=>isActive?"nav-link fw-bold text-warning":"nav-link text-white fw-bold")}>
                  Favourites <MdFavorite className="text-danger" />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/watchlist"  className={(({isActive})=>isActive?"nav-link fw-bold text-info":"nav-link text-white fw-bold")}>
                My WatchList
                <BsPlayBtnFill className="text-info ms-2 watchlist-icon" />
              </NavLink>
            </li>
          </ul>
          <div className="ms-auto me-3">
            <form onSubmit={searchSubmitHandler}>
              <div className="input-group">
                <input
                  type="text"
                  ref={searchInputRef}
                  className="form-control"
                  placeholder="Search Movies,Series.."
                  aria-label="Search Movies,Series.."
                  aria-describedby="Search Movies,Series.."
                />
                <button
                  className="btn btn-outline-light"
                  type="submit"
                  id="button-addon2"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default GlobalHeader;
