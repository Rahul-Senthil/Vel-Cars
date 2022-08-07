import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "./ProductContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
const Navbar = () => {
  const { allProductsState, activeUserState } = useContext(ProductContext);
  const [allProducts] = allProductsState;
  const [activeUser, setActiveUser] = activeUserState;
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };
  return (
    // <div>
    //   <ul>
    //     <li>
    //       <Link to="/">Home</Link>
    //     </li>
    //     <li>
    //       <Link to="/all-cars">Cars</Link>
    //     </li>
    //     {activeUser?
    //       activeUser.isAdmin?(
    //       <li>
    //         <Link to="/dashboard">Dashboard</Link>
    //       </li>
    //     ) : (
    //       <li>
    //         <Link to="/wishlist">Wishlist</Link>
    //       </li>
    //     ): ""}
    //     {activeUser ? (
    //       <li>
    //         <Link to="/">
    //           <span
    //             onClick={() => {
    //               sessionStorage.clear();
    //               setActiveUser(null);
    //             }}
    //           >
    //             Logout ({activeUser.username})
    //           </span>
    //         </Link>
    //       </li>
    //     ) : (
    //       <li>
    //         <Link to="/login">Login</Link>
    //       </li>
    //     )}
    //     <br />
    //     <hr />
    //   </ul>
    // </div>
    <div>
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark ">
        <Link className="navbar-brand nav_left" to="/">
          <span>VEL</span>
          <br />
          <span>CARS</span>
        </Link>
        <button
          class="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNavAltMarkup"
        >
          <ul className="navbar-nav ms-auto nav_space">
            <li>
              <Link
                class="nav-item nav-link nav_item"
                id="navbar-fnt"
                onClick={handleNavCollapse}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                class="nav-item nav-link nav_item"
                id="navbar-fnt"
                onClick={handleNavCollapse}
                to="/all-cars"
              >
                Cars
              </Link>
            </li>
            <li>
              <Link
                class="nav-item nav-link nav_item"
                id="navbar-fnt"
                onClick={handleNavCollapse}
                to="/about-us"
              >
                About
              </Link>
            </li>
            {activeUser && (
              activeUser.isAdmin ? (
                <li>
                  <Link
                    class="nav-item nav-link nav_item"
                    id="navbar-fnt"
                    onClick={handleNavCollapse}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    class="nav-item nav-link nav_item"
                    id="navbar-fnt"
                    onClick={handleNavCollapse}
                    to="/wishlist"
                  >
                    Wishlist
                  </Link>
                </li>
                
              )
            )}
            {activeUser && !activeUser.isAdmin && (
              <li>
              <Link
                class="nav-item nav-link nav_item"
                id="navbar-fnt"
                onClick={handleNavCollapse}
                to="/user-profile"
              >
                Profile
              </Link>
            </li>
            )}
            {activeUser ? (
              <li>
                <Link
                  class="nav-item nav-link nav_item"
                  id="navbar-fnt"
                  onClick={handleNavCollapse}
                  to="/"
                >
                  <span
                    onClick={() => {
                      sessionStorage.clear();
                      setActiveUser(null);
                    }}
                  >
                    {/* Logout ({activeUser.username}) */}
                    Logout
                  </span>
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  class="nav-item nav-link nav_item"
                  id="navbar-fnt"
                  onClick={handleNavCollapse}
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
            <br />
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
