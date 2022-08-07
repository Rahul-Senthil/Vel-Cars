import React from "react";
import { useContext } from "react";
import axios from "axios";
import { ProductContext } from "./ProductContext";
import Joi from "joi";
import { createRef } from "react";
import { MdError } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const NewPassword = () => {
  const { activeUserState } = useContext(ProductContext);
  const [activeUser, setActiveUser] = activeUserState;

  const newPassRef = createRef();
  const confirmPassRef = createRef();

  const handleChangePassword = async () => {
    const newPass = newPassRef.current.value;
    const confirmPass = confirmPassRef.current.value;
    if (newPass !== null && newPass === confirmPass) {
      //Validation
      const schema = Joi.object({
        password: Joi.string().min(8).max(20).required(),
      });
      const { error } = schema.validate({ password: confirmPass });
      if (error) {
        const errorMsg = error.details[0].message;
        console.log(errorMsg);
        let field = errorMsg.substring(
          errorMsg.indexOf('"') + 1,
          errorMsg.lastIndexOf('"')
        );
        field = field.charAt(0).toUpperCase() + field.slice(1);
        const errorDetails = errorMsg.slice(errorMsg.lastIndexOf('"') + 1);
        toast(
          <span>
            <b>{field}</b>
            {errorDetails}
          </span>,
          {
            icon: <MdError style={{ color: "red" }} />,
            style: {
              // background: "#333",
              // color: "#fff",
              fontFamily: "NATS",
              fontSize: "18px",
            },
          }
        );
      } else if (!error) {
        await axios
          .post("http://localhost:8000/auth/change-password", {
            userId: activeUser._id,
            newPassword: confirmPass,
          })
          .then((res) => {
            console.log(res.data);
            toast.success(res.data, {
              style: {
                fontFamily: "NATS",
                fontSize: "18px",
              },
            });
            newPassRef.current.value = "";
            confirmPassRef.current.value = "";
          })
          .catch((err) => console.log(err));
      }
    } else {
      toast.error("Enter the same password", {
        style: {
          fontFamily: "NATS",
          fontSize: "18px",
        },
      });
    }
  };
  return (
    <div className="password-form">
      <h3>Change Password ?</h3>
      <div>
        <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
          New Password
        </label>{" "}
        <br />
        <input
          type="password"
          placeholder="Enter New Password"
          class="form-control"
          ref={newPassRef}
        />
      </div>
      <br />
      <div>
        <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
          Confirm New Password
        </label>{" "}
        <br />
        <input
          type="password"
          placeholder="Enter the password again"
          class="form-control"
          ref={confirmPassRef}
        />
      </div>
      <br />
      <button className="btn btn-dark" onClick={handleChangePassword}>
        Save Password
      </button>
    </div>
  );
};

export default NewPassword;
