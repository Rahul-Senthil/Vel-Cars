import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ProductContext } from "./ProductContext";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart, FaStar } from "react-icons/fa";
import { FaCircle, FaUserCircle } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import preview from "../images/login1.png";
import download from "../images/download.jfif";
import banner from "../images/banner.png";
import CarsList from "./CarsList";
import "./Style.css";
import Review from "./Review";
const Home = () => {
  const {
    activeUserState,
    wishlistState,
    allProductsState,
    carModelsState,
    filteredProductsState,
    handleClearAllFilters,
    // handleClearAllToggles
  } = useContext(ProductContext);
  const [activeUser, setActiveUser] = activeUserState;
  const [wishlist, setWishlist] = wishlistState;

  const [allProducts, setAllProducts] = allProductsState;
  const [carModels, setCarModels] = carModelsState;
  const [filteredProducts, setFilteredProducts] = filteredProductsState;

  const [reviews, setReviews] = useState([]);
  // const [star, setStar] = useState(5);
  useEffect(() => {
    const fetchProductsData = async () => {
      await axios
        .get("https://vel-cars.herokuapp.com/common/fetch-all-cars")
        .then((res) => {
          console.log(res.data);
          setAllProducts(res.data);
          setFilteredProducts([]);
          handleClearAllFilters();
          // handleClearAllToggles();
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    const fetchCarModelsData = async () => {
      await axios
        .get("https://vel-cars.herokuapp.com/admin/fetch-car-models")
        .then((res) => {
          setCarModels(res.data.sort());
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    const fetchActiveUser = async () => {
      const token = sessionStorage.getItem("token");
      token ? setActiveUser(jwtDecode(token)) : setActiveUser(null);
      if (token) {
        const user = jwtDecode(token);
        if (!user.isAdmin) {
          await axios
            .get(
              `https://vel-cars.herokuapp.com/user/fetch-wishlist/${user._id}`
            )
            .then((res) => {
              res.data.map(async (w) => {
                if (!w.productId) {
                  await axios
                    .post(
                      "https://vel-cars.herokuapp.com/user/remove-from-wishlist",
                      {
                        id: user._id,
                        _id: w._id,
                      }
                    )
                    .then((res) => {
                      console.log(res.data);
                    })
                    .catch((err) => console.log(err));
                }
              });
              const updatedWishlist = res.data.filter((w) => {
                return w.productId !== null;
              });
              setWishlist([...updatedWishlist]);
              console.log([...updatedWishlist]);
            })
            .catch((err) => console.log(err));
          console.log(user);
        }
      }
    };
    const fetchReviews = async () => {
      await axios
        .get("https://vel-cars.herokuapp.com/common/fetch-review")
        .then((res) => {
          console.log(res.data);
          setReviews(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchProductsData();
    fetchCarModelsData();
    fetchActiveUser();
    fetchReviews();
  }, [setAllProducts, setCarModels]);

  return (
    <div style={{ marginTop: "65px" }}>
      <Toaster position="top-center" reverseOrder={false} />
      <div class="owerflowhidden">
        <div class="index_back">
          <div className="banner-content">
            <div className="banner-text">
              <div className="D">
                <h1>D</h1>
              </div>
              <div className="des">
                <h2>RIVE YOUR</h2>
                <FaCircle className="red-circle" />
                <h2>REAM</h2>
              </div>
            </div>
            <div className="banner-btn">
              <Link to="/all-cars">
                <button className="btn btn-dark">View Cars</button>
              </Link>
              {activeUser ? (
                activeUser.isAdmin ? (
                  <Link to="/dashboard">
                    <button
                      className="btn btn-danger"
                      style={{ backgroundColor: "#db2f69", color: "black" }}
                    >
                      Go to Dashboard
                    </button>
                  </Link>
                ) : (
                  <Link to="/user-profile">
                    <button
                      className="btn btn-danger"
                      style={{ backgroundColor: "#db2f69", color: "black" }}
                    >
                      Go to Profile
                    </button>
                  </Link>
                )
              ) : (
                <Link to="/login">
                  <button
                    className="btn btn-danger"
                    style={{ backgroundColor: "#db2f69", color: "black" }}
                  >
                    Go to Profile
                  </button>
                </Link>
              )}
            </div>
            <img src={banner} alt="" className="banner-img" />
          </div>
        </div>
        <div class="center">
          <p class="new_arrivals text-center">NEW ARRIVALS</p>
        </div>
        <br />
        <br />
        <div className="center">
          <div
            // style={{
            //   display: "flex",
            //   flexWrap: "wrap",
            //   justifyContent: "space-between",
            //   overflowX: "hidden",
            //   border: "1px solid red",
            //   padding: "10px",
            //   width: "85%"
            // }}
            className="new-products"
          >
            {
              allProducts &&
                allProducts
                  .filter((product) => product.sold !== true)
                  .map(
                    (product, index) =>
                      index < 6 && (
                        <CarsList
                          product={product}
                          index={index}
                          key={index}
                          // sold={product.sold}
                        />
                      )
                  )
              // allProducts.filter()
            }
          </div>
        </div>
        <br></br>
        <br></br>
        <div class="center">
          <button class="viewmorebutton">
            <Link to="/all-cars">
              <p class="viewmoretext">
                View More <span> </span>
                <BsArrowRight />
              </p>
            </Link>
          </button>
        </div>
        {/* <br></br> */}
        <br></br>
        <div class="container">{/* <div class="homehorizontal"></div> */}</div>
        <br></br>
        <br></br>
        <div class="aboutusimg">
          <div class="blurspace">
            <div class="container shadow1">
              <div class="center">
                <p
                  class="aboutus"
                  style={{
                    color: "#db2f69",
                    fontFamily: "NATS",
                    fontSize: "40px",
                  }}
                >
                  ABOUT US
                </p>
              </div>
              <div class="row">
                <div class="col-md-7 aboutuscontent">
                  Vel Cars is a refurbised or second hand car selling platform
                  with many number of brands and models of cars. We buy cars
                  from trusted customers, re-work or refurbish the car to
                  recover its best and sell it to customers with affordable and
                  reasonable marketing price. We are running the buisness
                  successfully for more than 10 years with many satisfied buyers
                  and sellers. More than 95 cars have been refurbised and out of
                  them 45 have been sold so far for happy customers :) <br />{" "}
                  Wanna sell or buy a car ? then VEL CARS is the perfect place
                  for you!
                </div>
                <div class="col-md-5">
                  <img class="aboutusgroupimg" src={preview} alt="..." />
                  <div className="care-car center">
                    <div>
                      <span>CARE </span>
                      <span>FOR </span>
                      <span>CAR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <div class="devlopers">
          <div class="container-fluid developers">
            <div class="row justify-content-around">
              <div className="center">
                <h3
                  style={{
                    color: "#db2f69",
                    fontFamily: "NATS",
                    fontSize: "40px",
                  }}
                >
                  REVIEWS
                </h3>
              </div>
              {reviews.map((review, index) => (
                <div class="cardpadding col-sm-3">
                  <div class="card container-fluid  p-3 mb-5  review-card">
                    <div class="card-body ">
                      {/* <div class="text-center ">
                        <ImQuotesLeft class="quotesstyle" />
                      </div>
                      <br></br> */}
                      <div style={{ display: "flex" }}>
                        <div>
                          <h5 class="card-title">
                            <FaUserCircle
                              style={{ color: "black", fontSize: "50px" }}
                            />{" "}
                            {/* <br /> */}
                          </h5>
                          {/* <h6>{review.username}</h6> */}
                        </div>
                        <div style={{ marginLeft: "30px", marginTop: "10px" }}>
                          {[...Array(5)].map((_, idx) =>
                            idx < review.rating ? (
                              <FaStar
                                style={{ color: "orange", fontSize: "25px" }}
                              />
                            ) : (
                              <FaStar
                                style={{ color: "white", fontSize: "25px" }}
                              />
                            )
                          )}
                        </div>
                      </div>
                      {/* <br /> */}
                      <p
                        class="card-text"
                        style={{ fontFamily: "NATS", fontSize: "20px" }}
                      >
                        {review.review}
                      </p>
                      <h6
                        style={{
                          float: "right",
                          fontFamily: "NATS",
                          fontSize: "18px",
                          color: "#db2f69",
                          fontWeight: "bold",
                        }}
                      >
                        - {review.username}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Form */}
        <Review />
      </div>
    </div>
  );
};

export default Home;
