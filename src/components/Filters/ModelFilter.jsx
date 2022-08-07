import React, { useState, useContext } from "react";
import { ProductContext } from "../ProductContext";
import { Collapse } from "react-collapse";
import './Styles.css';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const ModelFilter = () => {
  const {
    carModelsState,
    isModelFilterCheckedState,
    handleModel,
    isModelFilterToggledState,
  } = useContext(ProductContext);
  const [carModels] = carModelsState;
  const [isModelFilterChecked] = isModelFilterCheckedState;

  const [isModelFilterToggled, setIsModelFilterToggled] =
  useState(false);
  const [emoji, setEmoji] = useState("down");
  const handleModelFilterToggle = () => {
    isModelFilterToggled
      ? setIsModelFilterToggled(false)
      : setIsModelFilterToggled(true);
      emoji === "down" ? setEmoji("up") : setEmoji("down");
  };

  return (
    <div >
      {emoji === "down" ? (
        <h4>
          <span class="buttons" onClick={handleModelFilterToggle}>
            Model
            <h4 class="float_right" Style="font-weight:550;font-size:20px;">
            <FaAngleDown/>
            </h4>
          </span>
        </h4>
      ) : (
        <h4>
          <span class="buttons" onClick={handleModelFilterToggle}>
            Model
            <h4 class="float_right" Style="font-weight:550;font-size:20px;">
            <FaAngleUp/>
            </h4>
          </span>
        </h4>
      )}
      <Collapse  isOpened={isModelFilterToggled}>
        {carModels &&
          carModels.map((carModel, i) => (
            <div key={i}>
              <input
                type="checkbox"
                Style="width:17px;height:17px;margin-left:10px;"
                value={carModel}
                checked={isModelFilterChecked[i] === true ? true : false}
                onChange={() => handleModel(carModel)}
              />
              <label Style="font-size:17px;margin-left:10px;font-weight:400;"htmlFor="">{carModel}</label>
            </div>
          ))}
      </Collapse>
    </div>
  );
};

export default ModelFilter;
