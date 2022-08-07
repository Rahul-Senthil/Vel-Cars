import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { FaHeart, FaRegHeart, FaHeartBroken } from "react-icons/fa";
import { useContext } from "react";
import { ProductContext } from "./ProductContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";

const CarsList = ({ product, index, sold }) => {
  const { activeUserState, wishlistState } = useContext(ProductContext);
  const [activeUser, setActiveUser] = activeUserState;
  const [wishlist, setWishlist] = wishlistState;

  const inWishlist = wishlist.find((w) => {
    return w.productId._id === product._id ? true : false;
  });

  const handleWishlist = async (productId) => {
    if (inWishlist) {
      const newWishlist = wishlist.filter((w) => {
        return w.productId._id !== productId;
      });
      await axios
        .post("http://localhost:8000/user/remove-from-wishlist", {
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
    } else {
      await axios
        .post("http://localhost:8000/user/add-to-wishlist", {
          id: activeUser._id,
          productId,
        })
        .then(() => {
          setWishlist([...wishlist, { productId: { ...product } }]);
          console.log([...wishlist, { productId: { ...product } }]);
          toast.success("Added to Wishlist");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div class="fontnats each-car">
      <div style={{ marginBottom: "50px", overflowX: "hidden"}}>
        <Card key={index} style={{ width: "330px", height: "420px" }}>
          <Card.Img
            variant="top"
            src={product.imageDetails[0].imageUrl}
            style={{
              height: "190px",
              paddingLeft: "6px",
              paddingTop: "6px",
              paddingRight: "6px",
            }}
          />
          <Card.Body>
            {sold ? (
              <Card.Title
                style={{
                  color: "red",
                  fontWeight: "bolder",
                  float: "right",
                  marginRight: "10px",
                }}
              >
                SOLD
              </Card.Title>
            ) : (
              ""
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Card.Title Style="font-size:25px;">{product.name}</Card.Title>
              {activeUser && !activeUser.isAdmin ? (
                inWishlist ? (
                  <span
                    style={{
                      fontSize: "23px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    <FaHeart onClick={() => handleWishlist(product._id)} />
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: "23px",
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    <FaRegHeart onClick={() => handleWishlist(product._id)} />
                  </span>
                )
              ) : (
                ""
              )}
            </div>
            <div class="cardbodystyle">
              <span Style="font-size:20px;">₹ {product.price}</span>
              <br />
              <span Style="font-size:20px;">{product.type}</span>
              <br />
              <span Style="font-size:20px;">{product.transmission}</span>
              <br />
              <span Style="font-size:20px;">{product.fuel}</span>
              <br />
            </div>

            <Link to={`/all-cars/${product._id}`}>
              <Button className="view-btn">View Details</Button>
            </Link>
          </Card.Body>
        </Card>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default CarsList;
