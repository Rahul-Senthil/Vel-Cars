import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Fragment } from "react";
import Navbar from "./components/Navbar";
import Cars from "./components/Cars";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Wishlist from "./components/Wishlist";
import Profile from "./components/Profile";
import AddCar from "./components/AddCar";
import EditCar from "./components/EditCar";
import CarDetails from "./components/CarDetails";
import SellerRecord from "./components/Records/SellerRecord";
import AddSellerRecord from "./components/Records/AddSellerRecord";
import EditSellerRecord from "./components/Records/EditSellerRecord";
import BuyerRecord from "./components/Records/BuyerRecord";
import AddBuyerRecord from "./components/Records/AddBuyerRecord";
import EditBuyerRecord from "./components/Records/EditBuyerRecord";
import Credentials from "./components/Credentials";
import Footer from "./components/Footer";
import { ProductProvider } from "./components/ProductContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dropzone-uploader/dist/styles.css";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import UserProtected from "./components/UserProtected";
import AdminProtected from "./components/AdminProtected";
import BuyerDetails from "./components/BuyerDetails";

function App() {
  // const [activeUser, setActiveUser] = useState();
  // useEffect(() => {
  //   const fetchActiveUser = async () => {
  //     const token = sessionStorage.getItem("token");
  //     token ? setActiveUser(jwtDecode(token)) : setActiveUser(null);
  //   };
  //   fetchActiveUser();
  // }, []);
  return (
    <Fragment>
      <ProductProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-cars" element={<Cars />} />
          <Route path="/all-cars/:id" element={<CarDetails />} />
          <Route
            path="/about-us"
            element={
              <About/>
            }
          />
          <Route
            path="/wishlist"
            element={
              <UserProtected>
                <Wishlist />
              </UserProtected>
            }
          />
          <Route
            path="/user-profile"
            element={
              <UserProtected>
                <Profile />
              </UserProtected>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AdminProtected>
                <Dashboard />
              </AdminProtected>
            }
          />
          <Route
            path="/add-car"
            element={
              <AdminProtected>
                <AddCar />
              </AdminProtected>
            }
          />
          <Route
            path="/update-car/:id"
            element={
              <AdminProtected>
                <EditCar />
              </AdminProtected>
            }
          />
          <Route
            path="/seller-records"
            element={
              <AdminProtected>
                <SellerRecord />
              </AdminProtected>
            }
          />
          <Route
            path="/seller-records/add-seller-record"
            element={
              <AdminProtected>
                <AddSellerRecord />
              </AdminProtected>
            }
          />
          <Route
            path="/seller-records/edit/:id"
            element={
              <AdminProtected>
                <EditSellerRecord />
              </AdminProtected>
            }
          />
          <Route
            path="/buyer-records"
            element={
              <AdminProtected>
                <BuyerRecord />
              </AdminProtected>
            }
          />
          <Route
            path="/buyer-records/add-buyer-record"
            element={
              <AdminProtected>
                <AddBuyerRecord />
              </AdminProtected>
            }
          />
          <Route
            path="/buyer-records/edit/:id"
            element={
              <AdminProtected>
                <EditBuyerRecord />
              </AdminProtected>
            }
          />
          <Route
            path="/buyer-records/buyer-details/:id"
            element={
              <AdminProtected>
                <BuyerDetails />
              </AdminProtected>
            }
          />
          <Route path="/login" element={<Credentials />} />
        </Routes>
        <Footer/>
      </ProductProvider>
    </Fragment>
  );
}

export default App;
