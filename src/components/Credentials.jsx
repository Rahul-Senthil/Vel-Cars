import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

import Login from "./Login";
import Register from "./Register";

const Credentials = () => {
  const [which, setWhich] = useState("login");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {which === "login" ? <Login setWhich={setWhich}/> : <Register setWhich={setWhich}/>}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Credentials;
