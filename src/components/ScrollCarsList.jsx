import React from "react";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ScrollCarsList = ({ product, index, setCurrentProduct }) => {
  const navigate = useNavigate();
  return (
    // <Link>
    <div
      className="modern-cars"
      key={index}
      onClick={() => {
        navigate(`/all-cars/${product._id}`);
        setCurrentProduct(product);
        window.scrollTo(0,0);
      }}
    >
      <img src={product.imageDetails[0].imageUrl} alt="" width={300} />
      <div style={{ display: "flex" }}>
        <span>{product.name}</span>
        <BsDot style={{ fontSize: "30px", transform: "translateY(-2px)" }} />
        <span>₹ {product.price}</span>
        <BsDot style={{ fontSize: "30px", transform: "translateY(-2px)" }} />
        <span>{product.type}</span>
      </div>
    </div>
    // </Link>
  );
};

export default ScrollCarsList;
