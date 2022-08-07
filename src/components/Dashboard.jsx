import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import admin1Img from "../images/admin1.png";
import adminImg from "../images/admin.png";
import toast, { Toaster } from "react-hot-toast";
import NewPassword from "./NewPassword";
import "./Style.css";

const Dashboard = () => {
  return (
    <div class="dashboardsize" style={{marginTop: "65px"}}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="admin-banner bg-dark">
        <span style={{ color: "#db2f69", marginRight: "30px" }}>ADMIN </span>
        DASHBOARD
      </div>

      <div class="blurspace dashboard-activity">
        <h3 className="text-center">Add Entries</h3>
        <div class="container adminspace">
          {/* <div class="col-md-4"> */}
          <div>
            <Link to="/add-car">
              {" "}
              <div class="adminbox a1 shadow p-3 mb-5">
                {/* <p>
                  <IoAddCircleSharp
                    style={{ width: "30px", fontSize: "700" }}
                  />{" "}
                </p> */}
                <p class="admintext text-center">Add New Car</p>
                {/* <HiPlusSm class="addcircle"/> */}
              </div>
            </Link>
            {/* </div> */}
            {/* <div class="col-md-4"> */}
            <Link to="/seller-records/add-seller-record">
              <div class="adminbox a1 shadow p-3 mb-5">
                {/* <p>
                  <TiDocumentAdd style={{ width: "30px", fontSize: "700" }} />{" "}
                </p> */}
                <p class="admintext text-center">Add Seller Record</p>
              </div>
            </Link>
            {/* </div> */}
            {/* <div class="col-md-4"> */}
            <Link to="/buyer-records/add-buyer-record">
              <div class="adminbox a1 shadow p-3 mb-5">
                {/* <p>
                  <TiDocumentAdd style={{ width: "30px", fontSize: "700" }} />{" "}
                </p> */}
                <p class="admintext text-center">Add Buyer record</p>
              </div>
            </Link>
          </div>
          {/* </div> */}
          <div className="admin-img">
            <img src={admin1Img} alt="" width={600} />
          </div>
        </div>
      </div>

      <div className="blurspace records dashboard-activity">
        <h3 className="text-center">Customer's Records</h3>
        <div class="container adminspace">
          <div className="admin-img">
            <img src={adminImg} alt="" />
          </div>
          <div style={{ marginTop: "30px" }}>
            <Link to="/seller-records">
              <div class="adminbox a2 shadow p-3 mb-5">
                <p class="admintext text-center">Seller's Record</p>
              </div>
            </Link>

            <Link to="/buyer-records">
              <div class="adminbox a2 shadow p-3 mb-5">
                <p class="admintext text-center">Buyer's Record</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="change-password admin-change-pass" style={{backgroundColor: "#12c2e9"}}>
      <NewPassword/>
      </div>
    </div>
  );
};

export default Dashboard;
