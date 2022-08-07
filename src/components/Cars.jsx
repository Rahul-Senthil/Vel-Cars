import React, { Component } from "react";
import axios from "axios";
import Filters from "./Filters";
import CarsList from "./CarsList";
import { useEffect, useContext, useState } from "react";
import { ProductContext } from "./ProductContext";
import jwtDecode from "jwt-decode";
import Emptyview from "./Emptyview";
import { Button } from "react-bootstrap";
import empty from "../images/gif/empty.gif";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { BsFilterLeft } from "react-icons/bs";
import { Collapse } from "react-collapse";
import { FaTimes } from "react-icons/fa";
import "./Style.css";
const Cars = () => {
  const {
    allProductsState,
    carModelsState,
    modelFilterState,
    fuelFilterState,
    priceFilterState,
    kmFilterState,
    transmissionFilterState,
    yearFilterState,
    isInsuredFilterState,
    handleModel,
    handleFuel,
    handlePrice,
    handleKm,
    handleTransmission,
    handleYearToNull,
    handleIsInsured,
    activeUserState,
    filteredProductsState,
    handleClearAllFilters,
  } = useContext(ProductContext);
  const [allProducts, setAllProducts] = allProductsState;
  const [carModels, setCarModels] = carModelsState;
  const [filteredProducts, setFilteredProducts] = filteredProductsState;

  const [activeUser, setActiveUser] = activeUserState;

  //filter states
  const [modelFilter, setModelFilter] = modelFilterState;
  const [fuelFilter, setFuelFilter] = fuelFilterState;
  const [priceFilter, setPriceFilter] = priceFilterState;
  const [kmFilter, setKmFilter] = kmFilterState;
  const [transmissionFilter, setTransmissionFilter] = transmissionFilterState;
  const [yearFilter, setYearFilter] = yearFilterState;
  const [isInsuredFilter, setIsInsuredFilter] = isInsuredFilterState;

  useEffect(() => {
    const fetchProductsData = async () => {
      await axios
        .get("https://vel-cars.herokuapp.com/common/fetch-all-cars")
        .then((res) => {
          setAllProducts(res.data);
          if (filteredProducts.length === 0) {
            setFilteredProducts(res.data);
          }
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    const fetchCarModelsData = async () => {
      await axios
        .get("https://vel-cars.herokuapp.com/admin/fetch-car-models")
        .then((res) => {
          setCarModels(res.data.sort());
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    const fetchActiveUser = async () => {
      const token = sessionStorage.getItem("token");
      token ? setActiveUser(jwtDecode(token)) : setActiveUser(null);
    };
    fetchProductsData();
    fetchCarModelsData();
    fetchActiveUser();
  }, [setAllProducts, setCarModels]);

  useEffect(() => {
    console.log("im running");
    let updatedData = allProducts;
    if (modelFilter.length > 0) {
      updatedData = updatedData.filter((p) => {
        return modelFilter.includes(p.name);
      });
    }
    console.log(updatedData);

    if (fuelFilter.length > 0) {
      updatedData = updatedData.filter((p) => {
        return fuelFilter.includes(p.fuel);
      });
    }
    console.log(updatedData);

    if (priceFilter) {
      const from = priceFilter.split("-")[0].trim();
      const to = priceFilter.split("-")[1].trim();
      updatedData = updatedData.filter((p) => {
        return (
          parseInt(p.price) >= parseInt(from) &&
          parseInt(p.price) <= parseInt(to)
        );
      });
    }
    console.log(updatedData);

    if (kmFilter) {
      const from = kmFilter.split("-")[0].trim();
      const to = kmFilter.split("-")[1].trim();
      updatedData = updatedData.filter((p) => {
        return p.kmRunned >= parseInt(from) && p.kmRunned <= parseInt(to);
      });
    }
    console.log(updatedData);

    if (transmissionFilter) {
      updatedData = updatedData.filter((p) => {
        return p.transmission.includes(transmissionFilter);
      });
    }
    console.log(updatedData);

    if (yearFilter.from && yearFilter.to) {
      updatedData = updatedData.filter((p) => {
        return (
          parseInt(p.year) >= parseInt(yearFilter.from) &&
          parseInt(p.year) <= parseInt(yearFilter.to)
        );
      });
    }
    console.log(updatedData);

    if (isInsuredFilter) {
      updatedData = updatedData.filter((p) => {
        return p.insured === "Yes";
      });
    }
    console.log(updatedData);

    setFilteredProducts([...updatedData]);
  }, [
    modelFilter,
    fuelFilter,
    priceFilter,
    kmFilter,
    transmissionFilter,
    yearFilter,
    isInsuredFilter,
  ]);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 555px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 555px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const [isFilterToggled, setIsFilterToggled] = useState(false);
  const [mystyle, setMystyle] = useState("filterstylecollapse");
  // const [mystyle1,setMystyle1]=useState("filterboxcollapse")
  const handleFilterToggle = () => {
    isFilterToggled ? setIsFilterToggled(false) : setIsFilterToggled(true);
    isFilterToggled
      ? setMystyle("filterstyle")
      : setMystyle("filterstylecollapse");
    // isFilterToggled?setMystyle1("filterboxcollapse"):setMystyle1("filterbox");
  };

  return (
    <div style={{marginTop: "65px"}}>
      <div
        // style={{ display: "flex" }}
        class="carspagestyle"
      >
        {/*Filters Start*/}
        <div
          style={{
            border: "1px solid black",
            height: "auto",
          }}
          class="filterboxcollapse"
        >
          <div onClick={handleFilterToggle} style={{ marginTop: "15px" }}>
            <h4 className="filter-title">
              FILTERS <BsFilterLeft style={{ float: "right" }} />
            </h4>
          </div>

          {/* <Collapse isOpened="{isFilterToggled}">
          <div>
          <a href="javascript:void(0)" class="closebtn" onclick="{handleFilterToggle}">&times;</a> 
          <div
          style={{
            overflow: "auto",
            height: "600px",
          }}>
            <Filters />
          </div>
          <div>
          <div class="carbuttonfixed center">
              <Button className="btn-primary " Style="border-radius:0px;width:100%;"onClick={handleClearAllFilters}>
                Clear All Filters
              </Button>
            </div></div>
            </div>
            </Collapse>
             */}

          {matches && (
            <div className="filters">
              <div
                style={{
                  overflow: "auto",
                  // height: "600px",
                  height: "78.5vh",
                  width: "100%",
                }}
              >
                <Filters />
              </div>
              <div>
                <div class="carbuttonfixed center">
                  <Button
                    style={{
                      borderRadius: "0px",
                      width: "100%",
                      marginBottom: "0px",
                      background: "#000000",
                      background:
                        "-webkit-linear-gradient(to right,#434343,#000000)" /* Chrome 10-25, Safari 5.1-6 */,
                      background: "linear-gradient(to right,#434343,#000000)",
                      fontFamily: "NATS",
                      fontSize: "18px",
                      color: "white",
                      border: "none"

                    }}
                    onClick={handleClearAllFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
          {!matches && (
            <Collapse isOpened={isFilterToggled}>
              <div className="filters">
                <div
                  // style={{
                  //   overflow: "auto",
                  //   height: "500px",
                  //   width:"300px",
                  //   zIndex:"99",

                  // }}
                  class={mystyle}
                >
                  <Filters />
                </div>
                <div>
                  <div class="carbuttonfixed center">
                    <Button
                      style={{
                        borderRadius: "0px",
                        width: "100%",
                        marginBottom: "0px",
                        background: "#000000",
                        background:
                          "-webkit-linear-gradient(to right,#434343,#000000)" /* Chrome 10-25, Safari 5.1-6 */,
                        background: "linear-gradient(to right,#434343,#000000)",
                        fontFamily: "NATS",
                        fontSize: "18px",
                        color: "white",
                        border: "none"
                      }}
                      onClick={handleClearAllFilters}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              </div>
            </Collapse>
          )}
        </div>
        {/*Filters End*/}

        {/*Cars Start*/}
        <div>
          {/*Filters selected Start*/}
          <div class="currentfilter_space">
            <div style={{display: "flex", flexWrap: "wrap"}}>
              {modelFilter.length > 0 &&
                modelFilter.map((mf, i) => (
                  <div class="currentfilter">
                    <span key={i} onClick={() => handleModel(mf)}>
                      model: {mf} <FaTimes style={{ fontSize: "12px" }} />
                    </span>
                  </div>
                ))}
              {fuelFilter.length > 0 &&
                fuelFilter.map((ff, i) => (
                  <div class="currentfilter">
                    <span key={i} onClick={() => handleFuel(ff)}>
                      fuel: {ff} <FaTimes style={{ fontSize: "12px" }} />
                    </span>
                  </div>
                ))}
              {priceFilter && (
                <div class="currentfilter">
                  <span onClick={() => handlePrice(priceFilter)}>
                    price: {priceFilter}{" "}
                    <FaTimes style={{ fontSize: "12px" }} />
                  </span>
                </div>
              )}
              {kmFilter && (
                <div class="currentfilter">
                  <span onClick={() => handleKm(kmFilter)}>
                    {kmFilter} Km <FaTimes style={{ fontSize: "12px" }} />
                  </span>
                </div>
              )}
              {transmissionFilter && (
                <div class="currentfilter">
                  <span onClick={() => handleTransmission(transmissionFilter)}>
                    transmission: {transmissionFilter}{" "}
                    <FaTimes style={{ fontSize: "12px" }} />
                  </span>
                </div>
              )}
              {yearFilter.from && yearFilter.to && (
                <div class="currentfilter">
                  <span onClick={handleYearToNull}>
                    from: {yearFilter.from} to: {yearFilter.to}{" "}
                    <FaTimes style={{ fontSize: "12px" }} />
                  </span>
                </div>
              )}
              {isInsuredFilter && (
                <div class="currentfilter">
                  <span onClick={() => handleIsInsured(isInsuredFilter)}>
                    Insured <FaTimes style={{ fontSize: "12px" }} />
                  </span>
                </div>
              )}
            </div>
          </div>
          {/*Filters selected End*/}

          {/*Cars List Start*/}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              // justifyContent: "space-around",
              overflowX: "hidden",
              // border: "1px solid red",
              padding: "10px",
            }}
            className="car-list"
          >
            {filteredProducts.length !== 0 ? (
              filteredProducts.map((product, index) =>
                activeUser?.isAdmin ? (
                  <CarsList
                    product={product}
                    index={index}
                    key={index}
                    sold={product.sold}
                  />
                ) : (
                  !product.sold && (
                    <CarsList
                      product={product}
                      index={index}
                      key={index}
                      sold={false}
                    />
                  )
                )
              )
            ) : (
              // <h1>No results found :)</h1>
              <Emptyview />
              // <p ><h2 class="center fontnats">No results found !!!</h2><img src={empty} class="center" Style="display: block;margin-left: auto;margin-right: auto;width: 50%;" alt='' /> </p>
            )}
          </div>
          {/*Cars List End*/}
        </div>
        {/*Cars Start*/}
      </div>
    </div>
  );
};

export default Cars;
