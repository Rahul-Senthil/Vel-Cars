import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Pdf from "react-to-pdf";
import { Button } from "react-bootstrap";
import "./Buyerdetail.css";
import "./Style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import pdfbackground from "../images/pdfbackground.jpg";
const BuyerDetails = () => {
  const { id } = useParams();
  const [currentRecord, setCurrentRecord] = useState();

  const ref = React.createRef();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://vel-cars.herokuapp.com/admin/fetch-buyer-record/${id}`)
        .then((res) => {
          setCurrentRecord(res.data);
          console.log(id);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);
  return (
    <div class="" style={{marginTop: "65px", width: "100%"}}>
      {currentRecord && (
        <>
          {/* <div class=" center ">
          <div class="detailbox  container">
            <div class="padding20">
              <div class="shadow1">
                <div class="leftside fontnats">
          <h3 class="lefttextstyle">Buyer Details</h3>
          <p class="lefttextstyle">
            <b>Name:</b>
            {currentRecord.customerName}
          </p>
          <p class="lefttextstyle">
            <b>Phone Number:</b>
            {currentRecord.customerPhone}
          </p>
          <p class="lefttextstyle">
            <b>Address:</b>
            {currentRecord.customerAddress}
          </p>
          <p class="lefttextstyle">
            <b>Car Name:</b>
            {currentRecord.carName}
          </p>
          <p class="lefttextstyle">
            <b>Price:</b>
            {currentRecord.price}
          </p>
          <p class="lefttextstyle">
            <b>Purchased Date:</b>
            {currentRecord.purchasedDate.split("T")[0]}
          </p>
          <p class="lefttextstyle">
            <b>Order Id:</b>
            {currentRecord._id}
          </p>
          <p class="lefttextstyle">
            <b>Car Details:</b>
            <Link to={`/all-cars/${currentRecord.productId}`}>
              <button type="button" class="btn btn-warning lefttextstyle" Style="border-radius:25px;">View Details</button>
            </Link>
          </p>
          <br></br> */}

          {/* <div class=" center ">
          <Pdf targetRef={ref} filename={`Invoice-Bill-${currentRecord._id}.pdf`}>
              {({ toPdf }) => <Button onClick={toPdf} >Download Bill</Button>}
            </Pdf>
            </div>
          
          <br></br>
          </div>
          </div>
          </div>
          </div>
          </div> */}

          <div className="pdf pdfbox ">
            <div ref={ref}>
              <div class="rightside fontnats">
                <div class="righttextstye ">
                  <div class="pdftext">
                    <img src={pdfbackground} alt="" class="righttop" />
                    <div class="rightinner">
                      <p>
                        <b>Name : </b>
                        {currentRecord.customerName}
                      </p>
                      <p>
                        <b>Phone Number : </b>
                        {currentRecord.customerPhone}
                      </p>
                      <p>
                        <b>Address : </b>
                        {currentRecord.customerAddress}
                      </p>
                      <p>
                        <b>Car Model : </b>
                        {currentRecord.carName}
                      </p>
                      <p>
                        <b>Price : </b>
                        {currentRecord.price}
                      </p>
                      <p>
                        <b>Purchased Date : </b>
                        {currentRecord.purchasedDate.split("T")[0]}
                      </p>
                      <p>
                        <b>Order Id : </b>
                        {currentRecord._id}
                      </p>
                      <p>
                        <b>Car Id : </b>
                        {currentRecord.productId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class=" center ">
                  <Pdf
                    targetRef={ref}
                    filename={`Invoice-Bill-${currentRecord._id}.pdf`}
                  >
                    {({ toPdf }) => (
                      <Button onClick={toPdf} style={{fontFamily: "NATS", fontSize: "18px"}}>Download Bill</Button>
                    )}
                  </Pdf>
                </div>
        </>
      )}
    </div>
  );
};

export default BuyerDetails;
