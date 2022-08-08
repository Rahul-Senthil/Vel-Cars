import axios from "axios";
import React, { createRef, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";
import sha1 from "sha1";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { MdError } from "react-icons/md";

const EditCar = () => {
  const { allProductsState } = useContext(ProductContext);
  const [allProducts] = allProductsState;
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentProduct, setCurrentProduct] = useState({});
  const [files, setFiles] = useState([]);
  const [previewImageSrc, setPreviewImageSrc] = useState([]);
  const [uploadedImage, setUploadedImage] = useState([]);
  const [toDeleteImg, setToDeleteImg] = useState([]);
  const [transmission, setTransmission] = useState([]);

  useEffect(() => {
    const fetchCurrentProduct = async () => {
      await axios
        .get(`https://vel-cars.herokuapp.com/common/fetch-specific-car/${id}`)
        .then((res) => {
          setCurrentProduct(res.data);
          setUploadedImage([...res.data.imageDetails]);
          setTransmission([...res.data.transmission]);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchCurrentProduct();
  }, []);

  const nameRef = createRef();
  const fuelRef = createRef();
  const priceRef = createRef();
  const typeRef = createRef();
  const kmRunnedRef = createRef();
  const millageRef = createRef();
  const yearRef = createRef();
  const insuredRef = createRef();

  const inputStyle = {
    width: "350px",
    height: "35px",
    outline: "none",
    marginBottom: "15px",
  };

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

  const handleUpdateCar = async (e) => {
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
    const toUpdateImage = [...uploadedImage, ...files];
    // console.log(toUpdateImage);
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
      toUpdateImage: Joi.array().min(1).max(4).required(),
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
      toUpdateImage,
    });
    // console.log(error.details[0].message);
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
          imageDetails: [...uploadedImage, ...imageDetails],
        };
        console.log(newProduct);
        await axios
          .post(`https://vel-cars.herokuapp.com/admin/edit-car/${id}`, newProduct)
          .then((res) => {
            console.log(res.data, res.status);
            if (res.status === 200) {
              toast.success("Updated Successfully", {
                duration: 3000,
                style: {
                  fontFamily: "NATS",
                  fontSize: "18px"
                }
              });
              toDeleteImg.map(async (img) => {
                const timestamp = new Date().getTime();
                const string = `public_id=${img.fileName}&timestamp=${timestamp}623Yb4xio1THXjDkVDqRjKrsX8Q`;
                const signature = sha1(string);
                const formData = new FormData();
                formData.append("public_id", img.fileName);
                formData.append("signature", signature);
                formData.append("api_key", 882296376685376);
                formData.append("timestamp", timestamp);
                const res = await axios
                  .post(
                    "https://api.cloudinary.com/v1_1/rahul11/image/destroy",
                    formData
                  )
                  .then((res) => res)
                  .catch((err) => console.log(err));
              });
              navigate(`/all-cars/${id}`);
            }
          })
          .catch((err) => toast.error(err));
      });
    }
  };

  const handleDeleteUploadedImg = (fileName) => {
    const updatedUploadedImg = uploadedImage.filter((img) => {
      return fileName !== img.fileName;
    });
    const toDelete = uploadedImage.filter((img) => {
      return fileName === img.fileName;
    });
    console.log(updatedUploadedImg);
    setUploadedImage([...updatedUploadedImg]);
    setToDeleteImg([...toDelete]);
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
      {currentProduct ? (
        <form id="car-form">
          <div className="my-form">
            <h3>Update Car Form</h3>
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
                placeholder="Model Name"
                defaultValue={currentProduct.name}
              />
            </div>
            <br />
            <div>
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
                Fuel
              </label>
              <br />
              <select
                name=""
                id=""
                ref={fuelRef}
                placeholder="Select fuel type"
              >
                <option value="" selected disabled hidden>
                  Select Fuel Type
                </option>
                {currentProduct.fuel === "Petrol" ? (
                  <option value="Petrol" selected>
                    Petrol
                  </option>
                ) : (
                  <option value="Petrol">Petrol</option>
                )}
                {currentProduct.fuel === "Diesel" ? (
                  <option value="Diesel" selected>
                    Diesel
                  </option>
                ) : (
                  <option value="Diesel">Diesel</option>
                )}
                {currentProduct.fuel === "Gas" ? (
                  <option value="Gas" selected>
                    Gas
                  </option>
                ) : (
                  <option value="Gas">Gas</option>
                )}
                {currentProduct.fuel === "Electric" ? (
                  <option value="Electric" selected>
                    Electric
                  </option>
                ) : (
                  <option value="Electric">Electric</option>
                )}
                {currentProduct.fuel === "Hybrid" ? (
                  <option value="Hybrid" selected>
                    Hybrid
                  </option>
                ) : (
                  <option value="Hybrid">Hybrid</option>
                )}
              </select>
            </div>
            <br />
            <div>
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
                Price
              </label>
              <br />
              <input
                type="text"
                ref={priceRef}
                placeholder="Enter Price in Rupees"
                defaultValue={currentProduct.price}
              />
            </div>
            <br />
            <div>
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
                Build / Body
              </label>
              <br />
              <input
                type="text"
                ref={typeRef}
                placeholder="Enter body type Eg.SUV"
                defaultValue={currentProduct.type}
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
            >
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
                Car Transmission{" "}
              </label>
              <br />
              {transmission.includes("Manual") ? (
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
                  defaultChecked
                />
              ) : (
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
              )}
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
              {transmission.includes("Automatic") ? (
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
                  defaultChecked
                />
              ) : (
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
              )}

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
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
                Kilometer Runned
              </label>{" "}
              <br />
              <input
                type="text"
                ref={kmRunnedRef}
                placeholder="Enter kilometers runned"
                defaultValue={currentProduct.kmRunned}
              />
            </div>
            <br />
            <div>
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
                Millage
              </label>{" "}
              <br />
              <input
                type="text"
                ref={millageRef}
                placeholder="Enter Millage"
                defaultValue={currentProduct.millage}
              />
            </div>
            <br />
            <div>
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
                Model Year
              </label>{" "}
              <br />
              <input
                type="text"
                ref={yearRef}
                placeholder="Enter year"
                defaultValue={currentProduct.year}
              />
            </div>
            <br />
            <div>
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
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
                {currentProduct.insured === "Yes" ? (
                  <option value="Yes" selected>
                    Yes
                  </option>
                ) : (
                  <option value="Yes">Yes</option>
                )}
                {currentProduct.insured === "No" ? (
                  <option value="No" selected>
                    No
                  </option>
                ) : (
                  <option value="No">No</option>
                )}
              </select>
            </div>
            <br />
            <div>
              <label
                htmlFor=""
                style={{ fontFamily: "NATS", fontSize: "18px" }}
              >
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
            <br />
            {previewImageSrc.length > 0 &&
              previewImageSrc.map((img, i) => (
                <div key={i} style={{ display: "grid" }}>
                  <img src={img} alt="" width={300} />
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
            <br />
            {uploadedImage &&
              uploadedImage.map((imageDetail, i) => (
                <div key={i} style={{ display: "grid" }}>
                  <img src={imageDetail.imageUrl} alt="" width={300} />
                  <br />
                  <Button
                    className="btn-danger"
                    onClick={() =>
                      handleDeleteUploadedImg(imageDetail.fileName)
                    }
                  >
                    Delete
                  </Button>
                  <br />
                </div>
              ))}
            <button className="purple-btn" onClick={handleUpdateCar}>
              Save
            </button>
          </div>
        </form>
      ) : (
        <h1>Loading</h1>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default EditCar;
