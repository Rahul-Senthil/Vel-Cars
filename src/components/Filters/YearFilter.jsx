import React, { useState, useContext } from "react";
import { ProductContext } from "../ProductContext";
import { Collapse } from "react-collapse";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const YearFilter = () => {
  const {
    yearFromRef,
    yearToRef,
    handleYear,
    handleYearToNull,
    isYearFilterToggledState,
  } = useContext(ProductContext);

  const [isYearFilterToggled, setIsYearFilterToggled] =
  useState(false);
  const [emoji, setEmoji] = useState("down");
  const handleYearFilterToggle = () => {
    isYearFilterToggled
      ? setIsYearFilterToggled(false)
      : setIsYearFilterToggled(true);
      emoji === "down" ? setEmoji("up") : setEmoji("down");
  };

  return (
    <div >
       {emoji === "down" ? (
        <h4>
          <span class="buttons" onClick={handleYearFilterToggle}>
            Year
            <h4 class="float_right" Style="font-weight:550;font-size:20px;">
            <FaAngleDown/>
            </h4>
          </span>
        </h4>
      ) : (
        <h4>
          <span class="buttons" onClick={handleYearFilterToggle}>
            Year
            <h4 class="float_right" Style="font-weight:550;font-size:20px;">
            <FaAngleUp/>
            </h4>
          </span>
        </h4>
      )}
      <Collapse isOpened={isYearFilterToggled}>
        <div class="form-group yearfilterstyle" Style="width:300px;">
          <div class="yearinputgrp center">
        <input
        class="form-control"
          type="text"
          ref={yearFromRef}
          style={{ width: "100px" }}
          placeholder={2000}
        />
        <span>to</span>
        <input
        class="form-control"
          type="text"
          ref={yearToRef}
          style={{ width: "100px" }}
          placeholder={2022}
        />
        </div>
        <div class="yearbtngrp center">
        <button class="yearapply" onClick={handleYear}>Apply</button>
        <button  class="yearclear"onClick={handleYearToNull}>Clear Filter</button>
        </div>

        </div>
      </Collapse>
    </div>
  );
};

export default YearFilter;
