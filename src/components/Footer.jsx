import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "./ProductContext";
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { BiCopyright } from "react-icons/bi";
import "./Style.css";

const Footer = () => {
  const { activeUserState } = useContext(ProductContext);
  const [activeUser, setActiveUser] = activeUserState;

  return (
    <div className="footer bg-dark">
      <div className="pages">
        <div>
          <h1>PAGES</h1>
          <ul>
            <li>
              <Link to="/" style={{ color: "white" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-cars" style={{ color: "white" }}>
                Cars
              </Link>
            </li>
            <li>
              <Link to="/" style={{ color: "white" }}>
                About Us
              </Link>
            </li>
            {activeUser ? (
              <li>
                <Link to="/" style={{ color: "white" }}>
                  <span
                    onClick={() => {
                      sessionStorage.clear();
                      setActiveUser(null);
                    }}
                  >
                    Logout
                  </span>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" style={{ color: "white" }}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="contact">
        <div>
          <h1>CONTACT US</h1>
          <ul>
            <li>
              <BsFillTelephoneFill style={{ fontSize: "22px" }} /> Phone:
              +91 9786202244
            </li>
            <li>
              <HiOutlineMail style={{ fontSize: "26px" }} /> Email:
              activegopal@gmail.com
            </li>
            <li>
              <AiOutlineWhatsApp style={{ fontSize: "26px" }} /> Whatsapp:
              +91 9786202244
            </li>
          </ul>
        </div>
      </div>

      <div className="company">
        <div>
          <span>VEL</span>
          <br />
          <span>CARS</span>
          <p>
            Copyright <BiCopyright /> 2022
          </p>
          <p>150 B, ICL Quarry Road, Sankari West</p>
          <p>Namakkal - 637303</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
