import React, { useState, useContext } from "react";
import { ProductContext } from "../ProductContext";
import { Collapse } from "react-collapse";
import "./Styles.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
const FuelFilter = () => {
  const {
    carFuelsState,
    isFuelFilterCheckedState,
    handleFuel,
    isFuelFilterToggledState,
  } = useContext(ProductContext);
  const [carFuels] = carFuelsState;
  const [isFuelFilterChecked] = isFuelFilterCheckedState;

  const [isFuelFilterToggled, setIsFuelFilterToggled] = useState(false);
  const [emoji, setEmoji] = useState("down");
  const handleFuelFilterToggle = () => {
    isFuelFilterToggled
      ? setIsFuelFilterToggled(false)
      : setIsFuelFilterToggled(true);
    emoji === "down" ? setEmoji("up") : setEmoji("down");
  };

  return (
    <div>
      {emoji === "down" ? (
        <h4>
          <span class="buttons" onClick={handleFuelFilterToggle}>
            Fuel
            <h4 class="float_right" Style="font-weight:550;font-size:20px;">
            <FaAngleDown/>
            </h4>
          </span>
        </h4>
      ) : (
        <h4>
          <span class="buttons" onClick={handleFuelFilterToggle}>
            Fuel
            <h4 class="float_right" Style="font-weight:550;font-size:20px;">
            <FaAngleUp/>
            </h4>
          </span>
        </h4>
      )}
      <Collapse isOpened={isFuelFilterToggled}>
        {carFuels &&
          carFuels.map((carFuel, i) => (
            <div key={i}>
              <input
                type="checkbox"
                Style="width:17px;height:17px;margin-left:10px;"
                value={carFuel}
                checked={isFuelFilterChecked[i] === true ? true : false}
                onChange={() => handleFuel(carFuel)}
              />
              <label
                Style="font-size:17px;margin-left:10px;font-weight:400;"
                htmlFor=""
              >
                {carFuel}
              </label>
            </div>
          ))}
      </Collapse>
    </div>
  );
};

export default FuelFilter;
