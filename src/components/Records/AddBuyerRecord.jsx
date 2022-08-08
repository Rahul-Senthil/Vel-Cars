import React, { createRef, useContext } from "react";
import { ProductContext } from "../ProductContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { MdError } from "react-icons/md";
import Joi from "joi";

const AddBuyerRecord = () => {
  const { allProductsState } = useContext(ProductContext);
  const [allProducts] = allProductsState;
  const nameRef = createRef();
  const priceRef = createRef();
  const purchasedDateRef = createRef();
  const customerNameRef = createRef();
  const customerAddressRef = createRef();
  const customerPhoneRef = createRef();
  const productIdRef = createRef();

  const navigate = useNavigate();

  const handleAddBuyerRecord = async () => {
    const carName = nameRef.current.value;
    const price = priceRef.current.value;
    const purchasedDate = purchasedDateRef.current.value;
    const customerName = customerNameRef.current.value;
    const customerAddress = customerAddressRef.current.value;
    const customerPhone = customerPhoneRef.current.value;
    const productId = productIdRef.current.value;

    const newBuyerRecord = {
      carName,
      price,
      purchasedDate,
      customerName,
      customerAddress,
      customerPhone,
      productId,
    };
    console.log(newBuyerRecord);

    //Validation
    const schema = Joi.object({
      carName: Joi.string().required(),
      price: Joi.string().required(),
      purchasedDate: Joi.string().required(),
      customerName: Joi.string().required(),
      customerAddress: Joi.string().required(),
      customerPhone: Joi.string().required(),
      productId: Joi.string().required(),
    });

    const { error } = schema.validate(newBuyerRecord);
    if (error) {
      toast(error.details[0].message, {
        icon: <MdError style={{ color: "red" }} />,
      });
    }

    if (!error) {
      await axios
        .post("https://vel-cars.herokuapp.com/admin/add-buyer-record", newBuyerRecord)
        .then((res) => {
          console.log(res.data);
          toast.success("Added Successfully");
          navigate("/buyer-records");
        })
        .catch((err) => console.log(err));
    }
  };

  const inputStyle = {
    width: "350px",
    height: "35px",
    outline: "none",
    marginBottom: "15px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "65px"
      }}
      className="form-bg"
    >
      <div id="car-form" className="my-form">
        <h3>Add New Buyer Record</h3>
        <div>
          <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
            Customer Name
          </label>{" "}
          <br />
          <input
            type="text"
            ref={customerNameRef}
            placeholder="Enter customer Name"
          />
        </div>
        <br />
        <div>
          <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
            Customer Mobile Number
          </label>{" "}
          <br />
          <input
            type="text"
            ref={customerPhoneRef}
            placeholder="Enter customer mobile number"
          />
        </div>
        <br />
        <div>
          <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
            Car Model
          </label>{" "}
          <br />
          <input type="text" ref={nameRef} placeholder="Enter car model" />
        </div>
        <br />
        <div>
          <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
            Price for which car sold
          </label>{" "}
          <br />
          <input type="text" ref={priceRef} placeholder="Enter price" />
        </div>
        <br />
        <div>
          <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
            Customer Address
          </label>{" "}
          <br />
        <input
          type="text"
          ref={customerAddressRef}
          placeholder="Enter customer address"
        />
        </div>
        <br />
        <div>
          <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
            Purchased Date
          </label>{" "}
          <br />
        <input type="date" ref={purchasedDateRef} placeholder="Enter Date" />
        </div>
        <br />
        {/* <input
          type="text"
          ref={productIdRef}
          placeholder="Enter Car Id"
        />
        <br /> */}
        <div>
          <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
            Car ID
          </label>{" "}
          <br />
        <select name="" ref={productIdRef}>
          <option value="">Select Car Id</option>
          {allProducts &&
            allProducts.map((product, i) => (
              <option key={i} value={product._id}>
                {product.name},₹{product.price}: {product._id}
              </option>
            ))}
        </select>
        </div>
        <button
          className="purple-btn"
          onClick={handleAddBuyerRecord}
        >
          Save
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AddBuyerRecord;
