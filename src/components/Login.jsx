import React, { createRef } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import jwtDecode from "jwt-decode";
import Joi from "joi";
import { MdError } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import loginImg from "../images/Login-amico.png";
import "./Login.css";
const Login = ({ setWhich }) => {
  const loginEmailRef = createRef();
  const loginPasswordRef = createRef();

  const navigate = useNavigate();

  const handleLogin = async () => {
    const email = loginEmailRef.current.value;
    const password = loginPasswordRef.current.value;

    const loginCredentials = {
      email,
      password,
    };
    console.log(loginCredentials);

    //Validation
    const schema = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@_]{8,20}$")),
    });

    const { error } = schema.validate(loginCredentials);
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
    }

    if (!error) {
      await axios
        .post("http://localhost:8000/auth/login", loginCredentials)
        .then((res) => {
          sessionStorage.setItem("token", res.data);
          toast(`Welcome ${jwtDecode(res.data).username}`, {
            icon: "💜",
            style: {
              // borderRadius: "10px",
              // fontWeight: "bolder",
              fontFamily: "NATS",
              fontSize: "18px",
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
    <div className="login container-fluid form-bg" style={{marginTop: "65px"}}>
      <div className=" login-form ">
        <div className=" log-form">
          <h3 style={{ textAlign: "center" }}>Login</h3>
          <div>
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Email
            </label>{" "}
            <br />
            <input
              type="text"
              class="form-control email"
              placeholder="Email Id"
              ref={loginEmailRef}
              defaultValue="bella@gmail.com"
            />
          </div>
          {/* <br /> */}
          <div>
            <label htmlFor="" style={{ fontFamily: "NATS", fontSize: "18px" }}>
              Password
            </label>{" "}
            <br />
            <input
              type="password"
              placeholder="Password"
              class="form-control"
              ref={loginPasswordRef}
              defaultValue="bella@12"
            />
          </div>
          <br />
          <div className="center">
            <Button
              className="purple-btn"
              Style="float:center;width:150px;height:45px"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
          <br></br>
          <p Style="text-align:center;font-family: NATS;font-size:18px">
            Doesn't have an account?{" "}
            <span
              onClick={() => setWhich("register")}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "purple",
              }}
            >
              Register Here
            </span>
          </p>
        </div>
      </div>
      <div className="login-img">
        <img src={loginImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
