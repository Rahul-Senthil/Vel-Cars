import React, { useState, useContext } from "react";
import { ProductContext } from "../ProductContext";
import { Collapse } from "react-collapse";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const KmFilter = () => {
  const {
    carKmsState,
    isKmFilterClickedState,
    handleKm,
    isKmFilterToggledState,
  } = useContext(ProductContext);
  const [carKms] = carKmsState;
  const [isKmFilterClicked] = isKmFilterClickedState;

  const [isKmFilterToggled, setIsKmFilterToggled] = useState(false);
  const [emoji, setEmoji] = useState("down");
  const handleKmFilterToggle = () => {
    isKmFilterToggled
      ? setIsKmFilterToggled(false)
      : setIsKmFilterToggled(true);
    emoji === "down" ? setEmoji("up") : setEmoji("down");
  };

  return (
    <div>
      {emoji === "down" ? (
        <h4>
          <span class="buttons" onClick={handleKmFilterToggle}>
            Kilometer
            <h4 class="float_right" Style="font-weight:550;font-size:20px;">
              <FaAngleDown />
            </h4>
          </span>
        </h4>
      ) : (
        <h4>
          <span class="buttons" onClick={handleKmFilterToggle}>
            Kilometer
            <h4 class="float_right" Style="font-weight:550;font-size:20px;">
              <FaAngleUp />
            </h4>
          </span>
        </h4>
      )}
      <Collapse isOpened={isKmFilterToggled}>
        {carKms &&
          carKms.map((carKm, i) => (
            <div key={i} class="center form-group">
              <button
                // class="form-control"
                style={
                  isKmFilterClicked[i]
                    ? {
                        width: "250px",
                        border: "none",
                        outline: "none",
                        background: "#e53935" /* fallback for old browsers */,
                        background:
                          "-webkit-linear-gradient(to right,#e35d5b,#e53935)",
                        background: "linear-gradient(to right,#e35d5b,#e53935)",
                        height: "35px",
                        borderRadius: "5px",
                        marginBottom: "5px",
                        fontFamily: "NATS",
                        fontSize: "20px"
                      }
                    : {
                        width: "250px",
                        border: "1px solid grey",
                        height: "35px",
                        borderRadius: "5px",
                        marginBottom: "5px",
                        fontFamily: "NATS",
                        fontSize: "20px"
                      }
                }
                onClick={() => handleKm(carKm.value)}
              >
                {carKm.name}
              </button>
            </div>
          ))}
      </Collapse>
    </div>
  );
};

export default KmFilter;
