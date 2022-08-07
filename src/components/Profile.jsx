import React from "react";
import toast, { Toaster } from "react-hot-toast";
import changePassImg from "../images/changepass.png";
import deleteAccImg from "../images/deleteacc.png";
import NewPassword from "./NewPassword";
import { createRef } from "react";
import { useContext } from "react";
import axios from "axios";
import { ProductContext } from "./ProductContext";
import { useNavigate } from "react-router-dom";
import "./Style.css";

const Profile = () => {
    const { activeUserState } = useContext(ProductContext);
    const [activeUser, setActiveUser] = activeUserState;

    const deleteRef = createRef();
    const navigate = useNavigate();

    const handleDeleteAccount = async() => {
        const isDelete = deleteRef.current.value;
        if(isDelete === "Delete Account"){
            await axios
          .post("http://localhost:8000/user/delete-account", {
            userId: activeUser._id,
          })
          .then((res) => {
            console.log(res.data);
            toast.success(res.data, {
              style: {
                fontFamily: "NATS",
                fontSize: "18px",
              },
            });
            deleteRef.current.value = "";
            sessionStorage.clear();
            setActiveUser(null);
            navigate("/");
          })
          .catch((err) => console.log(err));
        }
        else{
            toast.error("Enter correct words", {
                style: {
                  fontFamily: "NATS",
                  fontSize: "18px",
                },
              });
        }
    }
  return (
    <div style={{marginTop: "65px"}}>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="admin-banner bg-dark">
        <div>
        <span style={{ color: "#db2f69", marginRight: "30px" }}>USER </span>
        PROFILE
            <h3 className="text-center">Hi <span style={{color: "#12c2e9"}}>{activeUser.username } :)</span></h3>
        </div>
      </div>

      <div className="change-password">
        <div className="change-pass-img">
          <img src={changePassImg} alt="" />
        </div>
        <div className="new-password">
          <NewPassword/>
        </div>
      </div>

      <div className="delete-account">
        <div className="delete-acc">
            <div>
        <h3>Delete Account ?</h3>
      <div>
        <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
          Enter as Delete Account to Delete your Account
        </label>{" "}
        <br />
        <input
          type="text"
          placeholder="Enter Delete Account"
          class="form-control"
          ref={deleteRef}
        />
        
      </div>
      <br />
      <button className="btn btn-dark" onClick={handleDeleteAccount}>
        Confirm
      </button>
      </div>
        </div>
        <div className="del-acc-img">
            <img src={deleteAccImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
