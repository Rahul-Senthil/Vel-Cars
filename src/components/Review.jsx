import React from "react";
import { createRef } from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Rating from "./Rating";
import toast, { Toaster } from "react-hot-toast";
import reviewImg from "../images/Mail-amico.png";
import { ProductContext } from "./ProductContext";

const Review = ({flexDir}) => {
  const { activeUserState } = useContext(ProductContext);
  const [activeUser, setActiveUser] = activeUserState;

  const [rating, setRating] = useState(0);
  const reviewRef = createRef();
  const [reviews, setReviews] = useState([]);

  const handleReview = async () => {
    if (!activeUser) {
      return toast.error("Login to write a review", {
        style: {
          fontFamily: "NATS",
          fontSize: "18px",
        },
      });
    } else if (activeUser.isAdmin) {
      return toast.error("Only users can write a review", {
        style: {
          fontFamily: "NATS",
          fontSize: "18px",
        },
      });
    } else if (rating === 0) {
      return toast.error("Rating should be selected", {
        style: {
          fontFamily: "NATS",
          fontSize: "18px",
        },
      });
    } else if (reviewRef.current.value.length < 10) {
      return toast.error("Review should be atleast 10 characters", {
        style: {
          fontFamily: "NATS",
          fontSize: "18px",
        },
      });
    }

    const review = reviewRef.current.value;
    await axios
      .post("https://vel-cars.herokuapp.com/user/add-review", {
        userId: activeUser._id,
        username: activeUser.username,
        review: review,
        rating: rating,
      })
      .then((res) => {
        toast.success(res.data, {
          style: {
            fontFamily: "NATS",
            fontSize: "18px",
          },
        });
        reviewRef.current.value = "";
        setRating(0);
      })
      .catch((err) => console.log(err));
    // console.log(activeUser);
  };
  return (
    <div>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}

      <div className="review-section" style={{flexDirection: flexDir}}>
        <div className="review-form" id="car-form">
          <div>
            <div className="center">
              <h3 className="text-dark">Write a Review</h3>
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              ref={reviewRef}
            ></textarea>
            <br />
            <div className="center">
              <Rating rating={rating} onRating={(rate) => setRating(rate)} />
              {/* <h4>Rating {rating}</h4> */}
            </div>
            <div className="center" style={{ marginTop: "20px" }}>
              <button
                // className="purple-btn"
                style={{
                  width: "150px",
                  height: "35px",
                  fontFamily: "NATS",
                  fontSize: "20px",
                  backgroundColor: "#db2f69",
                  border: "none",
                  color: "white",
                }}
                onClick={handleReview}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="review-img">
          <img src={reviewImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Review;
