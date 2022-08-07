import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import empty from "../../images/gif/empty.gif";
import "../Style.css";
const BuyerRecord = () => {
  const [buyersRecord, setBuyersRecord] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:8000/admin/fetch-buyer-records")
        .then((res) => {
          setBuyersRecord(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const handleDeleteRecord = async (id) => {
    await axios
      .delete(`http://localhost:8000/admin/delete-buyer-record/${id}`)
      .then((res) => {
        console.log(res.data);
        toast.success("Record Deleted");
        const recordsAfterDeletion = buyersRecord.filter((record) => {
          return record._id !== id;
        });
        setBuyersRecord(recordsAfterDeletion);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="record-details">
      <Link to="/buyer-records/add-buyer-record">
        <button
          type="button"
          class="btn btn-primary"
          Style="margin-left:5%;margin-top:10px;margin-bottom:10px;"
        >
          Add Buyer's Record
        </button>
      </Link>
      {buyersRecord.length !== 0 ? (
        <div Style="overflow-x:auto;">
          <div class="container-fluid center table_response">
            <table class="table table-striped">
              <thead>
                <tr Style="background-color:#CEE5D0;border-radius:25px">
                  <th scope="col">Sl.No</th>
                  <th scope="col">Car Name</th>
                  <th scope="col">Car Price</th>
                  <th scope="col">Purchased Date</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Address</th>
                  <th scope="col">Customer Phone Number</th>
                  <th scope="col">View Full Car Details</th>
                  <th scope="col">View Buyer Details</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {buyersRecord.map((b, i) => (
                <tr
                  key={i}
                  Style="border-radius:15px;padding-top:25px;font-size:22px;"
                  class="fontnats"
                >
                  <th Style="padding-top:20px;" scope="row">
                    {i + 1}
                  </th>
                  <td Style="padding-top:20px;">{b.carName}</td>
                  <td Style="padding-top:20px;">{b.price}</td>
                  <td Style="padding-top:20px;">
                    {b.purchasedDate.split("T")[0]}
                  </td>
                  <td Style="padding-top:20px;">{b.customerName}</td>
                  <td Style="padding-top:20px;">{b.customerAddress}</td>
                  <td Style="padding-top:20px;">{b.customerPhone}</td>
                  <td Style="padding-top:20px;">
                    <Link to={`/all-cars/${b.productId._id}`}>
                      <button
                        type="button"
                        class="btn btn-warning"
                        Style="width:120px;border-radius:10px;font-size:18px;"
                      >
                        View Details
                      </button>
                    </Link>
                  </td>
                  <td Style="padding-top:20px;">
                    <Link to={`/buyer-records/buyer-details/${b._id}`}>
                      <button
                        type="button"
                        class="btn btn-success"
                        Style="width:120px;border-radius:10px;font-size:18px;"
                      >
                        Buyer Details
                      </button>
                    </Link>
                  </td>
                  <td Style="padding-top:20px;">
                    <Link to={`/buyer-records/edit/${b._id}`}>
                      <button Style="width:90px;height:40px;border:none;border-radius:10px;font-size:18px;background-color:#12c2e9">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td Style="padding-top:20px;">
                    <div onClick={() => handleDeleteRecord(b._id)}>
                      <button Style="width:90px;height:40px;border:none;border-radius:10px;font-size:18px;background-color:#db2f69;color:white">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      ) : (
        // <h2>No Record found</h2>
        <p>
          <h1 class="center fontnats">No records found !!!</h1>
          <img
            src={empty}
            class="center"
            Style="display: block;margin-left: auto;margin-right: auto;width: 50%;"
            alt=""
          />{" "}
        </p>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default BuyerRecord;
