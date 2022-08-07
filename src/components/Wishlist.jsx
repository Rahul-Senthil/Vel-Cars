import React from "react";
import { useContext } from "react";
import { ProductContext } from "./ProductContext";
import { Card, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeartBroken } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import empty from "../images/gif/empty.gif";
import Scroll from "react-elastic-carousel";
import ScrollCarsList from "./ScrollCarsList";
import "./Style.css";
const Wishlist = () => {
  const { activeUserState, wishlistState, allProductsState } = useContext(ProductContext);
  const [activeUser, setActiveUser] = activeUserState;
  const [wishlist, setWishlist] = wishlistState;
  const [allProducts, setAllProducts] = allProductsState;

  const breakpoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 760, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const removeFromWishlist = async (productId) => {
    const newWishlist = wishlist.filter((w) => {
      return w.productId._id !== productId;
    });
    console.log(newWishlist);
    await axios
      .post("https://vel-cars.herokuapp.com/user/remove-from-wishlist", {
        id: activeUser._id,
        productId,
      })
      .then(() => {
        setWishlist([...newWishlist]);
        toast("Removed from Wishlist", {
          icon: <FaHeartBroken style={{ color: "red" }} />,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div class="fontnats" style={{marginTop: "65px"}}>
      <div
        class="fontnats"
        Style="line-height:20px;text-align:center;color:red;font-size: x-large;"
      >
        <div className="admin-banner bg-dark">
        <span style={{ color: "#db2f69", marginRight: "30px" }}>YOUR </span>
        WISHLIST
      </div>
      </div>
      <div
        style={{
          display: "flex",
          // width: "85%",
          flexWrap: "wrap",
          // justifyContent: "space-around",
          marginTop: "20px",
          // marginLeft: "30px",
          overflowX: "hidden",
        }}
        class="container-fluid wishlist"
      >
        {wishlist?.length > 0 ? (
          wishlist.map(
            (product, index) =>
              !product.productId.sold && (
                <div key={index} style={{ marginBottom: "50px",marginRight:"50px" }}>
                  <Card style={{ width: "330px", height: "420px" }}>
                    <Card.Img
                      variant="top"
                      src={product.productId.imageDetails[0].imageUrl}
                      style={{
                        height: "190px",
                        paddingLeft: "6px",
                        paddingTop: "6px",
                        paddingRight: "6px",
                      }}
                    />
                    <Card.Body>
                      <Card.Title Style="font-size:25px;">
                        {product.productId.name}
                      </Card.Title>
                      <span Style="font-size:20px;">
                        ₹{product.productId.price}
                      </span>
                      <br />
                      <span Style="font-size:20px;">
                        {product.productId.type}
                      </span>
                      <br />
                      <span Style="font-size:20px;">
                        {product.productId.transmission}
                      </span>
                      <br />
                      <span Style="font-size:20px;">
                        {product.productId.fuel}
                      </span>
                      <br />
                      <Link to={`/all-cars/${product.productId._id}`}>
                        <Button
                          className="view-btn"
                          // Style="font-size:20px;border-radius:25px;margin-top:10px;"
                        >
                          View Details
                        </Button>
                      </Link>
                      {/* <br /><br /> */}
                      <Button
                        className="btn btn-secondary"
                        style={{
                          width: "100px",
                          height: "45px",
                          border: "none",
                          borderRadius: "8px",
                          backgroundColor: "#7fd1e8",
                          fontFamily: "NATS",
                          fontSize: "18px",
                          float: "right",
                          // marginRight: "20px",
                          marginTop: "5px",
                          color: "black",
                        }}
                        // Style="font-size:20px;border-radius:25px;float:right;margin-right:20px;margin-top:10px;"
                        onClick={() =>
                          removeFromWishlist(product.productId._id)
                        }
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
              )
          )
        ) : (
          <h3>
            <img src={empty} alt="" Style="width:100%;height:100%;" />
            Nothing in your wishlist..Add Some
          </h3>
        )}
      </div>
        <div style={{marginBottom: "50px"}}>
            <h3 className="more-cars">More Cars</h3>
            <Scroll breakPoints={breakpoints}>
              {allProducts
                // .filter((product) => product.name === currentProduct.name)
                .map((product, index) => (
                  <ScrollCarsList
                    product={product}
                    index={index}
                    // setCurrentProducts={setCurrentProducts}
                    // sold={product.sold}
                  />
                ))}
            </Scroll>
          </div>
    </div>
  );
};

export default Wishlist;
