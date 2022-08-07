import React, { createRef } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import jwtDecode from "jwt-decode";
import Joi from "joi";
import { MdError } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import registerImg from "../images/Signup-amico.png"
import "./Register.css";
const Register = ({ setWhich }) => {
  const registerUsernameRef = createRef();
  const registerEmailRef = createRef();
  const registerPasswordRef = createRef();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const username = registerUsernameRef.current.value;
    const email = registerEmailRef.current.value;
    const password = registerPasswordRef.current.value;

    const registerCredentials = {
      username,
      email,
      password,
    };

    console.log(registerCredentials);
    //Validation
    const schema = Joi.object({
      username: Joi.string().min(3).max(20).required(),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(8).max(20).required(),
    });

    const { error } = schema.validate(registerCredentials);
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
            background: "#333",
            color: "#fff",
            fontFamily: "NATS"
          },
        }
      );
    }

    if (!error) {
      await axios
        .post("https://vel-cars.herokuapp.com/auth/register", registerCredentials)
        .then((res) => {
          sessionStorage.setItem("token", res.data);
          toast(`Welcome ${jwtDecode(res.data).username}`, {
            icon: "💜",
            style: {
              // borderRadius: "10px",
              // background: "#333",
              // color: "#fff",
              fontWeight: "bolder",
              fontFamily: "NATS"

            },
          });
          navigate("/");
        })
        .catch((err) =>
          toast(err.response.data, {
            icon: <MdError style={{ color: "red" }} />,
            style: {
              // background: "#333",
              // color: "#fff",
              fontFamily: "NATS",
              fontSize: "18px"
            },
          })
        );
    }
  };
  return (
    <div className="register container-fluid form-bg" style={{marginTop: "65px"}}>
      <div className="register-form ">
        <div className="reg-form">
          <h3 style={{ textAlign: "center" }}>Register</h3>
          <div>
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Username
            </label>{" "}
            <br />
            <input
              type="text"
              class="form-control email"
              placeholder="Username"

              ref={registerUsernameRef}
            />
          </div>
          <div>
          <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
            Email
          </label>{" "}
          <br />
          <input
            type="text"
            placeholder="Email Id"
            class="form-control email"
            ref={registerEmailRef}
          />
          </div>
          <div>
          <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
            Password
          </label>{" "}
          <br />
          <input
            type="password"
            placeholder="Password"
            class="form-control"
            ref={registerPasswordRef}
          />
          </div>
          <br />
          <div className="center">
          <Button
            className="purple-btn"
            Style="float:right;width:150px;height:45px"
            onClick={handleRegister}
          >
            Register
          </Button>
          </div>
          <br></br>
          <p Style="text-align:center;font-family: NATS;font-size:18px">
            Already have an account?{" "}
            <span
              onClick={() => setWhich("login")}
              style={{ textDecoration: "underline", cursor: "pointer", color: "purple" }}
            >
              Login Here
            </span>
          </p>
        </div>
      </div>
      <div className="login-img">
        <img src={registerImg} alt=""/>
      </div>
    </div>
  );
};

export default Register;
