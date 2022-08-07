import React, { createRef, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { ProductContext } from "../ProductContext";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../Style.css";

const EditSellerRecord = () => {
  //   const { allProductsState } = useContext(ProductContext);
  //   const [allProducts] = allProductsState;
  const nameRef = createRef();
  const priceRef = createRef();
  const purchasedDateRef = createRef();
  const customerNameRef = createRef();
  const customerAddressRef = createRef();
  const customerPhoneRef = createRef();
  const productIdRef = createRef();

  const { id } = useParams();
  const navigate = useNavigate();

  const [currentRecord, setCurrentRecord] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://vel-cars.herokuapp.com/admin/fetch-seller-record/${id}`)
        .then((res) => {
          setCurrentRecord(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const handleEditSellerRecord = async (e) => {
    e.preventDefault();
    const carName = nameRef.current.value;
    const price = priceRef.current.value;
    const purchasedDate = purchasedDateRef.current.value;
    const customerName = customerNameRef.current.value;
    const customerAddress = customerAddressRef.current.value;
    const customerPhone = customerPhoneRef.current.value;
    const productId = productIdRef.current.value;

    const editSellerRecord = {
      carName,
      price,
      purchasedDate,
      customerName,
      customerAddress,
      customerPhone,
      productId,
    };
    console.log(editSellerRecord);

    await axios
      .post(
        `https://vel-cars.herokuapp.com/admin/edit-seller-record/${id}`,
        editSellerRecord
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Edited Successfully",
        {
          style: {
            fontFamily: "NATS",
            fontSize: "18px"
          }
        }
        );
        navigate("/seller-records");
      })
      .catch((err) => console.log(err));
  };

  const inputStyle = {
    width: "350px",
    height: "35px",
    outline: "none",
    marginBottom: "15px",
  };

  return (
    <div>
      {currentRecord ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="form-bg"
        >
          <div id="car-form" className="my-form">
            <h3>Edit Seller Record</h3>
            <div>
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
                Customer Name
              </label>{" "}
              <br />
              <input
                type="text"
                ref={customerNameRef}
                placeholder="Enter customer Name"
                defaultValue={currentRecord.customerName}
              />
            </div>
            <br />
            <div>
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
                Customer Mobile Number
              </label>{" "}
              <br />
              <input
                type="text"
                ref={customerPhoneRef}
                placeholder="Enter customer mobile number"
                defaultValue={currentRecord.customerPhone}
              />
            </div>
            <br />
            <div>
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
                Car Model
              </label>{" "}
              <br />
              <input
                type="text"
                ref={nameRef}
                placeholder="Enter car model"
                defaultValue={currentRecord.carName}
              />
            </div>
            <br />
            <div>
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
                Price for which car bought
              </label>{" "}
              <br />
              <input
                type="text"
                ref={priceRef}
                placeholder="Enter price"
                defaultValue={currentRecord.price}
              />
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
              defaultValue={currentRecord.customerAddress}
            />
            </div>
            <br />
            <div>
          <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
            Purchased Date
          </label>{" "}
          <br />
            <input
              type="date"
              ref={purchasedDateRef}
              placeholder="Enter year"
              defaultValue={currentRecord.purchasedDate.split("T")[0]}
            />
            </div>
            <br />
            <div>
          <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
            Car ID
          </label>{" "}
          <br />
            <input
              type="text"
              ref={productIdRef}
              placeholder="Enter Car Id"
              defaultValue={currentRecord.productId}
            />
            </div>
            <br />
            <button
              className="purple-btn"
              onClick={handleEditSellerRecord}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default EditSellerRecord;
