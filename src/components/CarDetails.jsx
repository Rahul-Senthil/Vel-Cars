import React, { createRef } from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaGasPump, FaCar } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { MdSpeed } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Badge from "react-bootstrap/Badge";
// import CarsList from "./CarsList";
// import HorizontalScroll from "react-scroll-horizontal";
import Scroll from "react-elastic-carousel";
import QR from "../images/qr.png";
import { FaHeart, FaRegHeart, FaHeartBroken } from "react-icons/fa";
import "./Style.css";
import ScrollCarsList from "./ScrollCarsList";

const CarDetails = () => {
  const { activeUserState, allProductsState, wishlistState } =
    useContext(ProductContext);
  const [activeUser, setActiveUser] = activeUserState;
  const [allProducts, setAllProducts] = allProductsState;
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const navigate = useNavigate();

  const [wishlist, setWishlist] = wishlistState;

  const inWishlist = wishlist.find((w) => {
    return w.productId._id === currentProduct._id ? true : false;
  });

  const breakpoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 760, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  const handleWishlist = async (productId) => {
    if (inWishlist) {
      const newWishlist = wishlist.filter((w) => {
        return w.productId._id !== productId;
      });
      await axios
        .post("https://vel-cars.herokuapp.com/user/remove-from-wishlist", {
          id: activeUser._id,
          productId,
        })
        .then(() => {
          setWishlist([...newWishlist]);
          toast("Removed from Wishlist", {
            icon: <FaHeartBroken style={{ color: "red" }} />,
            style: {
              fontFamily: "NATS",
            },
          });
        })
        .catch((err) => console.log(err));
    } else {
      await axios
        .post("https://vel-cars.herokuapp.com/user/add-to-wishlist", {
          id: activeUser._id,
          productId,
        })
        .then(() => {
          setWishlist([...wishlist, { productId: { ...currentProduct } }]);
          console.log([...wishlist, { productId: { ...currentProduct } }]);
          toast.success("Added to Wishlist", {
            style: {
              fontFamily: "NATS",
            },
          });
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const fetchCurrentProduct = async () => {
      await axios
        .get(`https://vel-cars.herokuapp.com/common/fetch-specific-car/${id}`)
        .then((res) => {
          setCurrentProduct(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchCurrentProduct();
    window.scrollTo(0, 0);
  }, []);

  const handleDeleteCar = async () => {
    await axios
      .delete(`https://vel-cars.herokuapp.com/admin/delete-car/${id}`)
      .then((res) => {
        toast("Deleted Successfully", {
          icon: <FaTrash />,
          style: {
            fontFamily: "NATS",
          },
        });
        const afterDeletion = allProducts.filter((p) => p._id !== id);
        setAllProducts([...afterDeletion]);
        navigate("/all-cars");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginTop: "65px" }}>
      {currentProduct ? (
        <div>
          <div class="center carbg">
            <div class="cardetails_cardwidth">
              <Carousel>
                {currentProduct.imageDetails &&
                  currentProduct.imageDetails.map((imageDetail, i) => (
                    // <img key={i} src={imageDetail.imageUrl} alt="" width={400} />
                    <Carousel.Item key={i}>
                      <img
                        className="testimonialImages d-block w-100"
                        Style="padding:5px;"
                        src={imageDetail.imageUrl}
                        alt=""
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
          </div>
          <div className="fulldetails">
            <div className="left-side">
              <h1>
                {currentProduct.name} ({currentProduct.year})
              </h1>
              <div className="left-side-info">
                <span>
                  <FaGasPump /> {currentProduct.fuel} |{" "}
                </span>
                <span>
                  <MdSpeed /> {currentProduct.kmRunned} KM |{" "}
                </span>
                <span>
                  <GiGearStickPattern />{" "}
                  {currentProduct.transmission
                    ? currentProduct.transmission.map((t) => <span>{t} </span>)
                    : ""}
                </span>
              </div>
            </div>
            <div className="right-side">
              <h1>₹ {currentProduct.price}</h1>
              {activeUser?.isAdmin &&
                (currentProduct.sold === true ? (
                  <div>
                    <Badge
                      bg="danger"
                      style={{
                        width: "80px",
                        height: "30px",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      SOLD
                    </Badge>
                    <Link
                      to={`/buyer-records/buyer-details/${currentProduct.soldTo}`}
                    >
                      <button className="view-sold">View Details</button>
                    </Link>
                  </div>
                ) : (
                  <Badge
                    bg="success"
                    style={{
                      width: "80px",
                      height: "30px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    NOT SOLD
                  </Badge>
                ))}
              {activeUser ? (
                !activeUser?.isAdmin &&
                (inWishlist ? (
                  <button
                    style={{
                      width: "200px",
                      height: "40px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: "#db2f69",
                      color: "white",
                      fontFamily: "NATS",
                      fontSize: "20px",
                    }}
                    onClick={() => handleWishlist(currentProduct._id)}
                  >
                    Already in Wishlist
                  </button>
                ) : (
                  <button
                    style={{
                      width: "200px",
                      height: "40px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: "#7fd1e8",
                      fontFamily: "NATS",
                      fontSize: "20px",
                    }}
                    onClick={() => handleWishlist(currentProduct._id)}
                  >
                    Add to Wishlist
                  </button>
                ))
              ) : (
                <Link to="/login">
                  <button
                    style={{
                      width: "200px",
                      height: "40px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: "#7fd1e8",
                      fontFamily: "NATS",
                      fontSize: "20px",
                    }}
                  >
                    Add to Wishlist
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="fulldetails">
            <div className="overview">
              <h1>OVERVIEW</h1>
              <hr />
              <div className="description">
                <span>
                  Type <FaCar /> : {currentProduct.type} |{" "}
                </span>
                <span>
                  Millage <FaGasPump /> : {currentProduct.millage}KM |{" "}
                </span>
                <span>
                  Posted Date <BsCalendar3 /> :{" "}
                  {currentProduct.postedDate &&
                    currentProduct.postedDate.split("T")[0]}{" "}
                  |{" "}
                </span>
                <span>
                  Insured <GoVerified /> : {currentProduct.insured}
                </span>
              </div>
            </div>
            {activeUser?.isAdmin ? (
              <div className="btns">
                <Link to={`/update-car/${id}`}>
                  <button style={{ backgroundColor: "#12c2e9" }}>UPDATE</button>
                </Link>
                <button
                  style={{ backgroundColor: "#db2f69" }}
                  onClick={handleDeleteCar}
                >
                  DELETE
                </button>
              </div>
            ) : (
              <div className="center" style={{ width: "200px" }}>
                <div>
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
              </div>
            )}
          </div>

          <div style={{ marginBottom: "50px" }}>
            <h3 className="more-cars">More Cars</h3>
            <Scroll breakPoints={breakpoints}>
              {allProducts &&
                allProducts
                  // .filter((product) => product.name === currentProduct.name)
                  .map(
                    (product, index) =>
                      product.sold === false &&
                      product._id !== currentProduct._id && (
                        <ScrollCarsList
                          product={product}
                          index={index}
                          setCurrentProduct={setCurrentProduct}
                          // sold={product.sold}
                        />
                      )
                  )}
            </Scroll>
          </div>
        </div>
      ) : (
        ""
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default CarDetails;
