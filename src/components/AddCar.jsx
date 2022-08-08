import axios from "axios";
import React, { createRef, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import Joi from "joi";
import { MdError } from "react-icons/md";
import { Button } from "react-bootstrap";
import bg from "../images/bg.png";
import "./Style.css";

const AddCar = () => {
  const { allProductsState } = useContext(ProductContext);
  const [allProducts, setAllProducts] = allProductsState;
  const [files, setFiles] = useState([]);
  const [previewImageSrc, setPreviewImageSrc] = useState([]);
  const [uploadData, setUploadData] = useState();
  const [uploadedImage, setUploadedImage] = useState([]);
  const nameRef = createRef();
  const fuelRef = createRef();
  const priceRef = createRef();
  const typeRef = createRef();
  const kmRunnedRef = createRef();
  const millageRef = createRef();
  const yearRef = createRef();
  const insuredRef = createRef();

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    let fileObj = [];
    let fileArray = [];
    setFiles([...e.target.files]);
    fileObj.push(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setPreviewImageSrc(fileArray);
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    const transmission = [];
    const name = nameRef.current.value;
    const fuel = fuelRef.current.value;
    const price = priceRef.current.value;
    const type = typeRef.current.value;
    const kmRunned = kmRunnedRef.current.value;
    const millage = millageRef.current.value;
    const year = yearRef.current.value;
    const insured = insuredRef.current.value;
    const postedDate = new Date().toISOString();
    const transmissionValues = document.getElementsByName("transmission");
    for (let i = 0; i < transmissionValues.length; i++) {
      if (transmissionValues[i].checked === true) {
        transmission.push(transmissionValues[i].value);
      }
    }

    //Validation
    const schema = Joi.object({
      name: Joi.string().required(),
      fuel: Joi.string().required(),
      price: Joi.string().required(),
      type: Joi.string().required(),
      transmission: Joi.array().min(1).required(),
      kmRunned: Joi.number().required(),
      millage: Joi.number().required(),
      year: Joi.string().required(),
      insured: Joi.string().required(),
      postedDate: Joi.string().required(),
      files: Joi.array().min(1).max(4).required(),
    });
    const { error } = schema.validate({
      name,
      fuel,
      price,
      type,
      transmission,
      kmRunned,
      millage,
      year,
      insured,
      postedDate,
      files,
    });
    console.log(error);

    if (error) {
      toast(error.details[0].message, {
        icon: <MdError style={{ color: "red" }} />,
        style: {
          fontFamily: "NATS",
          fontSize: "18px"
        }
      });
    }
    if (!error) {
      toast("Saving...", {
        icon: "⌛",
        style: {
          fontFamily: "NATS",
          fontSize: "18px"
        }
      });
      let imageDetails = [];
      files.map((file) => {
        console.log(file);
      });
      const uploaders = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "vel-cars");
        formData.append("cloud_name", "rahul11");
        const data = await fetch(
          "https://api.cloudinary.com/v1_1/rahul11/image/upload",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((res) => res.json())
          .catch((err) => console.log(err));
        console.log(data);
        imageDetails.push({
          imageUrl: data.secure_url,
          fileName: data.public_id,
        });
        return data;
      });
      axios.all(uploaders).then(async () => {
        // setUploadedImage([...imageDetails]);
        console.log(imageDetails);

        const newProduct = {
          name,
          fuel,
          price,
          type,
          transmission,
          kmRunned,
          millage,
          year,
          insured,
          postedDate,
          imageDetails: [...imageDetails],
        };
        console.log(newProduct);
        await axios
          .post("https://vel-cars.herokuapp.com/admin/add-car", newProduct)
          .then((res) => {
            console.log(res.data, res.status);
            if (res.status === 200) {
              setAllProducts([...allProducts, newProduct]);
              toast.success("New Car Added", {
                duration: 3000,
                style: {
                  fontFamily: "NATS",
                  fontSize: "18px"
                }
              });
              navigate("/all-cars");
            }
          })
          .catch((err) => toast.error(err));
      });
    }
  };

  const handlePreviewImg = (img, index) => {
    const updatedPreviewImg = previewImageSrc.filter((pImg) => {
      return pImg !== img;
    });
    const updatedFiles = files.filter((f) => {
      console.log(f.name);
      return f.name !== files[index].name;
    });
    console.log(img);
    console.log(updatedFiles);
    setFiles([...updatedFiles]);
    setPreviewImageSrc([...updatedPreviewImg]);
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
      <form id="car-form">
        <div className="my-form">
          <h3>Add Car Form</h3>
          <div>
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Car Model
            </label>{" "}
            <br />
            <input type="text" ref={nameRef} placeholder="Model Name" />
          </div>
          <br />
          <div>
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Fuel
            </label>
            <br />
            <select name="" id="" ref={fuelRef} placeholder="Select fuel type">
              <option
                style={{ color: "grey" }}
                value=""
                selected
                disabled
                hidden
              >
                Select Fuel Type
              </option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Gas">Gas</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <br />
          <div>
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Price
            </label>
            <br />
            <input
              type="text"
              ref={priceRef}
              placeholder="Enter Price in Rupees"
            />
          </div>
          <br />
          <div>
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Build / Body
            </label>
            <br />
            <input
              type="text"
              ref={typeRef}
              placeholder="Enter body type Eg.SUV"
            />
          </div>
          <br />
          <div
            style={{
              width: "350px",
              alignItems: "center",
              justifyContent: "center",
              // border: "1px solid red",
              verticalAlign: "center",
            }}
            className="transmission"
          >
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Car Transmission{" "}
            </label>
            <br />
            <input
              style={{
                width: "30px",
                height: "30px",
                outline: "none",
                marginBottom: "15px",
              }}
              type="checkbox"
              value="Manual"
              name="transmission"
            />
            <span
              style={{
                fontFamily: "NATS",
                fontSize: "20px",
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "-10px",
              }}
            >
              Manual
            </span>
            <input
              style={{
                width: "30px",
                height: "30px",
                outline: "none",
                marginBottom: "15px",
              }}
              type="checkbox"
              value="Automatic"
              name="transmission"
            />
            <span
              style={{
                fontFamily: "NATS",
                fontSize: "20px",
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "-10px",
              }}
            >
              Automatic
            </span>
          </div>
          <br />
          <div>
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Kilometer Runned
            </label>{" "}
            <br />
            <input
              type="text"
              ref={kmRunnedRef}
              placeholder="Enter kilometers runned"
            />
          </div>
          <br />
          <div>
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Millage
            </label>{" "}
            <br />
            <input type="text" ref={millageRef} placeholder="Enter Millage" />
          </div>
          <br />
          <div>
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Model Year
            </label>{" "}
            <br />
            <input type="text" ref={yearRef} placeholder="Enter year" />
          </div>
          <br />
          <div>
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Insured
            </label>{" "}
            <br />
            <select
              name=""
              id=""
              ref={insuredRef}
              placeholder="Select is car insured"
            >
              <option value="" selected disabled hidden>
                Select is car insured
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <br />
          <div>
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Add Images
            </label>{" "}
            <br />
          <input
            type="file"
            name="file"
            onChange={handleOnChange}
            multiple
            className="upload-file"
          />
          </div>
          {/* <span>Hiii</span> */}
          {previewImageSrc.length > 0 &&
            previewImageSrc.map((img, i) => (
              <div key={i} style={{ display: "grid" }}>
                <img key={i} src={img} alt="" width={300} />
                <br />
                <Button
                  className="btn-danger"
                  onClick={() => handlePreviewImg(img, i)}
                >
                  Delete
                </Button>
                <br />
              </div>
            ))}
          <button className="purple-btn" onClick={handleAddCar}>
            Save
          </button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AddCar;
