import React from "react";
import aboutImg from "../images/login1.png";
import contactImg from "../images/Contactus.png";
import QR from "../images/qr.png";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { TbHeartHandshake } from "react-icons/tb";
import { IoCarSportSharp } from "react-icons/io5";
import { GiAchievement } from "react-icons/gi";
import { TbPhoneCall } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import Review from "./Review";
import toast, { Toaster } from "react-hot-toast";
import "./Style.css";

const About = () => {
  return (
    <div style={{ marginTop: "65px" }}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="admin-banner bg-dark">
        <span style={{ color: "#db2f69", marginRight: "30px" }}>ABOUT </span>
        US
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginTop: "50px",
        }}
      >
        <img src={aboutImg} alt="" className="about-img" />
        <div className="about-content">
          Vel Cars is a <span style={{color: "#db2f69"}}>refurbised</span> or <span style={{color: "#db2f69"}}>second-hand car</span> selling platform with many
          number of brands and models of cars. We buy cars from trusted
          customers, re-work or refurbish the car to recover its best and sell
          it to customers with affordable and reasonable marketing price. We are
          running the buisness successfully for more than 10 years with many
          satisfied buyers and sellers. More than 95 cars have been refurbised
          and out of them 45 have been sold so far for happy customers :) <br />{" "}
          Wanna sell or buy a car ? then  <span style={{color: "#db2f69", fontWeight: "bold"}}>VEL CARS</span> is the perfect place for you!
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginTop: "80px",
        }}
      >
        <div className="about-cards">
          <div>
            <div className="center">
              <GiAchievement className="about-icons" />
            </div>
            <div className="center about-numbers">90+</div>
            <div className="about-text">Refurbished Cars</div>
          </div>
        </div>
        <div className="about-cards">
          <div>
            <div className="center">
              <IoCarSportSharp className="about-icons" />
            </div>
            <div className="center about-numbers">45+</div>
            <div className="about-text">Cars sold so far</div>
          </div>
        </div>
        <div className="about-cards">
          <div>
            <div className="center">
              <TbHeartHandshake className="about-icons" />
            </div>
            <div className="center about-numbers">55+</div>
            <div className="about-text">Happy Customers</div>
          </div>
        </div>
        <div className="about-cards">
          <div>
            <div className="center">
              <MdOutlineBusinessCenter className="about-icons" />
            </div>
            <div className="center about-numbers">10+ </div>
            <div className="about-text">Years Business</div>
          </div>
        </div>
      </div>
      <div>
        <div className="admin-banner" style={{ height: "150px" }}>
          <span style={{ color: "#db2f69", marginRight: "30px" }}>
            CONTACT{" "}
          </span>
          <span className="text-dark">US</span>
        </div>
        <div className="contact-section">
          <div className="contact-text">
            <ul>
              <li>
                <TbPhoneCall style={{ fontSize: "25px" }} />{" "}
                <span style={{ color: "grey" }}>Phone : </span> +91 9786202244
              </li>
              <li>
                <HiOutlineMail style={{ fontSize: "25px" }} />{" "}
                <span style={{ color: "grey" }}>Email : </span>{" "}
                activegopal@gmail.com
              </li>
              <li>
                <AiOutlineWhatsApp style={{ fontSize: "25px" }} />{" "}
                <span style={{ color: "grey" }}>Whatsapp : </span> +91
                9786202244
              </li>
              <li>
                <div style={{ marginTop: "30px" }}>
                  <img src={QR} alt="" width={150} />
                  <p
                    style={{
                      color: "#db2f69",
                      fontFamily: "NATS",
                      fontSize: "20px",
                    }}
                  >
                    Scan to contact the owner via whatsapp
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="contact-img">
            <img src={contactImg} alt="" />
          </div>
        </div>

        <div className="admin-banner" style={{ height: "150px" }}>
          <span style={{ color: "#db2f69", marginRight: "30px" }}>REVIEW </span>
          <span className="text-dark">US</span>
        </div>
        <div>
          <Review flexDir={"row-reverse"} />
        </div>
      </div>
    </div>
  );
};

export default About;
