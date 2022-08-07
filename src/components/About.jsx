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
    <div style={{marginTop: "65px"}}>
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
        <img src={aboutImg} alt="" className="about-img"/>
        <div className="about-content">
          When it comes to personalizing your online store, nothing is more
          effective than an About Us page. This is a quick summary of your
          company's history and purpose, and should provide a clear overview of
          the company's brand story. A great About Us page can help tell your
          brand story, establish customer loyalty, and turn your bland ecommerce
          store into an well-loved brand icon. Most importantly, it will give
          your customers a reason to shop from your brand. In this post, we'll
          give you three different ways to create a professional about us page
          for your online store, blog, or other website
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
            <div className="center about-numbers">150+</div>
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
                <TbPhoneCall style={{fontSize: "25px"}}/> <span style={{ color: "grey" }}>Phone : </span>{" "}
                +91 9786202244
              </li>
              <li>
                <HiOutlineMail style={{fontSize: "25px"}}/>{" "}
                <span style={{ color: "grey" }}>Email : </span>{" "}
                activegopal@gmail.com
              </li>
              <li>
                <AiOutlineWhatsApp style={{fontSize: "25px"}}/>{" "}
                <span style={{ color: "grey" }}>Whatsapp : </span> +91
                9786202244
              </li>
              <li>
              <div style={{marginTop: "30px"}}>
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
          <span style={{ color: "#db2f69", marginRight: "30px" }}>
            REVIEW{" "}
          </span>
          <span className="text-dark">US</span>
        </div>
        <div>
        <Review flexDir={"row-reverse"}/>
        </div>
      </div>
    </div>
  );
};

export default About;
