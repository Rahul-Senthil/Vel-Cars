import React from "react";
import ModelFilter from "./Filters/ModelFilter";
import FuelFilter from "./Filters/FuelFilter";
import PriceFilter from "./Filters/PriceFilter";
import KmFilter from "./Filters/KmFilter";
import TransmissionFilter from "./Filters/TransmissionFilter";
import YearFilter from "./Filters/YearFilter";
import IsinsuredFilter from "./Filters/IsinsuredFilter";

const Filters = () => {
  return (
    <div>
      <hr />
      <ModelFilter />
      <hr />
      <FuelFilter />
      <hr />
      <PriceFilter />
      <hr />
      <KmFilter />
      <hr />
      <TransmissionFilter />
      <hr />
      <YearFilter />
      <hr />
      <IsinsuredFilter />
    </div>
  );
};

export default Filters;
