import React, { useState, useContext } from "react";
import { ProductContext } from "../ProductContext";
import { Collapse } from "react-collapse";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const IsinsuredFilter = () => {
  const {
    carIsInsuredState,
    isIsInsuredFilterCheckedState,
    handleIsInsured,
    isIsInsuredFilterToggledState,
  } = useContext(ProductContext);
  const [carIsInsured] = carIsInsuredState;
  const [isIsInsuredFilterChecked] = isIsInsuredFilterCheckedState;

  const [isIsInsuredFilterToggled, setIsInsuredFilterToggled] =
  useState(false);
  const [emoji, setEmoji] = useState("down");
  const handleIsInsuredToggle = () => {
    isIsInsuredFilterToggled
      ? setIsInsuredFilterToggled(false)
      : setIsInsuredFilterToggled(true);
      emoji === "down" ? setEmoji("up") : setEmoji("down");
  };
  return (
    <div >
       {emoji === "down" ? (
        <h4>
          <span class="buttons" onClick={handleIsInsuredToggle}>
            Insured
            <h4 class="float_right" Style="font-weight:550;font-size:20px;">
            <FaAngleDown/>
            </h4>
          </span>
        </h4>
      ) : (
        <h4>
          <span class="buttons" onClick={handleIsInsuredToggle}>
            Insured
            <h4 class="float_right" Style="font-weight:550;font-size:20px;">
            <FaAngleUp/>
            </h4>
          </span>
        </h4>
      )}
      <Collapse isOpened={isIsInsuredFilterToggled}>
        {carIsInsured && (
          <div>
            <input
              type="checkbox"
              Style="width:17px;height:17px;margin-left:10px;"
              value={carIsInsured}
              checked={isIsInsuredFilterChecked}
              onChange={() => handleIsInsured(carIsInsured)}
            />
            <label Style="font-size:17px;margin-left:10px;font-weight:400;" htmlFor="">{carIsInsured}</label>
          </div>
        )}
      </Collapse>
    </div>
  );
};

export default IsinsuredFilter;
